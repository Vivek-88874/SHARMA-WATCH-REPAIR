const watches = [
    {
        brand: "Sonata",
        name: "Sonata Classic Watch",
        price: 1299,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Sonata",
        name: "Sonata Analog Watch",
        price: 1599,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Fastrack",
        name: "Fastrack Stylish Watch",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Fastrack",
        name: "Fastrack Casual Watch",
        price: 2999,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Zoop by Titan",
        name: "Zoop Kids Watch",
        price: 799,
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Tommy Hilfiger",
        name: "Tommy Hilfiger Classic",
        price: 9999,
        image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Kenneth Cole",
        name: "Kenneth Cole Classic",
        price: 8999,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Anne Klein",
        name: "Anne Klein Elegant Watch",
        price: 7999,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Police",
        name: "Police Urban Watch",
        price: 6999,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Titan Smart Nebula",
        name: "Titan Smart Nebula Watch",
        price: 9999,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80"
    }
];

const watchContainer = document.getElementById("watchContainer");
const brandTitle = document.getElementById("brandTitle");
const buttons = document.querySelectorAll(".category-btn");


function showWatches(selectedBrand) {

    brandTitle.textContent =
        selectedBrand === "All"
            ? "All Watches"
            : selectedBrand + " Watches";

    const filteredWatches =
        selectedBrand === "All"
            ? watches
            : watches.filter(function (watch) {
                return watch.brand === selectedBrand;
            });

    watchContainer.innerHTML = "";

    if (filteredWatches.length === 0) {
        watchContainer.innerHTML =
            '<div class="col-12 no-products">No watches available.</div>';
        return;
    }

    filteredWatches.forEach(function (watch) {

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


// Har category button par click event
buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        buttons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        showWatches(this.dataset.brand);
    });
});

// Page open hone par default category
showWatches("All");
