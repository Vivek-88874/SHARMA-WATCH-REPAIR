const tableWatches = [
    {
        brand: "MAXIMA",
        name: "Classic Table Watch",
        price: 599,
        oldPrice: 799,
        image: "../images/table-watch-1.jpg",
        badge: "Popular"
    },
    {
        brand: "TIMEX",
        name: "Modern Table Watch",
        price: 899,
        oldPrice: 1099,
        image: "../images/table-watch-2.jpg",
        badge: "New"
    },
    {
        brand: "TITAN",
        name: "Premium Table Watch",
        price: 1299,
        oldPrice: 1599,
        image: "../images/table-watch-3.jpg",
        badge: ""
    },
    {
        brand: "SONATA",
        name: "Everyday Table Watch",
        price: 499,
        oldPrice: 699,
        image: "../images/table-watch-4.jpg",
        badge: "Value Pick"
    }
];

const container = document.getElementById("tableWatchContainer");

if (container) {
    container.innerHTML = tableWatches.map(watch => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="table-watch-card">

                <div class="watch-image-box">
                    ${watch.badge
                        ? `<span class="watch-badge">${watch.badge}</span>`
                        : ""}

                    <img src="${watch.image}"
                         alt="${watch.brand} ${watch.name}"
                         loading="lazy">

                </div>

                <div class="watch-card-body">
                    <span class="watch-brand-name">
                        ${watch.brand}
                    </span>

                    <h3>${watch.name}</h3>

                    <div class="watch-price-row">
                        <span class="watch-price">
                            ₹${watch.price.toLocaleString("en-IN")}
                        </span>

                        <span class="watch-old-price">
                            ₹${watch.oldPrice.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <a href="https://wa.me/918090446452"
                       class="watch-details-btn">
                        Enquire Now
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>

            </div>
        </div>
    `).join("");
}