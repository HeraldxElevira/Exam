---
name: pos-modern-design
description: Create a polished but practical desktop POS visual design for the IT415 food-ordering exercise, prioritizing readability and correct transactions over decorative complexity.
---

# Skill: POS Modern Design

## Purpose and when to use
Use when styling or visually refining the product list, cart, payment area, success confirmation, or receipt of an IT415 computer-based food-ordering POS application.

## Source-grounded scope
- The interface must work with a **mouse and keyboard on a desktop/laptop**. Product list, cart/order summary, payment, and receipt must be easy to distinguish. **Source:** Practical Exam PDF, Section VI.
- The provided sample UI is **inspiration, not a required replica**; functionality outweighs an elaborate design. **Source:** Practical Exam PDF, Sections VI and XI.
- The accompanying documentation form includes an example dark-themed cafeteria interface with product cards and a highlighted payment button (pages 2–4) and an itemized receipt example (page 6). These are **examples, not mandatory styling**.

## Visual design direction (optional recommendations)
Choose one restrained and consistent visual language rather than mixing styles. A suitable example for a cafeteria POS is:

| Role | Example token | Use |
|---|---|---|
| Background | `#0F172A` | Dark application shell |
| Panels | `#1E293B` | Product, cart, and payment containers |
| Primary action | `#0D9488` | Add, confirm, new transaction |
| Text | `#F8FAFC` | High-visibility foreground |
| Secondary text | `#CBD5E1` | Hints and metadata |
| Error | `#F87171` | Inline invalid-payment messages |
| Border | `#334155` | Delineate cards and sections |

These colors are **design suggestions only**. A light theme or a simpler theme is equally acceptable. Verify readable text contrast in the final palette.

## Instructions to the coding assistant
1. **Design desktop-first.** Prefer a product area and persistent order/cart area side-by-side when space allows; stack sections gracefully when the browser/window narrows. Ensure essential buttons are visible or reachable without layout clipping.
2. **Establish visual hierarchy.** Make the application name, product name, peso price, quantities, total due, cash entry, and change unmistakable. Emphasize `Total Due` and the primary action, not decorative elements.
3. **Keep product cards consistent.** Display each product name and `₱` price in the same positions. Use one clear Add button per product. Use a consistent grid, sensible spacing, and predictable card height.
4. **Keep cart controls compact.** Present item, unit price, quantity controls, subtotal, and Remove clearly. Align money values to improve scanning. Always format amounts as Philippine pesos with two decimal places.
5. **Make the payment area prominent but controlled.** Provide a labeled cash field and a clearly named confirmation button. Include space for validation errors without overlapping buttons or changing layout unpredictably.
6. **Make success visible.** After a valid payment, show total, cash paid, change, and a clear path to the receipt and next transaction. Display the receipt as a clean, printable-looking column or panel with a transaction number.
7. **Prioritize accessibility.** Use legible fonts, visible keyboard focus, distinguishable disabled states, clear text labels, and sufficient contrast. Do not communicate an error only through color.
8. **Avoid design bloat.** No animation library, external font, chart, dashboard, multi-page navigation, or advanced visual effect is necessary. Add any of these only if they do not harm speed or the required workflow.
9. **Retain existing behavior.** Visual changes must not break adding/removing products, quantity controls, payment validation, change computation, receipt generation, or new-transaction reset.

## Acceptance review
- [ ] Core controls are easy to locate at desktop size.
- [ ] Cards, totals, buttons, and receipt share consistent spacing and typography.
- [ ] Labels and currency amounts are readable in screenshots.
- [ ] Invalid input and successful payment each have readable feedback.
- [ ] All 12 required features still work after styling changes.
- [ ] The design is original enough to be the student's own implementation, not an unnecessary exact copy of the sample.

## Output expectation
Deliver focused style/layout changes; explain the chosen hierarchy, desktop behavior, and which required screens were checked. Clearly label non-required aesthetic enhancements as optional.
