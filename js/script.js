// ==========================================
// 1. Header aur Footer load karne ka function
// ==========================================
async function loadComponent(elementId, filePath) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.error(elementId + " container nahi mila!");
        return false;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error("File load nahi hui: " + filePath);
        }

        const html = await response.text();
        element.innerHTML = html;

        return true;

    } catch (error) {
        console.error("Component load karne mein error:", error);
        return false;
    }
}


// ==========================================
// 2. Header ke navigation links set karna
// ==========================================
function setHeaderLinks(isHtmlPage) {

    document.querySelectorAll(".page-link").forEach(function (link) {

        const section = link.dataset.section;

        if (!section) return;

        link.href = isHtmlPage
            ? "../index.html#" + section
            : "#" + section;
    });

    // Logo ka link
    const logo = document.querySelector(".watch-brand");

    if (logo) {

        logo.href = isHtmlPage
            ? "../index.html#home"
            : "#home";

        // Logo image ka correct path
        const logoImage = logo.querySelector("img");

        if (logoImage) {
            logoImage.src = isHtmlPage
                ? "../images/sharmawatchlogo.jpeg"
                : "images/sharmawatchlogo.jpeg";
        }
    }
    const wallWatchLink = document.querySelector(".wall-watch-link");

    if (wallWatchLink) {
        wallWatchLink.href = isHtmlPage
            ? "wall-watches.html"
            : "html/wall-watches.html";
    }

// Table Watches link
const tableWatchLink = document.querySelector(".table-watches-link");

if (tableWatchLink) {
    tableWatchLink.href = isHtmlPage
        ? "table-watches.html"
        : "html/table-watches.html";
}
}


// ==========================================
// 3. Footer ke links set karna
// ==========================================
function setFooterLinks(isHtmlPage) {

    const footer = document.getElementById("footer");

    if (!footer) return;

    footer.querySelectorAll("a[href]").forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) return;

        // External links, email aur phone links ko mat badlo
        if (
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:") ||
            href.startsWith("//")
        ) {
            return;
        }

        // #contact jaise links ko sahi section par bhejo
        if (href.startsWith("#")) {
            link.href = isHtmlPage
                ? "../index.html" + href
                : href;

            return;
        }

        // Root-relative links ko mat badlo
        if (href.startsWith("/")) return;

        // Brand page se index ki HTML files tak sahi path
        if (isHtmlPage && href.startsWith("html/")) {
            link.href = "../" + href;
        }
    });
}


// ==========================================
// 4. URL hash ke according section par scroll
// ==========================================
function scrollToHashSection() {

    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = decodeURIComponent(hash.substring(1));
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "auto",
            block: "start"
        });
    }
}


// ==========================================
// 5. Bootstrap JavaScript check karna
// ==========================================
function checkBootstrap() {

    if (typeof bootstrap === "undefined") {
        console.error(
            "Bootstrap JavaScript load nahi hua. " +
            "HTML page mein bootstrap.bundle.min.js add karo."
        );
    }
}


// ==========================================
// 6. Page ke according components load karna
// ==========================================
document.addEventListener("DOMContentLoaded", async function () {

    // Check karo ki current page html folder mein hai ya nahi
    const isHtmlPage = window.location.pathname
        .toLowerCase()
        .includes("/html/");

    // Header aur Footer ke paths
    const componentPath = isHtmlPage
        ? "../components/"
        : "components/";

    // Header load karo
    const headerLoaded = await loadComponent(
        "header",
        componentPath + "header.html"
    );

    // Header load hone ke baad links set karo
    if (headerLoaded) {
        setHeaderLinks(isHtmlPage);
    }

    // Footer load karo
    const footerLoaded = await loadComponent(
        "footer",
        componentPath + "footer.html"
    );

    // Footer load hone ke baad links set karo
    if (footerLoaded) {
        setFooterLinks(isHtmlPage);
    }

    // Sirf main Index page par sections load honge
    if (!isHtmlPage) {

        await loadComponent("home", "html/home.html");

        await loadComponent("services", "html/services.html");

        await loadComponent("gallery", "html/gallery.html");

        // Contact ki file available ho to uncomment karo
        // await loadComponent("contact", "html/contact.html");

        // Content load hone ke baad sahi section par scroll
        scrollToHashSection();
    }

    // Bootstrap available hai ya nahi check karo
    checkBootstrap();

});



document.addEventListener("DOMContentLoaded", function () {
    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
