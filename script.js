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


// Close search when clicking outside the search box

document.addEventListener("click", function (event) {

    const searchBox = document.getElementById("searchBox");
    const searchContent = document.querySelector(".search-content");
    const searchButton = document.querySelector(".search-btn");

    if (
        searchBox.classList.contains("active") &&
        !searchContent.contains(event.target) &&
        !searchButton.contains(event.target)
    ) {
        closeSearch();
    }

});


// Close search with ESC key

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeSearch();
    }

});
