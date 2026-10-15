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

        if (isHtmlPage) {
            link.href = "../index.html#" + section;
        } else {
            link.href = "#" + section;
        }
    });

    // Logo click karne par Home section
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
}


// ==========================================
// 3. Hash ke according correct section par scroll
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
// 4. Page ke according components load karna
// ==========================================
document.addEventListener("DOMContentLoaded", async function () {

    // Check karo current page html folder mein hai ya nahi
    const isHtmlPage = window.location.pathname
        .toLowerCase()
        .includes("/html/");

    // Header aur Footer ke paths
    const componentPath = isHtmlPage
        ? "../components/"
        : "components/";

    // Header load
    const headerLoaded = await loadComponent(
        "header",
        componentPath + "header.html"
    );

    if (headerLoaded) {
        setHeaderLinks(isHtmlPage);
    }

    // Footer load
    await loadComponent(
        "footer",
        componentPath + "footer.html"
    );

    // Sirf Index page par main sections load honge
    if (!isHtmlPage) {

        await loadComponent("home", "html/home.html");

        // About ki file available ho to yahan load kar sakte ho
        // await loadComponent("about", "html/about.html");

        await loadComponent("services", "html/services.html");

        await loadComponent("gallery", "html/gallery.html");

        // Contact ki file available ho to yahan load kar sakte ho
        // await loadComponent("contact", "html/contact.html");

        // Components load hone ke baad correct section par scroll
        scrollToHashSection();
    }

});
