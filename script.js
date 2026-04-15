let cart = [];

const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartOverlay = document.getElementById("cart-overlay");

const productSections = {
    trending: document.getElementById("trending-products"),
    movement: document.getElementById("movement-products")
};

const maleProductsGrid = document.getElementById("male-products");
const femaleProductsGrid = document.getElementById("female-products");
const kidsProductsGrid = document.getElementById("kids-products");
const products = Array.isArray(window.productsData) ? [...window.productsData] : [];
const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');

// ABRIR / CERRAR CARRITO
cartIcon.addEventListener("click", () => {
    openCartSidebar();
});

closeCartBtn.addEventListener("click", () => {
    closeCartSidebar();
});

cartOverlay.addEventListener("click", () => {
    closeCartSidebar();
});

function createCardHTML(product) {
    const badgeHTML = product.badge ? '<span class="badge-new">NEW</span>' : "";
    const priceData = product.price.toFixed(2);

    return `
        <div class="product-card">
            <div class="product-image">
                ${badgeHTML}
                <img src="${product.image}" alt="${product.alt}">
                <div class="wishlist-icon"><i class="fa-regular fa-heart"></i></div>
            </div>
            <div class="product-info">
                <p class="brand">${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="price">${product.priceLabel}</p>
            </div>
            <button class="btn-buy" data-name="${product.name}" data-price="${priceData}">COMPRAR AHORA</button>
        </div>
    `;
}

function renderProducts(list = products) {
    Object.values(productSections).forEach(container => {
        if (container) container.innerHTML = "";
    });

    list.forEach(product => {
        const container = productSections[product.section];
        if (!container) return;

        container.insertAdjacentHTML("beforeend", createCardHTML(product));
    });
}

function renderMaleProducts() {
    if (!maleProductsGrid) return;

    const maleProducts = products.filter(item => item.gender === "male");
    maleProductsGrid.innerHTML = maleProducts.map(createCardHTML).join("");
}

function renderFemaleProducts() {
    if (!femaleProductsGrid) return;

    const femaleProducts = products.filter(item => item.gender === "female");
    femaleProductsGrid.innerHTML = femaleProducts.map(createCardHTML).join("");
}

function renderKidsProducts() {
    if (!kidsProductsGrid) return;

    const kidsProducts = products.filter(item => item.gender === "nino");
    kidsProductsGrid.innerHTML = kidsProducts.map(createCardHTML).join("");
}

function getSelectedFilters() {
    const selections = {};

    filterCheckboxes.forEach(cb => {
        const group = cb.dataset.filterGroup;
        const value = cb.dataset.value;
        if (!group || !cb.checked) return;
        if (!selections[group]) selections[group] = new Set();
        selections[group].add(value);
    });

    return selections;
}

function applyFilters() {
    const selected = getSelectedFilters();

    if (Object.keys(selected).length === 0) {
        renderProducts(products);
        bindBuyButtons();
        return;
    }

    const filtered = products.filter(product => {
        return Object.entries(selected).every(([group, values]) => {
            const field = product[group];
            return field && values.has(String(field));
        });
    });

    renderProducts(filtered);
    bindBuyButtons();
}

function bindBuyButtons() {
    document.querySelectorAll(".btn-buy").forEach(button => {
        button.addEventListener("click", () => {
            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price)
            };

            cart.push(product);
            updateCart();
            openCartSidebar();
        });
    });
}

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeItem(${index})">X</button>
        `;

        cartItemsContainer.appendChild(div);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function init() {
    renderProducts();
    renderMaleProducts();
    renderFemaleProducts();
    renderKidsProducts();
    bindBuyButtons();

    filterCheckboxes.forEach(cb => {
        cb.addEventListener("change", applyFilters);
    });
}

function openCartSidebar() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
}

init();