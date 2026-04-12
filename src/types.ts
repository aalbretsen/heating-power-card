export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
}

export type GaugeMode = "solid" | "gradient";
export type BadgePosition = "left" | "right";

export interface EntityConfig {
  entity: string;
  factor?: number;
  subtract?: number;
}

export interface HeatingPowerCardConfig {
  entities: EntityConfig[];
  icon_active?: string;
  icon_inactive?: string;
  color_active?: string;
  color_inactive?: string;
  show_badge?: boolean;
  badge_background_color?: string;
  badge_text_color?: string;
  badge_position?: BadgePosition;
  max_power?: number;
  gauge_mode?: GaugeMode;
  gauge_gradient_from?: string;
  gauge_gradient_to?: string;
  show_scale?: boolean;
  scale_ticks?: number;
  show_dots?: boolean;
  dot_color?: string;
}

export interface Defaults {
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
