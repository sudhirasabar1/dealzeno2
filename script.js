// ================= SEARCH =================

function openSearch() {
    document.getElementById("searchBox").classList.add("active");

    setTimeout(() => {
        document.getElementById("searchInput").focus();
    }, 100);
}

function closeSearch() {
    document.getElementById("searchBox").classList.remove("active");
}


// ================= SHOW PRODUCTS =================

function displayProducts(productList) {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-products">
                <div>🛍️</div>
                <h3>No Products Found</h3>
                <p>This category does not have products yet.</p>
            </div>
        `;

        return;
    }

    productGrid.innerHTML = productList.map(product => {

        return `
            <div class="product-card">

                <div class="product-image">

                    <img src="${product.image}" alt="${product.name}">

                    <span class="discount">
                        ${product.discount}% OFF
                    </span>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <div class="price">

                        <span class="old-price">
                            ₹${product.oldPrice}
                        </span>

                        <span class="new-price">
                            ₹${product.price}
                        </span>

                    </div>

                    <a
                        href="${product.affiliateLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="buy-button"
                    >
                        BUY NOW →
                    </a>

                </div>

            </div>
        `;

    }).join("");
}


// ================= CATEGORY FILTER =================

function filterByCategory(category) {

    if (category === "All") {

        displayProducts(products);

    } else {

        const filteredProducts = products.filter(product =>
            product.category === category
        );

        displayProducts(filteredProducts);
    }

    // Update filter buttons

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.classList.remove("active");

        if (button.dataset.category === category) {
            button.classList.add("active");
        }

    });

    // Scroll to products

    document.getElementById("deals").scrollIntoView({
        behavior: "smooth"
    });
}


// ================= SEARCH =================

function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const filteredProducts = products.filter(product => {

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );

    });

    displayProducts(filteredProducts);
}


// ================= WEBSITE START =================

document.addEventListener("DOMContentLoaded", function () {

    // Show all products when website opens
    displayProducts(products);


    // Filter buttons

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.addEventListener("click", function () {

            const category = this.dataset.category;

            filterByCategory(category);

        });

    });


    // Category cards

    document.querySelectorAll(".category-card").forEach(card => {

        card.addEventListener("click", function () {

            const category = this.dataset.category;

            filterByCategory(category);

        });

    });


    // Search

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

    }

});


// ================= CLOSE SEARCH =================

document.addEventListener("click", function (event) {

    const searchBox = document.getElementById("searchBox");

    const searchContent =
        document.querySelector(".search-content");

    const searchButton =
        document.querySelector(".search-btn");

    if (
        searchBox &&
        searchBox.classList.contains("active") &&
        searchContent &&
        !searchContent.contains(event.target) &&
        !searchButton.contains(event.target)
    ) {

        closeSearch();

    }

});


// ================= ESC KEY =================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeSearch();
    }

});
