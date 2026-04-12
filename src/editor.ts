import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TemplateResult, CSSResultGroup } from "lit";
import type { HomeAssistant, EntityConfig, HeatingPowerCardConfig } from "./types.js";
import { DEFAULTS } from "./defaults.js";

@customElement("heating-power-card-editor")
export class HeatingPowerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: HeatingPowerCardConfig;

  setConfig(config: HeatingPowerCardConfig): void {
    this._config = config;
  }

  private _dispatch(config: HeatingPowerCardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get _appearanceSchema() {
    return [
      {
        type: "grid",
        schema: [
          { name: "icon_active", label: "Icon — heating on", selector: { icon: {} } },
          { name: "icon_inactive", label: "Icon — heating off", selector: { icon: {} } },
          { name: "color_active", label: "Colour — active (CSS hex)", selector: { text: {} } },
          { name: "color_inactive", label: "Colour — inactive (CSS hex)", selector: { text: {} } },
        ],
      },
    ];
  }

  private get _badgeSchema() {
    return [
      { name: "show_badge", label: "Show source count badge", selector: { boolean: {} } },
      {
        name: "badge_position",
        label: "Badge position",
        selector: {
          select: {
            options: [
              { value: "left", label: "Left of gauge" },
              { value: "right", label: "Right of gauge" },
            ],
          },
        },
      },
      { name: "badge_background_color", label: "Badge background (CSS hex, default = active colour)", selector: { text: {} } },
      { name: "badge_text_color", label: "Badge text colour (CSS)", selector: { text: {} } },
    ];
  }

  private get _gaugeSchema() {
    const isGradient = (this._config.gauge_mode ?? DEFAULTS.gauge_mode) === "gradient";
    return [
      { name: "max_power", label: "Max power (W)", selector: { number: { min: 1, step: 100, mode: "box" as const } } },
      {
        name: "gauge_mode",
        label: "Gauge style",
        selector: {
          select: {
            options: [
              { value: "gradient", label: "Gradient" },
              { value: "solid", label: "Solid colour" },
            ],
          },
        },
      },
      ...(isGradient
        ? [
            { name: "gauge_gradient_from", label: "Gradient start colour (CSS hex)", selector: { text: {} } },
            { name: "gauge_gradient_to", label: "Gradient end colour (CSS hex)", selector: { text: {} } },
          ]
        : []),
      { name: "show_scale", label: "Show scale ticks", selector: { boolean: {} } },
      { name: "scale_ticks", label: "Number of ticks", selector: { number: { min: 2, max: 20, step: 1, mode: "box" as const } } },
    ];
  }

  private get _dotsSchema() {
    return [
      { name: "show_dots", label: "Show active-source dots", selector: { boolean: {} } },
      { name: "dot_color", label: "Dot colour (CSS, default = theme white)", selector: { text: {} } },
    ];
  }

  private _formChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._dispatch({ ...this._config, ...(ev.detail.value as Partial<HeatingPowerCardConfig>) });
  }

  private _addEntity(): void {
    this._dispatch({ ...this._config, entities: [...this._config.entities, { entity: "" }] });
  }

  private _removeEntity(index: number): void {
    this._dispatch({
      ...this._config,
      entities: this._config.entities.filter((_, i) => i !== index),
    });
  }

  private _entityChanged(index: number, field: keyof EntityConfig, raw: string): void {
    const entities = this._config.entities.map((e, i) => {
      if (i !== index) return e;
      if (field === "factor" || field === "subtract") {
        const num = parseFloat(raw);
        const updated = { ...e };
        if (raw === "" || !isFinite(num)) {
          delete updated[field];
        } else {
          updated[field] = num;
        }
        return updated;
      }
      return { ...e, [field]: raw };
    });
    this._dispatch({ ...this._config, entities });
  }

  private _entityPickerChanged(index: number, ev: CustomEvent): void {
    ev.stopPropagation();
    this._entityChanged(index, "entity", (ev.detail.value as string) ?? "");
  }

  private _renderEntityRow(cfg: EntityConfig, idx: number): TemplateResult {
    return html`
      <div class="entity-card">
        <div class="entity-header">
          <span class="entity-index">${idx + 1}</span>
          <ha-entity-picker
            class="entity-picker"
            .hass=${this.hass}
            .value=${cfg.entity}
            .includeDomains=${["sensor"]}
            allow-custom-entity
            @value-changed=${(ev: CustomEvent) => this._entityPickerChanged(idx, ev)}
          ></ha-entity-picker>
          <ha-icon-button
            .label=${"Remove"}
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${() => this._removeEntity(idx)}
          ></ha-icon-button>
        </div>
        <div class="entity-fields">
          <ha-textfield
            label="Factor"
            type="number"
            min="0"
            step="0.01"
            .value=${cfg.factor !== undefined ? String(cfg.factor) : ""}
            placeholder="1"
            @change=${(ev: Event) => this._entityChanged(idx, "factor", (ev.target as HTMLInputElement).value)}
          ></ha-textfield>
          <ha-textfield
            label="Subtract (W)"
            type="number"
            min="0"
            step="1"
            .value=${cfg.subtract !== undefined ? String(cfg.subtract) : ""}
            placeholder="0"
            @change=${(ev: Event) => this._entityChanged(idx, "subtract", (ev.target as HTMLInputElement).value)}
          ></ha-textfield>
        </div>
      </div>
    `;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;

    return html`
      <div class="editor">
        <div class="section-title">Heating sources</div>
        ${this._config.entities.map((e, i) => this._renderEntityRow(e, i))}
        <ha-button outlined @click=${this._addEntity}>Add entity</ha-button>

        <div class="section-title">Icon &amp; colours</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._appearanceSchema} @value-changed=${this._formChanged}></ha-form>

        <div class="section-title">Badge</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._badgeSchema} @value-changed=${this._formChanged}></ha-form>

        <div class="section-title">Gauge</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._gaugeSchema} @value-changed=${this._formChanged}></ha-form>

        <div class="section-title">Dots</div>
        <ha-form .hass=${this.hass} .data=${this._config} .schema=${this._dotsSchema} @value-changed=${this._formChanged}></ha-form>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .editor {
        padding: 4px 0 8px;
      }

      .section-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin: 20px 0 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid var(--divider-color);
      }

      .entity-card {
        background: var(--secondary-background-color);
        border-radius: 8px;
        padding: 10px 12px;
        margin-bottom: 8px;
      }

      .entity-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .entity-index {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color);
        min-width: 16px;
        flex-shrink: 0;
      }

      .entity-picker {
        flex: 1;
        min-width: 0;
      }

      .entity-fields {
        display: grid;
        grid-template-columns: 1fr 80px 100px;
        gap: 8px;
      }

      ha-textfield {
        display: block;
        width: 100%;
      }

      ha-button {
        display: block;
        margin-top: 4px;
      }
    `;
  }
}
