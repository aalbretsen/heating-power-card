import type { Defaults } from "./types.js";

export const DEFAULTS: Defaults = {
  icon_active:         "mdi:fire",
  icon_inactive:       "mdi:fire-off",
  color_active:        "var(--state-climate-heat-color)",
  color_inactive:      "var(--disabled-text-color)",
  show_badge:          true,
  badge_text_color:    "var(--primary-text-color)",
  badge_position:      "left",
  max_power:           15000,
  gauge_mode:          "gradient",
  gauge_gradient_from: "#FFB74D",
  gauge_gradient_to:   "#E65100",
  show_scale:          true,
  scale_ticks:         5,
  show_dots:           true,
};
