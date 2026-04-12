/**
 * Heating Power Card
 * @license MIT
 * @see https://github.com/aalbretsen/heating-power-card
 */

import "./editor.js";
import "./card.js";

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

window.customCards ??= [];
window.customCards.push({
  type: "heating-power-card",
  name: "Heating Power Card",
  description: "Compact card showing accumulated heating power from multiple sources.",
  preview: true,
  documentationURL: "https://github.com/aalbretsen/heating-power-card",
});
