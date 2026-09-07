// ================= SEARCH =================

function openSearch() {
    const searchBox = document.getElementById("searchBox");
    const searchInput = document.getElementById("searchInput");

    searchBox.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 100);
}

function closeSearch() {
    const searchBox = document.getElementById("searchBox");

    searchBox.classList.remove("active");
}


// ================= PRODUCT DISPLAY =================

function displayProducts(productList) {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-products">
                <div>🔍</div>
                <h3>No Products Found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    productGrid.innerHTML = productList.map(product => {

        return `
            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <span class="discount">
                        ${product.discount}% OFF
                    </span>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

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


// ================= SEARCH PRODUCTS =================

function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );

    });

    displayProducts(filteredProducts);
}


// ================= START WEBSITE =================

document.addEventListener("DOMContentLoaded", function () {
    // ================= CATEGORY FILTER =================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const selectedCategory = this.dataset.category;

        if (selectedCategory === "All") {
            displayProducts(products);
        } else {

            const filteredProducts = products.filter(product =>
                product.category === selectedCategory
            );

            displayProducts(filteredProducts);
        }

        document.getElementById("deals").scrollIntoView({
            behavior: "smooth"
        });

    });

});

    displayProducts(products);

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
    const searchContent = document.querySelector(".search-content");
    const searchButton = document.querySelector(".search-btn");

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
