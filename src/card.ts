import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TemplateResult, CSSResultGroup } from "lit";
import type { HomeAssistant, HeatingPowerCardConfig, Defaults } from "./types.js";
import { DEFAULTS } from "./defaults.js";
import { getEntityWatts, interpolateColor, niceTickInterval, formatKw } from "./utils.js";

@customElement("heating-power-card")
export class HeatingPowerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: HeatingPowerCardConfig;

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

  static getConfigElement(): HTMLElement {
    return document.createElement("heating-power-card-editor");
  }

  getCardSize(): number {
    return 1;
  }

  getGridOptions(): object {
    return { rows: 1, min_rows: 1, max_rows: 1, columns: 12, min_columns: 4 };
  }

  static getStubConfig(): HeatingPowerCardConfig {
    return {
      entities: [
        { entity: "sensor.heating_cable_power" },
        { entity: "sensor.floor_heater_power" },
        { entity: "sensor.panel_heater_power" },
      ],
      max_power: 15000,
      gauge_mode: "gradient",
      show_scale: true,
      show_dots: true,
    };
  }

  private get _c(): Defaults & HeatingPowerCardConfig {
    return { ...DEFAULTS, ...this._config };
  }

  private _renderIcon(total: number): TemplateResult {
    const active = total > 0;
    return html`<ha-icon
      .icon=${active ? this._c.icon_active : this._c.icon_inactive}
      style="color: ${active ? this._c.color_active : this._c.color_inactive};"
    ></ha-icon>`;
  }

  private _renderValue(total: number): TemplateResult {
    const active = total > 0;
    return html`<span class="hpc-value" style="color: ${active ? this._c.color_active : this._c.color_inactive};">
      ${formatKw(total)}<span class="hpc-unit"> kW</span>
    </span>`;
  }

  private _renderBadge(activeCount: number): TemplateResult {
    if (!this._c.show_badge || activeCount === 0) return html``;
    const bg = this._config.badge_background_color ?? this._c.color_active;
    return html`<span class="hpc-badge" style="background:${bg};color:${this._c.badge_text_color};">${activeCount}</span>`;
  }

  private _renderGauge(total: number): TemplateResult {
    const max = this._c.max_power;
    const pct = Math.min(100, (total / max) * 100);

    const fill =
      this._c.gauge_mode === "gradient"
        ? html`<div class="hpc-fill" style="width:${pct.toFixed(4)}%;background:linear-gradient(to right,${this._c.gauge_gradient_from},${interpolateColor(this._c.gauge_gradient_from, this._c.gauge_gradient_to, total / max)});"></div>`
        : html`<div class="hpc-fill" style="width:${pct.toFixed(4)}%;background:${this._c.color_active};"></div>`;

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
    for (let v = 0; v <= maxWatts + 1e-9; v += interval) ticks.push(Math.round(v));
    if (ticks[ticks.length - 1] < maxWatts) ticks.push(maxWatts);

    return html`
      <div class="hpc-scale">
        ${ticks.map((v, idx) => {
          const pct = (v / maxWatts) * 100;
          const label = v >= 1000 ? `${v % 1000 === 0 ? v / 1000 : (v / 1000).toFixed(1)}k` : `${v}`;
          const pos = idx === 0 ? "start" : idx === ticks.length - 1 ? "end" : "mid";
          return html`<span class="hpc-tick hpc-tick--${pos}" style="left:${pct.toFixed(2)}%;">${label}</span>`;
        })}
      </div>
    `;
  }

  private _renderDots(watts: number[]): TemplateResult {
    const active = watts.filter((w) => w > 0);
    if (active.length === 0) return html``;
    const color = this._config.dot_color ?? "var(--primary-text-color)";
    return html`
      <div class="hpc-dots">
        ${active.map(() => html`<div class="hpc-dot" style="background:${color};"></div>`)}
      </div>
    `;
  }

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

      /*
       * Column-first grid: CSS auto-places items top→bottom within each column
       * before moving right. 3 fixed rows means 1 col for ≤3 dots, 2 cols for
       * ≤6, 3×3 for ≤9, and so on — exactly matching the design intent.
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
