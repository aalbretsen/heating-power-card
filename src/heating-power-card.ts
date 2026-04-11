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

export type GaugeMode = "solid" | "gradient" | "stacked";
export type DotMode = "gradient" | "growth" | "steady";

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
  /** CSS colour for this source (used in stacked gauge and per-source dots). */
  color?: string;
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
  /** CSS colour when heating is active. Default: #F57C00 */
  color_active?: string;
  /** CSS colour when heating is inactive. Default: #9E9E9E */
  color_inactive?: string;

  // ── Badge ─────────────────────────────────────────────────────────────────
  /** Text colour of the active-sources badge. Default: #FFFFFF */
  badge_text_color?: string;

  // ── Gauge ─────────────────────────────────────────────────────────────────
  /** Full-scale value in Watts. Default: 15000 */
  max_power?: number;
  /** Visual style of the gauge bar. Default: solid */
  gauge_mode?: GaugeMode;
  /** Colour for solid mode (falls back to color_active). */
  gauge_color?: string;
  /** Left colour for gradient mode. Default: #1565C0 */
  gauge_gradient_from?: string;
  /** Right colour for gradient mode. Default: #D32F2F */
  gauge_gradient_to?: string;
  /** Show tick-mark scale below the gauge. Default: true */
  show_scale?: boolean;
  /** Approximate number of major scale ticks. Default: 5 */
  scale_ticks?: number;

  // ── Dots ──────────────────────────────────────────────────────────────────
  /** Show per-source indicator dots on the right. Default: true */
  show_dots?: boolean;
  /** Visual encoding of dots. Default: gradient */
  dot_mode?: DotMode;
  /** Dot colour when source is off. Default: #E0E0E0 */
  dot_off_color?: string;
  /**
   * Dot colour at full power for gradient/steady modes.
   * Falls back to color_active when not set.
   */
  dot_on_color?: string;
  /**
   * Use each entity's own color (from EntityConfig.color or the
   * auto-assigned palette colour) for its dot, instead of dot_on_color.
   */
  dot_use_source_colors?: boolean;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

interface Defaults {
  icon_active: string;
  icon_inactive: string;
  color_active: string;
  color_inactive: string;
  badge_text_color: string;
  max_power: number;
  gauge_mode: GaugeMode;
  gauge_gradient_from: string;
  gauge_gradient_to: string;
  show_scale: boolean;
  scale_ticks: number;
  show_dots: boolean;
  dot_mode: DotMode;
  dot_off_color: string;
  dot_use_source_colors: boolean;
}

const DEFAULTS: Defaults = {
  icon_active:           "mdi:fire",
  icon_inactive:         "mdi:fire-off",
  color_active:          "#F57C00",
  color_inactive:        "#9E9E9E",
  badge_text_color:      "#FFFFFF",
  max_power:             15000,
  gauge_mode:            "solid",
  gauge_gradient_from:   "#1565C0",
  gauge_gradient_to:     "#D32F2F",
  show_scale:            true,
  scale_ticks:           5,
  show_dots:             true,
  dot_mode:              "gradient",
  dot_off_color:         "#E0E0E0",
  dot_use_source_colors: false,
};

/**
 * Auto-assigned palette colours for entities without a configured color.
 * Cycles if there are more entities than colours in the array.
 */
const SOURCE_COLORS: readonly string[] = [
  "#1565C0", "#F57C00", "#D32F2F", "#388E3C",
  "#7B1FA2", "#00838F", "#F9A825", "#558B2F",
  "#AD1457", "#0277BD", "#6A1B9A", "#2E7D32",
  "#BF360C", "#00695C", "#4527A0", "#283593",
];

/** Dot sizing tiers — automatically chosen based on source count. */
const DOT_TIERS: ReadonlyArray<{
  maxCount: number;
  containerPx: number;
  maxR: number;
  minR: number;
}> = [
  { maxCount: 20, containerPx: 14, maxR: 6,   minR: 2   },
  { maxCount: 40, containerPx: 11, maxR: 4.5, minR: 1.5 },
  { maxCount: 99, containerPx: 9,  maxR: 3.5, minR: 1   },
];

// ─── Utilities ───────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [128, 128, 128];
}

function interpolateColor(from: string, to: string, t: number): string {
  const ratio = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const ch = (a: number, b: number) =>
    Math.round(a + (b - a) * ratio).toString(16).padStart(2, "0");
  return `#${ch(r1, r2)}${ch(g1, g2)}${ch(b1, b2)}`;
}

function getUnitMultiplier(unit: string | undefined): number {
  switch (unit?.trim().toLowerCase()) {
    case "kw":  return 1_000;
    case "mw":  return 1_000_000;
    case "gw":  return 1_000_000_000;
    default:    return 1; // W, or unrecognised — apply factor only
  }
}

function getEntityWatts(hass: HomeAssistant, cfg: EntityConfig): number {
  const st = hass.states[cfg.entity];
  if (!st) return 0;
  if (st.state === "unavailable" || st.state === "unknown" || st.state === "none") return 0;
  const raw = parseFloat(st.state);
  if (!isFinite(raw) || raw < 0) return 0;
  const unit = st.attributes.unit_of_measurement as string | undefined;
  return raw * getUnitMultiplier(unit) * (cfg.factor ?? 1);
}

/**
 * Compute a "nice" tick interval for a scale with ~desiredTicks ticks.
 * Returns a value from the series 1, 2, 5, 10, 20, 50, 100, …
 */
function niceTickInterval(max: number, desiredTicks: number): number {
  if (max <= 0 || desiredTicks <= 0) return max;
  const rough = max / desiredTicks;
  const mag   = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm  = rough / mag;
  const nice  = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  return nice * mag;
}

function getDotTier(count: number) {
  return (
    DOT_TIERS.find((t) => count <= t.maxCount) ??
    DOT_TIERS[DOT_TIERS.length - 1]
  );
}

function formatKw(watts: number): string {
  if (watts < 100)  return (watts / 1000).toFixed(2);
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
  getGridOptions() {
    return { rows: 1, min_rows: 1, max_rows: 1, columns: 12, min_columns: 4 };
  }

  static getStubConfig(): HeatingPowerCardConfig {
    return {
      entities: [
        { entity: "sensor.heating_cable_power",  color: "#1565C0" },
        { entity: "sensor.floor_heater_power",   color: "#F57C00" },
        { entity: "sensor.panel_heater_power",   color: "#D32F2F" },
      ],
      max_power: 15000,
      gauge_mode: "stacked",
      show_scale: true,
      show_dots: true,
      dot_mode: "gradient",
      dot_use_source_colors: true,
    };
  }

  // ── Config helpers ────────────────────────────────────────────────────────

  /** Merged config with defaults applied. */
  private get _c(): Defaults & HeatingPowerCardConfig {
    return { ...DEFAULTS, ...this._config };
  }

  private _srcColor(index: number): string {
    return this._config.entities[index]?.color ?? SOURCE_COLORS[index % SOURCE_COLORS.length];
  }

  private _activeColor(): string {
    return this._c.color_active;
  }

  private _inactiveColor(): string {
    return this._c.color_inactive;
  }

  // ── Sub-renderers ─────────────────────────────────────────────────────────

  private _renderIcon(total: number): TemplateResult {
    const active = total > 0;
    return html`
      <ha-icon
        .icon=${active ? this._c.icon_active : this._c.icon_inactive}
        style="color: ${active ? this._activeColor() : this._inactiveColor()};"
      ></ha-icon>
    `;
  }

  private _renderValue(total: number): TemplateResult {
    const active = total > 0;
    return html`
      <span class="hpc-value" style="color: ${active ? this._activeColor() : this._inactiveColor()};">
        ${formatKw(total)}<span class="hpc-unit"> kW</span>
      </span>
    `;
  }

  private _renderBadge(activeCount: number): TemplateResult {
    if (activeCount === 0) return html``;
    return html`
      <span class="hpc-badge"
        style="background:${this._activeColor()};color:${this._c.badge_text_color};">
        ${activeCount}
      </span>
    `;
  }

  private _renderGauge(watts: number[], total: number): TemplateResult {
    const max  = this._c.max_power;
    const mode = this._c.gauge_mode;

    let fill: TemplateResult | typeof nothing;

    if (mode === "stacked") {
      // Scale all segments proportionally if total exceeds max.
      const scale = total > max ? max / total : 1;
      fill = html`
        ${watts.map((w, i) => {
          const pct = (w * scale / max) * 100;
          return pct > 0.005
            ? html`<div class="hpc-segment"
                style="width:${pct.toFixed(4)}%;background:${this._srcColor(i)};"></div>`
            : nothing;
        })}
      `;
    } else if (mode === "gradient") {
      const pct  = Math.min(100, (total / max) * 100);
      const from = this._c.gauge_gradient_from;
      const to   = this._c.gauge_gradient_to;
      // The tip colour matches the gradient position at current load.
      const tip  = interpolateColor(from, to, total / max);
      fill = html`
        <div class="hpc-fill"
          style="width:${pct.toFixed(4)}%;background:linear-gradient(to right,${from},${tip});"></div>
      `;
    } else {
      // solid (default)
      const pct   = Math.min(100, (total / max) * 100);
      const color = this._config.gauge_color ?? this._activeColor();
      fill = html`<div class="hpc-fill" style="width:${pct.toFixed(4)}%;background:${color};"></div>`;
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

  private _renderDots(watts: number[]): TemplateResult {
    const max     = this._c.max_power;
    const n       = watts.length;
    // Each source is judged relative to an equal share of the total max.
    const perMax  = n > 0 ? max / n : max;
    const mode    = this._c.dot_mode;
    const offCol  = this._c.dot_off_color;
    const onCol   = this._config.dot_on_color ?? this._activeColor();
    const useSrc  = this._c.dot_use_source_colors;
    const { containerPx, maxR, minR } = getDotTier(n);
    const half    = containerPx / 2;

    return html`
      <div class="hpc-dots">
        ${watts.map((w, i) => {
          const ratio    = perMax > 0 ? Math.min(1, w / perMax) : 0;
          const srcColor = this._srcColor(i);

          let fill: string;
          let r: number;

          switch (mode) {
            case "growth":
              // Size grows from minR to maxR; colour is on or off.
              fill = w > 0 ? (useSrc ? srcColor : onCol) : offCol;
              r    = w > 0 ? minR + (maxR - minR) * ratio : minR;
              break;
            case "steady":
              // Binary on/off colour at fixed size.
              fill = w > 0 ? (useSrc ? srcColor : onCol) : offCol;
              r    = maxR;
              break;
            case "gradient":
            default:
              // Colour interpolates between offCol and on colour.
              r    = maxR;
              fill = interpolateColor(offCol, useSrc ? srcColor : onCol, ratio);
              break;
          }

          return html`
            <svg width="${containerPx}" height="${containerPx}"
                 viewBox="0 0 ${containerPx} ${containerPx}"
                 class="hpc-dot">
              <circle cx="${half}" cy="${half}" r="${r.toFixed(2)}" fill="${fill}" />
            </svg>
          `;
        })}
      </div>
    `;
  }

  // ── Main render ───────────────────────────────────────────────────────────

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    const watts       = this._config.entities.map((e) => getEntityWatts(this.hass, e));
    const total       = watts.reduce((s, w) => s + w, 0);
    const activeCount = watts.filter((w) => w > 0).length;

    return html`
      <ha-card>
        <div class="hpc-container">
          ${this._renderIcon(total)}
          ${this._renderValue(total)}
          ${this._renderBadge(activeCount)}
          ${this._renderGauge(watts, total)}
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
        height: 10px;
        border-radius: 5px;
        background: var(--secondary-background-color, #e0e0e0);
        overflow: hidden;
        display: flex;
        flex-shrink: 0;
      }

      /* Solid and gradient fills */
      .hpc-fill {
        height: 100%;
        border-radius: 5px 0 0 5px;
        flex-shrink: 0;
        transition: width 0.5s ease;
      }

      /* Stacked mode segments */
      .hpc-segment {
        height: 100%;
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
      .hpc-tick--mid   { transform: translateX(-50%); }
      .hpc-tick--start { transform: translateX(0); }
      .hpc-tick--end   { transform: translateX(-100%); }

      /* ── Dots ── */

      .hpc-dots {
        display: flex;
        align-items: center;
        gap: 2px;
        flex-shrink: 0;
      }

      .hpc-dot {
        display: block;
        flex-shrink: 0;
      }

      .hpc-dot circle {
        transition: r 0.45s ease, fill 0.45s ease;
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
  description:
    "Compact card showing accumulated heating power from multiple sources.",
  preview: true,
  documentationURL: "https://github.com/aalbretsen/heating-power-card",
});
