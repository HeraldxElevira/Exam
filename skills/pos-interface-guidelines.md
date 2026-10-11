---
name: pos-interface-guidelines
description: Design and audit the IT415 POS's cashier-facing interaction flow, desktop keyboard/mouse controls, actionable feedback, and readable product/cart/payment/receipt screens.
---

# Skill: POS Interface Guidelines

## Purpose and when to use
Use when designing UI behavior, organizing screens, improving accessibility, or checking whether the IT415 POS can be operated clearly by a cashier on a standard **desktop or laptop** with a **mouse and keyboard**.

## What the actual exam specifies
Section VI of the Practical Exam PDF requires a usable desktop layout, **clearly distinguishable** product list, cart/order summary, payment entry, and receipt, plus readable success/error feedback. These may be on separate screens, tabs, or sections of one screen. The sample design does **not** have to be copied. A simple functioning interface is preferable to an unfinished complex one.

## Interaction requirements

### Product list / ordering area
- Display at least five relevant products with visible names and `₱` prices.
- Associate an explicit **Add to Cart** button with each product. Mouse users should not have to drag or swipe.
- Provide immediate acknowledgement when an item is added, preferably by visibly updating the cart rather than relying on a fleeting pop-up.

### Cart / order summary
- Show each distinct item, quantity, price/subtotal, and the grand total.
- Provide obvious **Increase (+)**, **Decrease (−)**, and **Remove** actions. Do not let quantities become negative.
- Recalculate the displayed total immediately after every cart change. Empty-cart state should say the cart is empty and guide the user to add products.

### Payment entry and confirmation
- Use a field visibly labeled **Cash Received (₱)** or equivalent, with normal keyboard entry.
- Label the total amount due next to payment entry. Show payment errors **near the field** in plain language; never rely on red color alone.
- On valid sufficient payment, show a distinct success/confirmation state with computed change. A single page with clearly separated sections is acceptable if the seven-step flow is obvious.

### Digital receipt and reset
- Give the receipt a clear heading, transaction reference, itemized details, total, cash received, and change.
- Provide a clearly labeled **New Transaction** action; it should start with an empty cart, empty payment input, and no previous receipt.
- A **Print Receipt** control is optional; a visible digital receipt is what the exam explicitly requires.

## Keyboard and readability guidance (recommended)
1. Keyboard Tab/Shift+Tab can reach product buttons, cart controls, cash input, confirm, and new transaction in a sensible order.
2. Focus is visible; buttons have readable text and sufficiently large mouse targets.
3. Enter/Space activates a focused button according to normal platform behavior; avoid shortcuts that conflict with typing in the payment field.
4. Use real form labels rather than placeholders alone. Show messages as text and, where supported, programmatically associate them with the field.
5. Keep currency to two decimal places and avoid truncated product names or hidden totals.
6. When a transaction completes, move attention to its confirmation or receipt so the user knows what happened.

## Interface acceptance walkthrough
Using only mouse and keyboard:
1. Find products and prices.
2. Add two different products, increase one quantity, then decrease it and remove an item.
3. Observe line subtotals/total updating instantly.
4. Enter bad cash values and see visible, understandable feedback.
5. Pay enough, see confirmation and change, inspect the full receipt.
6. Start another transaction and verify previous details are cleared.

## Evidence requirements
The Documentation Form's Section III requests **readable screenshots of actual running screens** for product/order view, cart summary, payment success/change, and receipt. Use screenshots from the student's real app, with representative data; do not use reference images as submitted work.

## Output expectation
Provide a concise usability review noting control labels, keyboard flow, feedback states, accessibility issues, and changes needed. Do not expand the project into a touch-first kiosk or add unsupported system requirements.
