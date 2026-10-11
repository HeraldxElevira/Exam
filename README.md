# Campus Convenience Store POS

A small desktop-friendly point-of-sale app for the IT 415 Scenario 5 practical examination. It uses HTML, CSS, and JavaScript with a fixed six-product catalog.

## Development stages

1. **Setup and interface (complete):** Show all six products and prices, plus clearly labeled order, payment, and receipt areas.
2. **Ordering and calculations (complete):** Add cart controls, quantities, line subtotals, and the running total.
3. **Validation and final improvements (complete):** Validate cash, confirm payment, calculate change, generate a receipt, and reset for a new transaction.

## Files

- index.html — the app's sections and accessible labels.
- styles.css — responsive desktop layout and visual styles.
- app.js — hard-coded product data, in-memory cart, cash validation, and receipt creation.

## Run

Open index.html in a desktop browser. No installation, server, account, or network connection is needed.

## Manual checks

1. Confirm the six products appear with the exact names and prices in the exam prompt.
2. Add two Instant Noodles and one Notebook. The rows should show quantities 2 and 1, subtotals ₱36.00 and ₱35.00, and a total of ₱71.00 in both the order and payment sections.
3. Increase Notebook to 2: its subtotal becomes ₱70.00 and the total becomes ₱106.00.
4. Decrease Notebook to 1: the total returns to ₱71.00. Decrease stays disabled at quantity 1.
5. Remove Instant Noodles: only Notebook remains and the total becomes ₱35.00. Remove Notebook: the empty-cart message returns and both totals show ₱0.00.
6. With an empty cart, confirm cash entry is disabled and the page says to add an item. Add two Instant Noodles and one Notebook again for a ₱71.00 total.
7. Try blank, non-numeric, negative, and ₱70.00 cash. Each must be rejected with an on-screen message and no receipt. A browser number field may block non-numeric typing before submission; an empty invalid field still produces a validation message.
8. Enter ₱71.00 and confirm payment. The page should show ₱0.00 change and a receipt with a transaction reference, items, quantities, subtotals, total, and cash received.
9. Select New transaction. The cart, cash field, confirmation, and receipt should clear. Add the same ₱71.00 order, enter ₱100.00, and confirm: change should be ₱29.00.
10. After payment, confirm the order controls cannot change the completed sale. Check that Tab reaches enabled controls in a sensible order.

## Main functions

- formatPeso(centavos) converts an integer amount to a peso amount with two decimal places.
- renderProducts() creates the six catalog cards from the fixed PRODUCTS array.
- addProduct(), changeQuantity(), and removeProduct() update the in-memory cart.
- getTotalCentavos() sums integer-centavo line amounts; renderCart() redraws the summary and both displayed totals.
- validatePayment() checks cash against the current total and returns either a clear error or exact centavo amounts.
- confirmPayment() freezes a successful sale; renderReceipt() shows its itemized details and reference.
- startNewTransaction() clears the cart, payment, confirmation, and receipt for the next sale.

Transaction data stays in memory and is cleared when the page reloads.
