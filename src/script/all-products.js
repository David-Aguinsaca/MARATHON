const allProductsGrid = document.getElementById("all-products");
const allProducts = Array.isArray(window.productsData) ? [...window.productsData] : [];

function renderAllProducts() {
    if (!allProductsGrid) return;
    allProductsGrid.innerHTML = allProducts.map(product => {
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
    }).join("");
}

renderAllProducts();
bindBuyButtons();
