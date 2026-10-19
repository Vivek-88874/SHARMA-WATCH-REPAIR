// ========================================
// WALL WATCH PRODUCT DATA
// ========================================

const wallWatches = [
    {
        id: 1,
        name: "Classic Wall Watch",
        brand: "Sonata",
        price: 250,
        image: "../images/wall-watches/watch-1.jpg"
    },
    {
        id: 2,
        name: "Modern Wall Watch",
        brand: "Maxima",
        price: 450,
        image: "../images/wall-watches/watch-2.jpg"
    },
    {
        id: 3,
        name: "Wooden Wall Watch",
        brand: "Titan",
        price: 750,
        image: "../images/wall-watches/watch-3.jpg"
    },
    {
        id: 4,
        name: "Premium Wall Watch",
        brand: "Timex",
        price: 1200,
        image: "../images/wall-watches/watch-4.jpg"
    },
    {
        id: 5,
        name: "Round Wall Watch",
        brand: "Sonata",
        price: 350,
        image: "../images/wall-watches/watch-1.jpg"
    },
    {
        id: 6,
        name: "Designer Wall Watch",
        brand: "Titan",
        price: 950,
        image: "../images/wall-watches/watch-3.jpg"
    }
];

// ========================================
// HTML ELEMENTS
// ========================================

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const noProducts = document.getElementById("noProducts");
const sortProducts = document.getElementById("sortProducts");

// ========================================
// GET SELECTED FILTERS
// ========================================

function getSelectedPrices() {
    return [
        ...document.querySelectorAll(
            'input[name="price"]:checked'
        )
    ].map(input => input.value);
}

function getSelectedBrands() {
    return [
        ...document.querySelectorAll(
            'input[name="brand"]:checked'
        )
    ].map(input => input.value);
}

// ========================================
// CHECK PRICE RANGE
// ========================================

function matchesPrice(price, ranges) {
    if (ranges.length === 0) {
        return true;
    }

    return ranges.some(range => {
        switch (range) {
            case "200-300":
                return price >= 200 && price <= 300;

            case "300-500":
                return price > 300 && price <= 500;

            case "500-1000":
                return price > 500 && price <= 1000;

            case "1000-plus":
                return price > 1000;

            default:
                return false;
        }
    });
}

// ========================================
// FILTER AND SORT PRODUCTS
// ========================================

function getFilteredProducts() {
    const selectedPrices = getSelectedPrices();
    const selectedBrands = getSelectedBrands();

    let filtered = wallWatches.filter(watch => {
        const priceMatches = matchesPrice(
            watch.price,
            selectedPrices
        );

        const brandMatches =
            selectedBrands.length === 0 ||
            selectedBrands.includes(watch.brand) ||
            (
                selectedBrands.includes("Other Brands") &&
                !["Titan", "Sonata", "Maxima", "Timex"]
                    .includes(watch.brand)
            );

        return priceMatches && brandMatches;
    });

    const sortValue = sortProducts.value;

    if (sortValue === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
        filtered.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    return filtered;
}

// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts() {
    const products = getFilteredProducts();

    productGrid.innerHTML = "";

    products.forEach(watch => {
        const card = document.createElement("article");
        card.className = "product-card";

        const imageWrap = document.createElement("div");
        imageWrap.className = "product-image-wrap";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = watch.image;
        image.alt = watch.name;
        image.loading = "lazy";

        // Show fallback if image is missing
        image.addEventListener("error", function () {
            this.style.display = "none";

            const fallback = document.createElement("div");
            fallback.textContent = "Image not available";
            fallback.style.padding = "50px 5px";
            fallback.style.textAlign = "center";
            fallback.style.color = "#6c757d";

            imageWrap.appendChild(fallback);
        }, { once: true });

        imageWrap.appendChild(image);

        const info = document.createElement("div");
        info.className = "product-info";

        const brand = document.createElement("div");
        brand.className = "product-brand";
        brand.textContent = watch.brand;

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = watch.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = "₹" + watch.price.toLocaleString("en-IN");

        info.append(brand, name, price);
        card.append(imageWrap, info);
        productGrid.appendChild(card);
    });

    productCount.textContent =
        `Showing ${products.length} of ${wallWatches.length} watches`;

    noProducts.hidden = products.length !== 0;
    productGrid.hidden = products.length === 0;
}

// ========================================
// SYNC DESKTOP AND MOBILE FILTERS
// ========================================

function syncFilterCheckboxes(changedInput) {
    const sameFilters = document.querySelectorAll(
        `input[name="${changedInput.name}"]`
    );

    sameFilters.forEach(input => {
        if (input !== changedInput) {
            input.checked =
                input.value === changedInput.value
                    ? changedInput.checked
                    : input.checked;
        }
    });

    // Copy all checked values between desktop and mobile
    const checkedValues = [
        ...document.querySelectorAll(
            `input[name="${changedInput.name}"]:checked`
        )
    ].map(input => input.value);

    const allSameInputs = document.querySelectorAll(
        `input[name="${changedInput.name}"]`
    );

    // A checkbox group can appear twice: desktop and mobile.
    // Keep both versions synchronized by matching their index.
    const uniqueValues = [...new Set(checkedValues)];

    allSameInputs.forEach(input => {
        input.checked = uniqueValues.includes(input.value);
    });
}

// ========================================
// FILTER EVENTS
// ========================================

document.querySelectorAll(
    'input[name="price"], input[name="brand"]'
).forEach(input => {
    input.addEventListener("change", function () {
        syncFilterCheckboxes(this);
        displayProducts();
    });
});

// ========================================
// CLEAR ALL FILTERS
// ========================================

function clearFilters() {
    document.querySelectorAll(
        'input[name="price"], input[name="brand"]'
    ).forEach(input => {
        input.checked = false;
    });

    sortProducts.value = "default";

    displayProducts();
}

document.getElementById("clearFilters")
    .addEventListener("click", clearFilters);

document.getElementById("drawerClearFilters")
    .addEventListener("click", clearFilters);

document.getElementById("resetNoProducts")
    .addEventListener("click", clearFilters);

// ========================================
// SORT EVENT
// ========================================

sortProducts.addEventListener("change", displayProducts);

// ========================================
// INITIAL LOAD
// ========================================

displayProducts();