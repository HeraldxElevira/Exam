---
name: pos-system-security
description: Apply proportionate security protections to the IT415 desktop food-ordering and cash-only POS examination app, especially input integrity, safe calculations, transaction state, and optional web security, without adding out-of-scope infrastructure.
---

# Skill: POS System Security

## Purpose and when to use
Use when implementing, reviewing, or refactoring the security-sensitive parts of the IT415 Food Ordering and Point-of-Sale (POS) application: cash input, product prices, cart quantities, calculations, receipts, and transaction state.

## Source-grounded scope
- **Required by the exam:** At least five priced products, cart/quantity controls, automatic totals, numeric cash input, validation of blank/non-numeric/negative/insufficient payments, correct change, confirmation, receipt, and clean new transaction. **Source:** Practical Exam PDF, Sections IV–V.
- **Explicitly not required:** Login/authentication, a database, inventory management, real payment gateways, QR/card payments, or deployment. Hard-coded products and prices and in-memory data are allowed. **Source:** Practical Exam PDF, Section VII.
- The security measures below are **recommended implementation practices**, not extra examination grading requirements.

## Instructions to the coding assistant
1. **Protect money calculations.** Store Philippine-peso prices in a single trusted product catalog. Prefer integer centavos (or a decimal/money type) for arithmetic, then display amounts with two decimals as `₱0.00`. Never use untrusted user input as a product price. Keep line subtotal = unit price × quantity; overall total = sum of all line subtotals; change = amount paid − total.
2. **Validate before payment is accepted.** Reject blank, whitespace-only, non-numeric, negative, non-finite, malformed, and insufficient cash values. Do not mark a payment successful or generate a paid receipt on invalid input. Display an understandable error. For the required example: `₱165.00` total, `₱200.00` cash, `₱35.00` change.
3. **Preserve cart integrity.** Resolve additions by known product ID, not a user-supplied arbitrary price. Allow positive integer quantities only. Prevent negative quantities and totals. When a quantity becomes zero, remove that item or show an explicit removal action.
4. **Prevent accidental repeated confirmation.** Disable repeated submission or make the confirmation operation idempotent for the current completed transaction; do not generate two receipts because the confirm button was clicked twice. Treat this as a robustness recommendation.
5. **Keep transaction state isolated.** After successful payment, retain the completed transaction details needed for its receipt. Starting a new transaction must clear the previous cart, cash input, validation messages, payment status, and receipt while keeping the product catalog.
6. **Handle user-visible data safely.** If the implementation is a web app, insert product names and error messages as text rather than raw HTML; avoid unsanitized HTML insertion and unsafe string interpolation into code. If any external service or secret is later added, do not commit tokens or credentials. Neither service integration nor secret handling is required for this exam.
7. **Preserve the student's chosen stack and design.** Review and modify only code relevant to the security concern. Do not create authentication, roles, remote payment processing, server databases, or unrelated features unless explicitly requested.

## Review checklist
- [ ] Prices are taken from the application catalog, not editable payment fields.
- [ ] Adding/removing/changing quantities cannot produce negative item counts or totals.
- [ ] A blank, letter-only, negative, or insufficient cash amount cannot complete a sale.
- [ ] Change is computed from the actual current cart total.
- [ ] A successfully confirmed transaction has one consistent transaction reference and receipt.
- [ ] New transaction starts with empty payment/cart/receipt state.
- [ ] Web-specific injection safeguards are checked **only if** this is a web application.

## Output expectation
Report the existing risk, the minimal code change, how it was tested, and any remaining limitation. Distinguish **exam requirement** from **optional security hardening**. Never claim production-grade payment security for a cash-only exercise.
