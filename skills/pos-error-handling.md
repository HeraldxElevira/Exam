---
name: pos-error-handling
description: Implement understandable payment validation, safe cart-state recovery, and realistic positive/negative test cases for the IT415 food-ordering cash POS.
---

# Skill: POS Error Handling

## Purpose and when to use
Use when implementing payment validation, fixing quantity/totals bugs, diagnosing unsuccessful transactions, or preparing test evidence for the IT415 cash-only POS application.

## Required validation behavior
The Practical Exam PDF, Section V, explicitly requires the application to reject each of these with a **clear on-screen message**:

| Input / situation | Expected result |
|---|---|
| Blank cash amount | Reject; no successful transaction |
| Non-numeric cash amount | Reject; no successful transaction |
| Negative cash amount | Reject; no successful transaction |
| Cash amount smaller than total due | Reject; state the minimum amount needed |
| Valid cash equal to total | Accept; change is ₱0.00 |
| Valid cash greater than total | Accept; calculate exact change |

Use the wording given by the exam where helpful:
- `Please enter a valid payment amount.` for blank, non-numeric, or negative entry.
- `Insufficient payment. Please enter at least ₱165.00.` for the example ₱165.00 total (derive the amount from the current cart; do **not** hard-code `₱165.00`).

## Instructions to the coding assistant
1. **Validate in one place.** Normalize the input, parse it carefully into a finite monetary value, and return a structured success/error result. Avoid duplicated logic in click handlers and display components.
2. **Keep errors non-destructive.** If payment is invalid, preserve the cart and entered values as appropriate so the cashier can correct the amount. Do not create a receipt or set `paid=true`.
3. **Do not permit bad cart state.** Ignore or reject invalid/unknown product IDs, non-integer quantities, and negative counts. Decreasing from one should either remove the item or stop at one with a separate Remove button; the UI must clearly communicate the chosen behavior.
4. **Avoid stale totals.** Recalculate after addition, increase, decrease, and removal. Use the recomputed total—not an earlier displayed value—to check sufficient payment.
5. **Protect against repeated confirmation.** Once a sale is confirmed, prevent extra confirmations from creating duplicate transaction references or receipts (recommended robustness measure).
6. **Handle empty-cart checkout.** Prefer a visible `Add an item before payment.` message and block payment; this is a sensible safeguard, though not an expressly numbered exam criterion.
7. **Recover gracefully.** Keep a clear path to edit cash or cart and retry. Starting a new transaction must clear old error banners along with cart, payment, and receipt data.
8. **Use messages, not silent failure.** Place errors close to the relevant field or action. Do not expose stack traces or raw exception messages in the cashier interface.
9. **Respect scope.** Do not introduce backend retries, distributed transactions, remote gateways, or logging infrastructure unless the student's actual implementation requires them.

## Concrete manual test matrix

| Test | Action | Expected outcome |
|---|---|---|
| T01 | Add 2 chicken + 1 rice + 1 tea (Scenario 1) | Total `₱165.00` |
| T02 | Enter empty/whitespace payment | Validity error; no receipt |
| T03 | Enter `abc` payment | Validity error; no receipt |
| T04 | Enter `-20` payment | Validity error; no receipt |
| T05 | Enter `100` against `₱165.00` | Insufficient payment; minimum `₱165.00` |
| T06 | Enter `165` against `₱165.00` | Success; change `₱0.00` |
| T07 | Enter `200` against `₱165.00` | Success; change `₱35.00` |
| T08 | Increase/decrease/remove cart items | All subtotals and total update correctly |
| T09 | Select New Transaction after success | No old cart, paid amount, receipt, or errors |
| T10 | Activate payment twice rapidly | Only one completed sale/receipt (recommended) |
| T11 | Try to pay while cart is empty | Clear rejection (recommended) |

T01 and T05–T07 use the official Scenario 1 worked example only. If the actual assignment is another scenario, choose an equivalent calculation from **that assigned catalog**.

## Reporting template
For every bug fix, describe:
1. **Reproduction:** exact user action and values.
2. **Observed behavior:** what the app actually did.
3. **Expected behavior:** official requirement or clearly labeled recommendation.
4. **Minimal fix:** affected function/component and why it addresses the root cause.
5. **Retest:** concrete input and observed result. Do not invent pass results; mark unexecuted tests as `Not run`.

## Definition of done
All four required invalid-payment categories fail safely with clear messages; equal or greater payments succeed with correct change; the cart remains coherent; reset removes prior transaction data; and test outcomes reflect actual execution.
