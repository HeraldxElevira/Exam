# Campus Convenience Store POS

A small desktop-friendly point-of-sale app for the IT 415 Scenario 5 practical examination. It uses HTML, CSS, and JavaScript with a fixed six-product catalog.

## Development stages

1. **Setup and interface (complete):** Show all six products and prices, plus clearly labeled order, payment, and receipt areas.
2. **Ordering and calculations (current):** Add cart controls, quantities, line subtotals, and the running total.
3. **Validation and final improvements:** Validate cash, confirm payment, calculate change, generate a receipt, and reset for a new transaction.

## Files

- index.html — the app's sections and accessible labels.
- styles.css — responsive desktop layout and visual styles.
- app.js — hard-coded product data, in-memory cart, and live calculations.

## Run Stage 2

Open index.html in a desktop browser. No installation, server, account, or network connection is needed.

## Stage 2 manual checks

1. Confirm the six products appear with the exact names and prices in the exam prompt.
2. Add two Instant Noodles and one Notebook. The rows should show quantities 2 and 1, subtotals ₱36.00 and ₱35.00, and a total of ₱71.00 in both the order and payment sections.
3. Increase Notebook to 2: its subtotal becomes ₱70.00 and the total becomes ₱106.00.
4. Decrease Notebook to 1: the total returns to ₱71.00. Decrease stays disabled at quantity 1.
5. Remove Instant Noodles: only Notebook remains and the total becomes ₱35.00. Remove Notebook: the empty-cart message returns and both totals show ₱0.00.
6. Use mouse and keyboard to check the controls. Cash payment and New transaction remain disabled until Stage 3.

## Main functions

- formatPeso(centavos) converts an integer amount to a peso amount with two decimal places.
- renderProducts() creates the six catalog cards from the fixed PRODUCTS array.
- addProduct(), changeQuantity(), and removeProduct() update the in-memory cart.
- getTotalCentavos() sums integer-centavo line amounts; renderCart() redraws the summary and both displayed totals.

Cash validation, change, receipt generation, and reset will be added after this stage is reviewed.
