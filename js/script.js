// Header aur Footer load karne ka function
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


// Header ke navigation links set karna
function setHeaderLinks(isHtmlPage) {

    // Home, About, Services, Gallery, Contact
    document.querySelectorAll(".page-link").forEach(function (link) {

        const section = link.dataset.section;

        if (isHtmlPage) {
            link.href = "../index.html#" + section;
        } else {
            link.href = "#" + section;
        }
    });

    // Logo click karne par Home page khulega
    const logo = document.querySelector(".watch-brand");

    if (logo) {
        logo.href = isHtmlPage
            ? "../index.html#home"
            : "#home";
    }
}


// Page ke according components load karna
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
    await loadComponent(
        "footer",
        componentPath + "footer.html"
    );

    // Ye sections sirf main index page par load honge
    if (!isHtmlPage) {

        await loadComponent("home", "html/home.html");
        await loadComponent("services", "html/services.html");
        await loadComponent("gallery", "html/gallery.html");

    }

});
