// Mexima Watch Data
const watches = [
    {
        name: "Soffile Classic Watch",
        brand: "Soffile",
        price: 1999,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Soffile Premium Watch",
        brand: "Soffile",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Soffile Elegant Watch",
        brand: "Soffile",
        price: 2999,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Tissot Leccuper Classic",
        brand: "Tissot Leccuper",
        price: 3499,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Tissot Leccuper Premium",
        brand: "Tissot Leccuper",
        price: 3999,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Tissot Leccuper Elegant",
        brand: "Tissot Leccuper",
        price: 4499,
        image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=800&q=80"
    }
];

// HTML Elements
const watchContainer = document.getElementById("watchContainer");
const brandTitle = document.getElementById("brandTitle");
const categoryButtons = document.querySelectorAll(".category-btn");

// Watches Display Function
function showWatches(selectedBrand) {

    // Heading update
    brandTitle.textContent = selectedBrand === "All"
        ? "All Maxima Watches"
        : selectedBrand + " Watches";

    // Filter watches
    const filteredWatches = selectedBrand === "All"
        ? watches
        : watches.filter(watch => watch.brand === selectedBrand);

    // Clear old cards
    watchContainer.innerHTML = "";

    // No products message
    if (filteredWatches.length === 0) {
        watchContainer.innerHTML = `
            <div class="col-12 text-center no-products">
                <h5>No watches available</h5>
                <p>Please check another category.</p>
            </div>
        `;
        return;
    }

    // Create watch cards
    filteredWatches.forEach(watch => {

        watchContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="watch-card">

                    <img
                        src="${watch.image}"
                        alt="${watch.name}"
                        loading="lazy"
                    >

                    <div class="watch-info">

                        <h5>${watch.name}</h5>
                     <div class="watch-price">
                            ₹${watch.price.toLocaleString("en-IN")}
                        </div>

                    </div>

                </div>
            </div>
        `;
    });
}

// Category Button Click Events
categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate clicked button
        this.classList.add("active");

        // Show selected category
        showWatches(this.dataset.brand);
    });

});

// Show all watches when page opens
showWatches("All");
