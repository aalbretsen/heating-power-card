# Heating Power Card

[![HACS][hacs-badge]][hacs-url]
[![Release][release-badge]][release-url]
[![License][license-badge]](LICENSE)

A compact Home Assistant Lovelace card that shows accumulated heating power from multiple sources on a single animated gauge bar.

![Card preview](docs/preview.png)

---

## Features

- 🔥 **Configurable icon** — separate MDI icons and colours for active / inactive state
- 🔢 **Total power value** — auto-formatted in kW, colour-coded by state
- ⬤ **Active-source badge** — shows the count of sources currently drawing power; hides automatically when none are on
- 📊 **Animated gauge bar** — three modes:
  - `solid` — single colour fill
  - `gradient` — colour transitions from a start colour to an end colour as load increases
  - `stacked` — each source gets a proportional coloured segment
- ↕️ **Optional scale** — configurable tick marks below the gauge
- ⚫ **Per-source indicator dots** — three modes:
  - `gradient` — dot colour interpolates between off and on colour
  - `growth` — dot grows in size from min to max radius
  - `steady` — binary on/off colour
- ⚖️ **Automatic unit handling** — W, kW, MW detected from `unit_of_measurement`; custom `factor` per sensor for non-standard units
- ↔️ **Sections view native** — reports `grid_rows: 1`, `grid_columns: 12`; resizes cleanly in the new grid-based UI
- 🔄 **Smooth CSS transitions** — gauge fill and dot changes animate at 0.5 s ease

---

## Installation

### Via HACS (recommended)

1. Open HACS → Frontend.
2. Click the **⋮** menu → **Custom repositories**.
3. Add `https://github.com/aalbretsen/heating-power-card` with category **Dashboard**.
4. Search for **Heating Power Card** and click **Download**.
5. Restart Home Assistant (**Developer Tools → Restart**).
6. Hard-reload the browser (Ctrl-Shift-R / ⌘-Shift-R).

> **Note:** HACS automatically registers the card resource with Home Assistant.
> You do **not** need to add anything manually under Settings → Dashboards → Resources.
> If the card is not found after restart, check that the resource
> `/hacsfiles/heating-power-card/heating-power-card.js` appears in that list — HACS
> should have added it. If it is missing, add it manually as a **JavaScript module**.

### Manual

1. Download `dist/heating-power-card.js` from the [latest release][release-url].
2. Place it in `config/www/heating-power-card.js`.
3. In HA go to **Settings → Dashboards → ⋮ → Resources → Add resource**:
  - URL: `/local/heating-power-card.js`
  - Type: **JavaScript module**
4. Restart Home Assistant, then hard-reload the browser.

---

## Quick start

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heating_cable_power
  - entity: sensor.floor_heater_power
max_power: 10000
```

---

## Configuration

### Top-level options

| Option                  | Type                       | Default          | Description                                                         |
|-------------------------|----------------------------|------------------|---------------------------------------------------------------------|
| `entities`              | `EntityConfig[]`           | **required**     | List of power sensor entities (max 99).                             |
| `icon_active`           | `string`                   | `mdi:fire`       | MDI icon when total > 0.                                            |
| `icon_inactive`         | `string`                   | `mdi:fire-off`   | MDI icon when total = 0.                                            |
| `color_active`          | `string`                   | `#F57C00`        | CSS colour when heating is on (icon, value, badge, dots).           |
| `color_inactive`        | `string`                   | `#9E9E9E`        | CSS colour when heating is off.                                     |
| `badge_text_color`      | `string`                   | `#FFFFFF`        | Text colour of the active-sources count badge.                      |
| `max_power`             | `number`                   | `15000`          | Full-scale in **Watts**.                                            |
| `gauge_mode`            | `solid\|gradient\|stacked` | `solid`          | Visual style of the gauge bar.                                      |
| `gauge_color`           | `string`                   | → `color_active` | Fill colour for `solid` mode.                                       |
| `gauge_gradient_from`   | `string`                   | `#1565C0`        | Left colour for `gradient` mode.                                    |
| `gauge_gradient_to`     | `string`                   | `#D32F2F`        | Right colour for `gradient` mode.                                   |
| `show_scale`            | `boolean`                  | `true`           | Show tick marks below the gauge.                                    |
| `scale_ticks`           | `number`                   | `5`              | Approximate number of major ticks.                                  |
| `show_dots`             | `boolean`                  | `true`           | Show per-source indicator dots on the right.                        |
| `dot_mode`              | `gradient\|growth\|steady` | `gradient`       | Visual encoding for dots.                                           |
| `dot_off_color`         | `string`                   | `#E0E0E0`        | Dot colour when the source is off.                                  |
| `dot_on_color`          | `string`                   | → `color_active` | Dot colour at full power (`gradient` / `steady` modes).             |
| `dot_use_source_colors` | `boolean`                  | `false`          | Use each entity's own colour for its dot instead of `dot_on_color`. |

### EntityConfig

| Option   | Type     | Default      | Description                                                                                                                       |
|----------|----------|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `entity` | `string` | **required** | HA entity id of the power sensor.                                                                                                 |
| `name`   | `string` | —            | Optional label (used in the card editor).                                                                                         |
| `color`  | `string` | auto         | CSS colour for this source in `stacked` gauge and source-coloured dots. Auto-assigned from a built-in palette when not set.       |
| `factor` | `number` | `1`          | Multiplier applied **on top of** unit auto-detection. Use `0.001` if the sensor reports mW, `10` if it under-reports by 10×, etc. |

### Unit auto-detection

The card reads `unit_of_measurement` from the entity's attributes:

| Attribute value         | Multiplier  |
|-------------------------|-------------|
| `W`  (or anything else) | ×1          |
| `kW`                    | ×1 000      |
| `MW`                    | ×1 000 000  |

`factor` is applied **after** unit conversion, so for a sensor reporting `kW` with a 10× correction: set `factor: 10`.

---

## Examples

### Stacked gauge with source colours and growing dots

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heating_cable_power
    name: Heating cable
    color: "#1565C0"
  - entity: sensor.floor_heater_living_room
    name: Floor — living room
    color: "#F57C00"
  - entity: sensor.floor_heater_bedroom
    name: Floor — bedroom
    color: "#D32F2F"
  - entity: sensor.panel_heater_hall
    name: Panel — hall
    color: "#388E3C"
max_power: 15000
gauge_mode: stacked
show_scale: true
scale_ticks: 5
show_dots: true
dot_mode: growth
dot_use_source_colors: true
layout_options:
  grid_columns: 12
  grid_rows: 1
```

### Simple solid bar, no dots, no scale

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.total_heating_power   # pre-summed template sensor
max_power: 10000
gauge_mode: solid
gauge_color: "#E65100"
show_scale: false
show_dots: false
layout_options:
  grid_columns: 12
  grid_rows: 1
```

### Gradient bar, inactive style customised

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heating_cable_power
  - entity: sensor.floor_heater_power
icon_active: mdi:radiator
icon_inactive: mdi:radiator-off
color_active: "#BF360C"
color_inactive: "#607D8B"
max_power: 12000
gauge_mode: gradient
gauge_gradient_from: "#42A5F5"
gauge_gradient_to:   "#BF360C"
show_scale: true
show_dots: true
dot_mode: gradient
dot_off_color: "#CFD8DC"
layout_options:
  grid_columns: 12
  grid_rows: 1
```

### kW sensor with correction factor

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heatpump_power_kw     # reports in kW → auto ×1000
  - entity: sensor.boiler_power_raw      # reports in W but ×10 over-reported
    factor: 0.1
max_power: 15000
gauge_mode: solid
```

---

## Development

```bash
# Install dependencies
npm install

# Development build with source maps + watch
npm run watch

# Production build (minified, no source maps)
npm run build:prod

# Type-check only
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

After `npm run build`, commit `dist/heating-power-card.js` to the repository so HACS can install it without requiring a build step.

---

## Credits
- **[Claude](https://claude.ai) by [Anthropic](https://www.anthropic.com)** — this integration was developed with the assistance of Claude, Anthropic's AI assistant.

---

## License

MIT — see [LICENSE](LICENSE).

[hacs-badge]: https://img.shields.io/badge/HACS-Custom-orange.svg
[hacs-url]: https://hacs.xyz
[release-badge]: https://img.shields.io/github/v/release/aalbretsen/heating-power-card
[release-url]: https://github.com/aalbretsen/heating-power-card/releases
[license-badge]: https://img.shields.io/github/license/aalbretsen/heating-power-card
