// Store prices as integer centavos to keep later cart and payment math exact.
const PRODUCTS = [
  { id: "instant-noodles", name: "Instant Noodles", category: "Snacks", priceCentavos: 1800 },
  { id: "potato-chips", name: "Potato Chips", category: "Snacks", priceCentavos: 2500 },
  { id: "soft-drink", name: "Soft Drink (Can)", category: "Drinks", priceCentavos: 2500 },
  { id: "bottled-water", name: "Bottled Water", category: "Drinks", priceCentavos: 2000 },
  { id: "ballpen", name: "Ballpen (piece)", category: "School supplies", priceCentavos: 1200 },
  { id: "notebook", name: "Notebook (piece)", category: "School supplies", priceCentavos: 3500 },
];

// Product IDs map to quantities for the current, in-memory order.
const cart = new Map();
let completedSale = null;
let transactionNumber = 0;

function formatPeso(centavos) {
  return `₱${(centavos / 100).toFixed(2)}`;
}

function renderProducts() {
  const list = document.querySelector("#product-list");

  for (const product of PRODUCTS) {
    const card = document.createElement("article");
    card.className = "product-card";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const footer = document.createElement("div");
    footer.className = "product-footer";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPeso(product.priceCentavos);

    const button = document.createElement("button");
    button.className = "add-button";
    button.type = "button";
    button.textContent = "Add to cart";
    button.dataset.productId = product.id;
    button.setAttribute("aria-label", `Add ${product.name} to cart`);
    button.addEventListener("click", () => addProduct(product.id));

    footer.append(price, button);
    card.append(category, name, footer);
    list.append(card);
  }
}

function addProduct(productId) {
  if (completedSale || !PRODUCTS.some((product) => product.id === productId)) return;
  cart.set(productId, (cart.get(productId) || 0) + 1);
  renderCart();
}

function changeQuantity(productId, amount) {
  if (completedSale) return;
  const quantity = cart.get(productId);
  if (!quantity) return;
  // The separate Remove button deletes a line; decrease stops at one.
  cart.set(productId, Math.max(1, quantity + amount));
  renderCart();
}

function removeProduct(productId) {
  if (completedSale) return;
  cart.delete(productId);
  renderCart();
}

function getTotalCentavos() {
  let total = 0;
  for (const [productId, quantity] of cart) {
    const product = PRODUCTS.find((item) => item.id === productId);
    total += product.priceCentavos * quantity;
  }
  return total;
}

function createCartButton(label, action, product, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = action === "remove" ? "remove-button" : "quantity-button";
  button.textContent = label;
  button.dataset.action = action;
  button.dataset.productId = product.id;
  const actionLabel = action === "remove"
    ? `Remove ${product.name} from cart`
    : `${action === "increase" ? "Increase" : "Decrease"} quantity of ${product.name}`;
  button.setAttribute("aria-label", actionLabel);
  button.disabled = disabled;
  return button;
}

function renderCart() {
  const items = document.querySelector("#cart-items");
  items.replaceChildren();
  document.querySelector("#cart-empty").hidden = cart.size > 0;

  for (const [productId, quantity] of cart) {
    const product = PRODUCTS.find((item) => item.id === productId);
    const row = document.createElement("article");
    row.className = "cart-row";

    const details = document.createElement("div");
    details.className = "cart-details";
    const name = document.createElement("h3");
    name.textContent = product.name;
    const unitPrice = document.createElement("span");
    unitPrice.className = "unit-price";
    unitPrice.textContent = `${formatPeso(product.priceCentavos)} each`;
    details.append(name, unitPrice);

    const controls = document.createElement("div");
    controls.className = "cart-controls";
    const quantityControls = document.createElement("div");
    quantityControls.className = "quantity-controls";
    const decrease = createCartButton("−", "decrease", product, quantity === 1 || Boolean(completedSale));
    const count = document.createElement("span");
    count.className = "quantity-value";
    count.textContent = String(quantity);
    count.setAttribute("aria-label", `Quantity: ${quantity}`);
    const increase = createCartButton("+", "increase", product, Boolean(completedSale));
    quantityControls.append(decrease, count, increase);
    controls.append(quantityControls, createCartButton("Remove", "remove", product, Boolean(completedSale)));

    const subtotal = document.createElement("div");
    subtotal.className = "line-subtotal";
    const subtotalLabel = document.createElement("span");
    subtotalLabel.textContent = "Subtotal";
    const subtotalAmount = document.createElement("strong");
    subtotalAmount.textContent = formatPeso(product.priceCentavos * quantity);
    subtotal.append(subtotalLabel, subtotalAmount);

    row.append(details, controls, subtotal);
    items.append(row);
  }

  const total = formatPeso(getTotalCentavos());
  document.querySelector("#order-total").textContent = total;
  document.querySelector("#payment-total").textContent = total;
  updateCheckoutState();
}

function setPaymentMessage(message, tone = "") {
  const messageElement = document.querySelector("#payment-message");
  messageElement.textContent = message;
  messageElement.className = `field-message${tone ? ` is-${tone}` : ""}`;
  document.querySelector("#cash-received").setAttribute("aria-invalid", String(tone === "error"));
}

function updateCheckoutState() {
  const hasItems = cart.size > 0;
  const isComplete = Boolean(completedSale);
  document.querySelector("#cash-received").disabled = !hasItems || isComplete;
  document.querySelector("#confirm-payment").disabled = !hasItems || isComplete;
  for (const button of document.querySelectorAll(".add-button")) button.disabled = isComplete;

  if (isComplete) {
    setPaymentMessage(`Payment confirmed. Change: ${formatPeso(completedSale.changeCentavos)}.`, "success");
  } else if (hasItems) {
    setPaymentMessage("Enter the cash received to confirm this order.");
  } else {
    setPaymentMessage("Add an item before payment.");
  }
}

// Return a structured result so every invalid payment follows the same path.
function validatePayment(rawValue, totalCentavos) {
  if (totalCentavos <= 0) return { error: "Add an item before payment." };
  const value = rawValue.trim();
  if (!value) return { error: "Please enter a valid payment amount." };
  if (Number(value) < 0) return { error: "Cash received cannot be negative." };
  if (!/^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/.test(value)) {
    return { error: "Enter a numeric cash amount with up to two decimal places." };
  }

  const paidCentavos = Math.round(Number(value) * 100);
  if (!Number.isSafeInteger(paidCentavos)) {
    return { error: "Please enter a valid payment amount." };
  }
  if (paidCentavos < totalCentavos) {
    return { error: `Insufficient payment. Enter at least ${formatPeso(totalCentavos)}.` };
  }
  return { paidCentavos, changeCentavos: paidCentavos - totalCentavos };
}

function makeReceiptCell(tag, text) {
  const cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
}

function renderReceipt(sale) {
  const receipt = document.querySelector("#receipt");
  receipt.replaceChildren();
  document.querySelector("#receipt-placeholder").hidden = false;
  if (!sale) return;
  document.querySelector("#receipt-placeholder").hidden = true;

  const paper = document.createElement("div");
  paper.className = "receipt-paper";
  const storeName = document.createElement("p");
  storeName.className = "receipt-store";
  storeName.textContent = "Campus Convenience Store";
  const reference = document.createElement("p");
  reference.className = "receipt-reference";
  reference.textContent = `Transaction: ${sale.reference}`;

  const table = document.createElement("table");
  table.className = "receipt-table";
  const head = document.createElement("thead");
  const headingRow = document.createElement("tr");
  headingRow.append(
    makeReceiptCell("th", "Item"),
    makeReceiptCell("th", "Qty"),
    makeReceiptCell("th", "Subtotal")
  );
  head.append(headingRow);
  const body = document.createElement("tbody");
  for (const item of sale.items) {
    const row = document.createElement("tr");
    const itemCell = makeReceiptCell("td", item.name);
    const unitPrice = document.createElement("small");
    unitPrice.textContent = `${formatPeso(item.priceCentavos)} each`;
    itemCell.append(unitPrice);
    row.append(
      itemCell,
      makeReceiptCell("td", String(item.quantity)),
      makeReceiptCell("td", formatPeso(item.priceCentavos * item.quantity))
    );
    body.append(row);
  }
  table.append(head, body);

  const totals = document.createElement("dl");
  totals.className = "receipt-totals";
  for (const [label, amount] of [
    ["Total", sale.totalCentavos],
    ["Cash received", sale.paidCentavos],
    ["Change", sale.changeCentavos],
  ]) {
    totals.append(makeReceiptCell("dt", label), makeReceiptCell("dd", formatPeso(amount)));
  }
  paper.append(storeName, reference, table, totals);
  receipt.append(paper);
}

function confirmPayment() {
  if (completedSale) return;
  const totalCentavos = getTotalCentavos();
  const result = validatePayment(document.querySelector("#cash-received").value, totalCentavos);
  if (result.error) {
    setPaymentMessage(result.error, "error");
    return;
  }

  transactionNumber += 1;
  completedSale = {
    reference: `POS-${Date.now()}-${String(transactionNumber).padStart(3, "0")}`,
    items: [...cart].map(([productId, quantity]) => {
      const product = PRODUCTS.find((item) => item.id === productId);
      return { name: product.name, priceCentavos: product.priceCentavos, quantity };
    }),
    totalCentavos,
    paidCentavos: result.paidCentavos,
    changeCentavos: result.changeCentavos,
  };
  renderCart();
  renderReceipt(completedSale);
  document.querySelector("#receipt-heading").focus();
}

function startNewTransaction() {
  cart.clear();
  completedSale = null;
  document.querySelector("#cash-received").value = "";
  renderCart();
  renderReceipt(null);
  document.querySelector(".add-button")?.focus();
}

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, productId } = button.dataset;
  const wasFocused = document.activeElement === button;
  if (action === "increase") changeQuantity(productId, 1);
  if (action === "decrease") changeQuantity(productId, -1);
  if (action === "remove") removeProduct(productId);

  // Re-rendering replaces the clicked row, so restore keyboard focus.
  if (wasFocused) {
    const nextButton = document.querySelector(
      `#cart-items button[data-product-id="${productId}"][data-action="${action}"]`
    );
    const fallback = document.querySelector(
      `#cart-items button[data-product-id="${productId}"][data-action="increase"]`
    ) || document.querySelector(`#product-list button[data-product-id="${productId}"]`);
    (nextButton && !nextButton.disabled ? nextButton : fallback)?.focus();
  }
});

document.querySelector("#payment-form").addEventListener("submit", (event) => {
  event.preventDefault();
  confirmPayment();
});
document.querySelector("#cash-received").addEventListener("input", () => {
  if (!completedSale) setPaymentMessage("Enter the cash received to confirm this order.");
});
document.querySelector("#new-transaction").addEventListener("click", startNewTransaction);

renderProducts();
renderCart();
