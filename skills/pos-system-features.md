---
name: pos-system-features
description: Implement and test the exact IT415 food-ordering cash POS transaction flow, required cart/payment/receipt features, and assignment-specific product catalog within the exam's limited scope.
---

# Skill: POS System Features

## Purpose and when to use
Use to plan, build, review, or test **functional requirements** of the computer-based Food Ordering and Point-of-Sale (POS) application for the IT415 midterm practical examination.

## Mandatory boundaries
- Build **only the scenario assigned by the instructor**. The form lists five scenarios but does not identify a selected one; the cafeteria screenshots in the form are examples, not proof of an assigned scenario. Ask which scenario applies when building a specific app and it is unknown.
- The examination is **individual**, takes **150 minutes**, and expects responsible AI-assisted development. **Source:** Practical Exam PDF, Sections I and III.
- At least five products priced in **Philippine pesos** must appear. Hard-coded catalogs and in-memory carts are acceptable; a database, login, inventory module, deployment, or real payment provider is not required. **Source:** Practical Exam PDF, Sections III and VII.

## Seven-step required transaction flow
Implement in this order (Practical Exam PDF, Section IV):

1. **Browse products:** Show available items, names, and prices.
2. **Add to cart:** Add one or more items; allow quantity adjustment.
3. **Review order:** Show item, quantity, subtotal, and total.
4. **Enter payment:** Enter a cash amount using a numeric field.
5. **Validate and compute:** Reject invalid/insufficient payment; calculate change.
6. **Confirm payment:** Show successful transaction details.
7. **Receipt/new transaction:** Show a digital receipt; let cashier begin again.

## All 12 required features
- [ ] Show at least 5 named, priced products.
- [ ] Add items through on-screen buttons.
- [ ] Increase quantity of a cart item.
- [ ] Decrease quantity of a cart item.
- [ ] Remove an item from the cart.
- [ ] Automatically update line subtotals and grand total when cart changes.
- [ ] Show a clear order summary.
- [ ] Provide a numeric cash-payment input.
- [ ] Reject blank, non-numeric, negative, and insufficient payments with visible messages.
- [ ] Correctly calculate `Change = Amount Paid − Total Amount` for valid payment.
- [ ] Display payment confirmation after success.
- [ ] Generate a receipt with items, quantities, subtotals, total, amount paid, change, and transaction reference; allow starting a new transaction and clear previous cart/payment/receipt data.

The checklist compresses the official Section V's 12 numbered requirements; decreasing/increasing quantity are parts of the same official item.

## Product catalog: use the instructor-assigned scenario
**Scenario 1 — Campus Cafeteria:** Rice (Plain) ₱15.00; Fried Chicken (1 pc) ₱65.00; Pork Adobo ₱60.00; Vegetable Side Dish ₱35.00; Iced Tea (cup) ₱20.00; Bottled Water ₱20.00.

**Scenario 2 — Campus Bakery:** Pandesal (pack of 5) ₱25.00; Ensaymada ₱20.00; Spanish Bread ₱15.00; Chocolate Cupcake ₱30.00; Loaf Bread ₱55.00; Brewed Coffee (cup) ₱25.00.

**Scenario 3 — Milk Tea and Beverage Shop:** Classic Milk Tea (Regular) ₱59.00; Wintermelon Milk Tea (Regular) ₱65.00; Taro Milk Tea (Regular) ₱65.00; Fruit Tea — Lychee (Regular) ₱55.00; Brown Sugar Milk Tea (Regular) ₱69.00; Bottled Water ₱20.00.

**Scenario 4 — Campus Snack Bar:** Classic Burger ₱55.00; Cheeseburger ₱65.00; Ham Sandwich ₱40.00; French Fries (Regular) ₱45.00; Nachos ₱50.00; Soda (Can) ₱25.00.

**Scenario 5 — Campus Convenience Store:** Instant Noodles ₱18.00; Potato Chips ₱25.00; Soft Drink (Can) ₱25.00; Bottled Water ₱20.00; Ballpen (piece) ₱12.00; Notebook (piece) ₱35.00.

*Source: Practical Exam PDF, Sections III and product tables on pages 2–3. Slight naming variations are allowed; keep at least five products and peso prices.*

## Build procedure
1. Confirm the actual scenario and chosen class-approved framework/language.
2. Define product IDs, names, prices, and cart state. Use integer centavos/decimal arithmetic where possible.
3. Implement `add`, `increase`, `decrease`, and `remove`; recalculate totals when cart changes.
4. Implement a validated cash field, change calculation, and success confirmation.
5. Generate the required receipt from the completed order, including a transaction reference.
6. Reset **all prior transaction state** for a new purchase; do not reset the fixed product catalog.
7. Run end-to-end checks for the exact worked example and the invalid cases in `pos-error-handling`.

## Required worked-example test
For Scenario 1 only: **2 × Fried Chicken (₱65.00) + 1 × Rice (₱15.00) + 1 × Iced Tea (₱20.00) = ₱165.00**. If paid **₱200.00**, show **₱35.00** change. **Source:** Practical Exam PDF, Section IV.

## Examination evidence reminders (not extra software features)
- Record at least **two separate, actual AI prompts**, ideally one feature-building prompt and one later debugging/refactoring prompt. For each, document exact prompt, purpose, response summary/screenshot, evaluation, and modifications. **Source:** Practical Exam PDF, Section VIII; Documentation Form, Section II.
- Show at least **three meaningful Git milestones**: initial UI/setup; core cart/calculations; validation/debugging/final improvements. Push to GitHub and include README. **Source:** Practical Exam PDF, Section IX; Documentation Form, Section IV.
- Capture actual running screens: product list, cart/order summary, payment success/change, receipt, and commit history. **Source:** Practical Exam PDF, Section X; Documentation Form, Section III.
- **Do not fabricate** AI prompts, code changes, screenshots, test results, timestamps, or commit history.

## Definition of done
A single full transaction works without errors, all mandated features pass manual testing, and submission evidence accurately reflects the student's work. Prioritize this over optional features.
