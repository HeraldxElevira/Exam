// Store prices as integer centavos to keep later cart and payment math exact.
const PRODUCTS = [
  { id: "instant-noodles", name: "Instant Noodles", category: "Snacks", priceCentavos: 1800 },
  { id: "potato-chips", name: "Potato Chips", category: "Snacks", priceCentavos: 2500 },
  { id: "soft-drink", name: "Soft Drink (Can)", category: "Drinks", priceCentavos: 2500 },
  { id: "bottled-water", name: "Bottled Water", category: "Drinks", priceCentavos: 2000 },
  { id: "ballpen", name: "Ballpen (piece)", category: "School supplies", priceCentavos: 1200 },
  { id: "notebook", name: "Notebook (piece)", category: "School supplies", priceCentavos: 3500 },
];

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
    button.disabled = true; // Stage 2 connects product buttons to the cart.

    footer.append(price, button);
    card.append(category, name, footer);
    list.append(card);
  }
}

renderProducts();
