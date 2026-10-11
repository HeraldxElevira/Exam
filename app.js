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
  if (!PRODUCTS.some((product) => product.id === productId)) return;
  cart.set(productId, (cart.get(productId) || 0) + 1);
  renderCart();
}

function changeQuantity(productId, amount) {
  const quantity = cart.get(productId);
  if (!quantity) return;
  // The separate Remove button deletes a line; decrease stops at one.
  cart.set(productId, Math.max(1, quantity + amount));
  renderCart();
}

function removeProduct(productId) {
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
    const decrease = createCartButton("−", "decrease", product, quantity === 1);
    const count = document.createElement("span");
    count.className = "quantity-value";
    count.textContent = String(quantity);
    count.setAttribute("aria-label", `Quantity: ${quantity}`);
    const increase = createCartButton("+", "increase", product);
    quantityControls.append(decrease, count, increase);
    controls.append(quantityControls, createCartButton("Remove", "remove", product));

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

renderProducts();
renderCart();
