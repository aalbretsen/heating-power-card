# Heating Power Card

[![HACS][hacs-badge]][hacs-url]
[![Release][release-badge]][release-url]
[![License][license-badge]](LICENSE)

A compact Home Assistant Lovelace card that shows accumulated heating power from multiple sources on a single animated gauge bar.

![Card preview](card_preview.png)

---

## Features

- 🔥 **Configurable icon** — separate MDI icons and colours for active / inactive state
- 🔢 **Total power value** — auto-formatted in kW, colour-coded by state
- ⬤ **Active-source badge** — shows the count of sources currently drawing power; hides automatically when none are on; position and colours configurable
- 📊 **Animated gauge bar** — two modes:
  - `gradient` — colour transitions from light warm orange to deep HA orange as load increases (default)
  - `solid` — single colour fill
- ↕️ **Optional scale** — configurable tick marks below the gauge
- ⚫ **Active-source dots** — one dot per active source (power > 0), colour configurable
- ⚖️ **Automatic unit handling** — W, kW, MW detected from `unit_of_measurement`; custom `factor` per sensor for non-standard units
- ↔️ **Sections view native** — defaults to `rows: 1`, `columns: 12` via `getGridOptions()`; resizes cleanly in the grid-based sections view
- 🔄 **Smooth CSS transitions** — gauge fill animates at 0.5 s ease

---

## Installation

### Via HACS (recommended)

1. Open HACS.
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

| Option                    | Type              | Description                                                                 |
|---------------------------|-------------------|-----------------------------------------------------------------------------|
| `entities`                | `EntityConfig[]`  | List of power sensor entities (max 99).                                     |
| `icon_active`             | `string`          | MDI icon when total > 0.                                                    |
| `icon_inactive`           | `string`          | MDI icon when total = 0.                                                    |
| `color_active`            | `string`          | CSS colour when heating is on (icon, value, badge background, dots).        |
| `color_inactive`          | `string`          | CSS colour when heating is off.                                             |
| `show_badge`              | `boolean`         | Show the active-sources count badge.                                        |
| `badge_background_color`  | `string`          | Badge background colour.                                                    |
| `badge_text_color`        | `string`          | Badge text colour.                                                          |
| `badge_position`          | `left\|right`     | `left` — between value and gauge. `right` — between gauge and dots.         |
| `max_power`               | `number`          | Full-scale in **Watts**.                                                    |
| `gauge_mode`              | `solid\|gradient` | Visual style of the gauge bar.                                              |
| `gauge_gradient_from`     | `string`          | Low-end colour for `gradient` mode (Material Orange 300).                   |
| `gauge_gradient_to`       | `string`          | High-end colour for `gradient` mode (Material Deep Orange 900).             |
| `show_scale`              | `boolean`         | Show tick marks below the gauge.                                            |
| `scale_ticks`             | `number`          | Approximate number of major ticks.                                          |
| `show_dots`               | `boolean`         | Show per-source indicator dots on the right.                                |
| `dot_color`               | `string`          | Dot colour. Defaults to the HA theme foreground (white in most themes).     |

### EntityConfig

| Option     | Type     | Description                                                                                              |
|------------|----------|----------------------------------------------------------------------------------------------------------|
| `entity`   | `string` | HA entity id of the power sensor.                                                                        |
| `name`     | `string` | Optional label (used in the card editor).                                                                |
| `factor`   | `number` | Multiplier applied **on top of** unit auto-detection. Use `0.1` if the sensor under-reports by 10×, etc. |
| `subtract` | `number` | Fixed wattage (always in W) to subtract from the sensor reading before contributing to the total.        |

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

### Default gradient bar with dots

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heating_cable_power
  - entity: sensor.floor_heater_living_room
  - entity: sensor.floor_heater_bedroom
  - entity: sensor.panel_heater_hall
max_power: 15000
grid_options:
  columns: 12
  rows: 1
```

### Badge on the right, custom dot colour

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heating_cable_power
  - entity: sensor.floor_heater_power
max_power: 15000
badge_position: right
dot_color: "#FF8C00"
grid_options:
  columns: 12
  rows: 1
```

### Badge hidden, solid bar, no scale

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heating_cable_power
  - entity: sensor.floor_heater_power
max_power: 12000
gauge_mode: solid
show_badge: false
show_scale: false
show_dots: false
grid_options:
  columns: 12
  rows: 1
```

### Custom colours and icons

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
gauge_gradient_from: "#FFCCBC"
gauge_gradient_to: "#BF360C"
grid_options:
  columns: 12
  rows: 1
```

### kW sensor with correction factor

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.heatpump_power_kw     # reports in kW → auto ×1000
  - entity: sensor.boiler_power_raw      # reports in W but ×10 over-reported
    factor: 0.1
max_power: 15000
```

### Ventilation unit with a non-heating baseline

```yaml
type: custom:heating-power-card
entities:
  - entity: sensor.ventilation_power     # reports total: motor (100W) + heating element
    subtract: 100                        # subtract the always-on motor load
  - entity: sensor.floor_heater_power
max_power: 10000
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

After `npm run build:prod`, commit `dist/heating-power-card.js` to the repository so HACS can install it without requiring a build step.

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
