/**
 * Heating Power Card — Home Assistant Lovelace custom card
 * Compact card showing accumulated heating power from multiple sources.
 *
 * @license MIT
 * @see https://github.com/aalbretsen/heating-power-card
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TemplateResult, CSSResultGroup } from "lit";

// ─── HA type stubs ──────────────────────────────────────────────────────────

interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

interface HomeAssistant {
  states: Record<string, HassEntity>;
}

// ─── Public config types ─────────────────────────────────────────────────────

export type GaugeMode = "solid" | "gradient";
export type BadgePosition = "left" | "right";

export interface EntityConfig {
  /** HA entity_id of a power sensor, e.g. sensor.floor_heater_power */
  entity: string;
  /**
   * Multiplier applied on top of automatic unit detection.
   * W  → ×1 (default)
   * kW → ×1000 (auto-detected)
   * Custom: factor: 10 converts a ×10 sensor to real W.
   */
  factor?: number;
  /**
   * Fixed wattage to subtract from the sensor reading before contributing
   * to the total. Applied after unit conversion and factor.
   * Use this when a sensor reports combined power (e.g. ventilation motor +
   * heating element) and only the heating portion should be counted.
   * If the result after subtraction is ≤ 0 the entity is treated as inactive.
   * The value is always in Watts regardless of the sensor's own unit.
   */
  subtract?: number;
  /** Optional label, used only in card editor tooltips. */
  name?: string;
}

export interface HeatingPowerCardConfig {
  entities: EntityConfig[];

  // ── Icon ──────────────────────────────────────────────────────────────────
  /** MDI icon when total > 0. Default: mdi:fire */
  icon_active?: string;
  /** MDI icon when total = 0. Default: mdi:fire-off */
  icon_inactive?: string;
  /** CSS colour when heating is active. Default: #FF8C00 */
  color_active?: string;
  /** CSS colour when heating is inactive. Default: #9E9E9E */
  color_inactive?: string;

  // ── Badge ─────────────────────────────────────────────────────────────────
  /** Show the active-sources count badge. Default: true */
  show_badge?: boolean;
  /** Badge background colour. Default: color_active */
  badge_background_color?: string;
  /** Badge text colour. Default: var(--primary-text-color) */
  badge_text_color?: string;
  /**
   * Badge position relative to the gauge bar.
   * "left"  → between value and gauge (default, current behaviour)
   * "right" → between gauge and dots
   */
  badge_position?: BadgePosition;

  // ── Gauge ─────────────────────────────────────────────────────────────────
  /** Full-scale value in Watts. Default: 15000 */
  max_power?: number;
  /** Visual style of the gauge bar. Default: gradient */
  gauge_mode?: GaugeMode;
  /** Left (low) colour for gradient mode. Default: #DE9044 */
  gauge_gradient_from?: string;
  /** Right (high) colour for gradient mode. Default: #FF7C00 */
  gauge_gradient_to?: string;
  /** Show tick-mark scale below the gauge. Default: true */
  show_scale?: boolean;
  /** Approximate number of major scale ticks. Default: 5 */
  scale_ticks?: number;

  // ── Dots ──────────────────────────────────────────────────────────────────
  /**
   * Show per-source indicator dots on the right.
   * One dot per active source (power > 0). Default: true
   */
  show_dots?: boolean;
  /**
   * Dot colour. Default: var(--primary-text-color) — the HA "white" in most themes,
   * adapts automatically to light / dark mode.
   */
  dot_color?: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

interface Defaults {
  icon_active: string;
  icon_inactive: string;
  color_active: string;
  color_inactive: string;
  show_badge: boolean;
  badge_text_color: string;
  badge_position: BadgePosition;
  max_power: number;
  gauge_mode: GaugeMode;
  gauge_gradient_from: string;
  gauge_gradient_to: string;
  show_scale: boolean;
  scale_ticks: number;
  show_dots: boolean;
}

const DEFAULTS: Defaults = {
  icon_active: "mdi:fire",
  icon_inactive: "mdi:fire-off",
  color_active: "#FF8C00",
  color_inactive: "#9E9E9E",
  show_badge: true,
  badge_text_color: "var(--primary-text-color)",
  badge_position: "left",
  max_power: 15000,
  gauge_mode: "gradient",
  gauge_gradient_from: "#DE9044",
  gauge_gradient_to: "#FF7C00",
  show_scale: true,
  scale_ticks: 5,
  show_dots: true,
};

// ─── Utilities ───────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [128, 128, 128];
}

function interpolateColor(from: string, to: string, t: number): string {
  const ratio = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const ch = (a: number, b: number): string =>
    Math.round(a + (b - a) * ratio)
      .toString(16)
      .padStart(2, "0");
  return `#${ch(r1, r2)}${ch(g1, g2)}${ch(b1, b2)}`;
}

function getUnitMultiplier(unit: string | undefined): number {
  switch (unit?.trim().toLowerCase()) {
    case "kw":
      return 1_000;
    case "mw":
      return 1_000_000;
    case "gw":
      return 1_000_000_000;
    default:
      return 1; // W, or unrecognised — apply factor only
  }
}

function getEntityWatts(hass: HomeAssistant, cfg: EntityConfig): number {
  const st = hass.states[cfg.entity];
  if (!st) return 0;
  if (st.state === "unavailable" || st.state === "unknown" || st.state === "none") return 0;
  const raw = parseFloat(st.state);
  if (!isFinite(raw) || raw < 0) return 0;
  const unit = st.attributes.unit_of_measurement as string | undefined;
  const value = raw * getUnitMultiplier(unit) * (cfg.factor ?? 1) - (cfg.subtract ?? 0);
  return value < 1 ? 0 : value;
}

/**
 * Compute a "nice" tick interval for a scale with ~desiredTicks ticks.
 * Returns a value from the series 1, 2, 5, 10, 20, 50, 100, …
 */
function niceTickInterval(max: number, desiredTicks: number): number {
  if (max <= 0 || desiredTicks <= 0) return max;
  const rough = max / desiredTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  return nice * mag;
}

function formatKw(watts: number): string {
  if (watts < 100) return (watts / 1000).toFixed(2);
  if (watts < 10000) return (watts / 1000).toFixed(1);
  return (watts / 1000).toFixed(0);
}

// ─── Card element ────────────────────────────────────────────────────────────

@customElement("heating-power-card")
export class HeatingPowerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: HeatingPowerCardConfig;

  // ── HA lifecycle hooks ────────────────────────────────────────────────────

  setConfig(config: HeatingPowerCardConfig): void {
    if (!Array.isArray(config?.entities) || config.entities.length === 0) {
      throw new Error("heating-power-card: at least one entity is required.");
    }
    if (config.entities.length > 99) {
      throw new Error("heating-power-card: maximum 99 entities supported.");
    }
    for (const e of config.entities) {
      if (!e.entity) throw new Error("heating-power-card: each entity entry must have an 'entity' field.");
    }
    this._config = config;
  }

  /** Cards size hint for masonry layout (1 unit ≈ 50 px). */
  getCardSize(): number {
    return 1;
  }

  /** Grid options for the Sections view. */
  getGridOptions(): object {
    return { rows: 1, min_rows: 1, max_rows: 1, columns: 12, min_columns: 4 };
  }

  static getStubConfig(): HeatingPowerCardConfig {
    return {
      entities: [{ entity: "sensor.heating_cable_power" }, { entity: "sensor.floor_heater_power" }, { entity: "sensor.panel_heater_power" }],
      max_power: 15000,
      gauge_mode: "gradient",
      show_scale: true,
      show_dots: true,
    };
  }

  // ── Config helper ─────────────────────────────────────────────────────────

  /** Merged config with defaults applied. */
  private get _c(): Defaults & HeatingPowerCardConfig {
    return { ...DEFAULTS, ...this._config };
  }

  // ── Sub-renderers ─────────────────────────────────────────────────────────

  private _renderIcon(total: number): TemplateResult {
    const active = total > 0;
    return html`<ha-icon .icon=${active ? this._c.icon_active : this._c.icon_inactive} style="color: ${active ? this._c.color_active : this._c.color_inactive};"></ha-icon>`;
  }

  private _renderValue(total: number): TemplateResult {
    const active = total > 0;
    return html`<span class="hpc-value" style="color: ${active ? this._c.color_active : this._c.color_inactive};"> ${formatKw(total)}<span class="hpc-unit"> kW</span> </span>`;
  }

  private _renderBadge(activeCount: number): TemplateResult {
    if (!this._c.show_badge || activeCount === 0) return html``;
    const bg = this._config.badge_background_color ?? this._c.color_active;
    const text = this._c.badge_text_color;
    return html`<span class="hpc-badge" style="background:${bg};color:${text};">${activeCount}</span>`;
  }

  private _renderGauge(total: number): TemplateResult {
    const max = this._c.max_power;
    const mode = this._c.gauge_mode;
    const pct = Math.min(100, (total / max) * 100);

    let fill: TemplateResult | typeof nothing;

    if (mode === "gradient") {
      const from = this._c.gauge_gradient_from;
      const to = this._c.gauge_gradient_to;
      const tip = interpolateColor(from, to, total / max);
      fill = html`<div class="hpc-fill" style="width:${pct.toFixed(4)}%;background:linear-gradient(to right,${from},${tip});"></div>`;
    } else {
      fill = html`<div class="hpc-fill" style="width:${pct.toFixed(4)}%;background:${this._c.color_active};"></div>`;
    }

    return html`
      <div class="hpc-gauge-wrapper">
        <div class="hpc-track">${fill}</div>
        ${this._c.show_scale ? this._renderScale(max) : nothing}
      </div>
    `;
  }

  private _renderScale(maxWatts: number): TemplateResult {
    const interval = niceTickInterval(maxWatts, this._c.scale_ticks);
    const ticks: number[] = [];
    for (let v = 0; v <= maxWatts + 1e-9; v += interval) {
      ticks.push(Math.round(v));
    }
    // Ensure the max label always appears.
    if (ticks[ticks.length - 1] < maxWatts) ticks.push(maxWatts);

    return html`
      <div class="hpc-scale">
        ${ticks.map((v, idx) => {
          const pct   = (v / maxWatts) * 100;
          const label = v >= 1000
            ? `${v % 1000 === 0 ? v / 1000 : (v / 1000).toFixed(1)}k`
            : `${v}`;
          const pos   = idx === 0 ? "start" : idx === ticks.length - 1 ? "end" : "mid";
          return html`
            <span class="hpc-tick hpc-tick--${pos}" style="left:${pct.toFixed(2)}%;">${label}</span>
          `;
        })}
      </div>
    `;
  }

  /**
   * Render active-source dots.
   *
   * Layout: column-first grid, max 3 rows, columns grow as active count increases.
   * Only active sources (watts > 0) produce a dot. Inactive sources are hidden.
   */
  private _renderDots(watts: number[]): TemplateResult {
    const activeWatts = watts.filter((w) => w > 0);
    if (activeWatts.length === 0) return html``;

    // Use configured dot_color, or fall back to the HA primary text colour so
    // dots read as "white" in the default dark/light themes.
    const color = this._config.dot_color ?? "var(--primary-text-color)";

    return html`
      <div class="hpc-dots">
        ${activeWatts.map(() => html`<div class="hpc-dot" style="background:${color};"></div>`)}
      </div>
    `;
  }

  // ── Main render ───────────────────────────────────────────────────────────

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    const watts = this._config.entities.map((e) => getEntityWatts(this.hass, e));
    const total = watts.reduce((s, w) => s + w, 0);
    const activeCount = watts.filter((w) => w > 0).length;

    const badge = this._renderBadge(activeCount);
    const badgeLeft = this._c.badge_position === "left";

    return html`
      <ha-card>
        <div class="hpc-container">
          ${this._renderIcon(total)}
          ${this._renderValue(total)}
          ${badgeLeft ? badge : nothing}
          ${this._renderGauge(total)}
          ${badgeLeft ? nothing : badge}
          ${this._c.show_dots ? this._renderDots(watts) : nothing}
        </div>
      </ha-card>
    `;
  }

  // ── Styles ────────────────────────────────────────────────────────────────

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        display: flex;
        align-items: stretch;
        height: 100%;
        box-sizing: border-box;
      }

      /*
       * 56px matches the standard Home Assistant 1-row tile/grid-item height,
       * giving equal top/bottom padding to the 14px side padding.
       */
      .hpc-container {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        flex: 1;
        min-width: 0;
        height: 56px;
        box-sizing: border-box;
      }

      ha-icon {
        --mdc-icon-size: 28px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }

      .hpc-value {
        font-size: 18px;
        font-weight: 500;
        line-height: 1;
        white-space: nowrap;
        flex-shrink: 0;
        letter-spacing: -0.02em;
      }

      .hpc-unit {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.75;
      }

      .hpc-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
        padding: 0 5px;
        flex-shrink: 0;
        line-height: 1;
        box-sizing: border-box;
      }

      /* ── Gauge ── */

      .hpc-gauge-wrapper {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
      }

      .hpc-track {
        height: 20px;
        border-radius: 10px;
        background: var(--secondary-background-color, #e0e0e0);
        overflow: hidden;
        display: flex;
        flex-shrink: 0;
      }

      .hpc-fill {
        height: 100%;
        border-radius: 10px 0 0 10px;
        flex-shrink: 0;
        transition: width 0.5s ease;
      }

      /* ── Scale ── */

      .hpc-scale {
        position: relative;
        height: 13px;
        font-size: 9px;
        color: var(--secondary-text-color, #888888);
        flex-shrink: 0;
        user-select: none;
      }

      .hpc-tick {
        position: absolute;
        top: 0;
        line-height: 1;
        white-space: nowrap;
      }

      .hpc-tick--mid {
        transform: translateX(-50%);
      }

      .hpc-tick--start {
        transform: translateX(0);
      }

      .hpc-tick--end {
        transform: translateX(-100%);
      }

      /* ── Dots ── */

      /*
       * Column-first grid: 3 fixed rows, columns added as active count grows.
       * grid-auto-flow: column fills top→bottom within each column before
       * moving right, matching the spec: 1–3 → 1 col, 4–6 → 2 cols, 7–9 → 3×3,
       * 10 → 4th col row 1, 11 → 4th col row 2, etc.
       */
      .hpc-dots {
        display: grid;
        grid-template-rows: repeat(3, 6px);
        grid-auto-flow: column;
        grid-auto-columns: 6px;
        gap: 2px;
        flex-shrink: 0;
        align-content: center;
        align-self: center;
      }

      .hpc-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        transition: background 0.45s ease;
      }
    `;
  }
}

// ─── Custom card registry ────────────────────────────────────────────────────

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "heating-power-card",
  name: "Heating Power Card",
  description: "Compact card showing accumulated heating power from multiple sources.",
  preview: true,
  documentationURL: "https://github.com/aalbretsen/heating-power-card",
});
