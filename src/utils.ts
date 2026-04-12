import type { HomeAssistant, EntityConfig } from "./types.js";

export function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [128, 128, 128];
}

export function interpolateColor(from: string, to: string, t: number): string {
  const ratio = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const ch = (a: number, b: number): string =>
    Math.round(a + (b - a) * ratio)
      .toString(16)
      .padStart(2, "0");
  return `#${ch(r1, r2)}${ch(g1, g2)}${ch(b1, b2)}`;
}

export function getUnitMultiplier(unit: string | undefined): number {
  switch (unit?.trim().toLowerCase()) {
    case "kw":
      return 1_000;
    case "mw":
      return 1_000_000;
    case "gw":
      return 1_000_000_000;
    default:
      return 1;
  }
}

export function getEntityWatts(hass: HomeAssistant, cfg: EntityConfig): number {
  const st = hass.states[cfg.entity];
  if (!st) return 0;
  if (st.state === "unavailable" || st.state === "unknown" || st.state === "none") return 0;
  const raw = parseFloat(st.state);
  if (!isFinite(raw) || raw < 0) return 0;
  const unit = st.attributes.unit_of_measurement as string | undefined;
  const value = raw * getUnitMultiplier(unit) * (cfg.factor ?? 1) - (cfg.subtract ?? 0);
  return value < 1 ? 0 : value;
}

// Rounds to a value from the series 1, 2, 5, 10, 20, 50, … so scale labels land on round numbers.
export function niceTickInterval(max: number, desiredTicks: number): number {
  if (max <= 0 || desiredTicks <= 0) return max;
  const rough = max / desiredTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  return nice * mag;
}

export function formatKw(watts: number): string {
  if (watts < 100) return (watts / 1000).toFixed(2);
  if (watts < 10000) return (watts / 1000).toFixed(1);
  return (watts / 1000).toFixed(0);
}
