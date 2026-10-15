// Timex watches data
const watches = [
    {
        name: "TMX Classic Watch",
        brand: "TMX",
        price: 2499,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "TMX Premium Watch",
        brand: "TMX",
        price: 2999,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Fria Classic Watch",
        brand: "Fria",
        price: 2799,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Timex Signio Watch",
        brand: "Timex Signio",
        price: 3499,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Guess Classic Watch",
        brand: "Guess",
        price: 1999,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    }
];

// HTML elements
const watchContainer = document.getElementById("watchContainer");
const brandTitle = document.getElementById("brandTitle");
const categoryButtons = document.querySelectorAll(".category-btn");

// Watches show karne ka function
function showWatches(selectedBrand) {

    // Heading update karo
    brandTitle.textContent = selectedBrand === "All"
        ? "All Timex Watches"
        : selectedBrand + " Watches";

    // Category ke according watches filter karo
    const filteredWatches = selectedBrand === "All"
        ? watches
        : watches.filter(watch => watch.brand === selectedBrand);

    // Purane cards clear karo
    watchContainer.innerHTML = "";

    // Agar watches nahi mili
    if (filteredWatches.length === 0) {
        watchContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>No watches available in this category.</p>
            </div>
        `;
        return;
    }

    // Watch cards banao
    filteredWatches.forEach(watch => {

        watchContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="watch-card">

                    <img src="${watch.image}"
                         alt="${watch.name}"
                         loading="lazy">

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

// Buttons par click event
categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Sabhi buttons se active class hatao
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Click kiye gaye button ko active karo
        this.classList.add("active");

        // Selected category ki watches show karo
        showWatches(this.dataset.brand);
    });

});

// Page open hote hi All watches show karo
showWatches("All");