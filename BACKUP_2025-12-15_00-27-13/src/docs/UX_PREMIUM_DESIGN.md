# UX Premium Design Specification

## Design Philosophy
"Data as Art." The report should feel like a premium application, not a spreadsheet.

## Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| **Void Black** | `#0A0A0A` | Backgrounds, Cards |
| **Powalyze Gold** | `#BFA76A` | Primary Actions, Highlights, Key Metrics |
| **Electric Blue** | `#3A7BFF` | Secondary Data, Trends |
| **Success Green** | `#10B981` | Positive Variance, On Track |
| **Alert Red** | `#EF4444` | Negative Variance, Critical |
| **Subtle Grey** | `#333333` | Borders, Dividers, Inactive Elements |

## Layout Grid
*   **Canvas Size:** 16:9 (1280 x 720 px default, or 1920 x 1080 px for HD).
*   **Margins:** 20px uniform padding.
*   **Card Design:**
    *   Background: `#111111` (slightly lighter than canvas).
    *   Border: 1px Solid `#FFFFFF` at 10% Opacity.
    *   Corner Radius: 12px.
    *   Shadow: Soft outer glow `0 4px 6px -1px rgba(0, 0, 0, 0.5)`.

## Typography
*   **Font:** Segoe UI (Standard PBI) or DIN (Custom).
*   **Sizes:**
    *   Page Title: 24pt Bold.
    *   Card Title: 14pt SemiBold (Uppercase).
    *   KPI Value: 32pt Bold.
    *   Body Text: 10pt Regular.

## Interactive Elements
*   **Buttons:**
    *   Use SVG images for buttons (Home, Help, Info).
    *   Hover effects using PBI Bookmark Navigator or Button states (Fill change on Hover).
*   **Navigation:**
    *   Left vertical rail or Top horizontal bar.
    *   "Selected" state indicated by Gold accent line.