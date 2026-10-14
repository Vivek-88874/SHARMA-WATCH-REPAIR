// Header aur Footer load karne ka function
async function loadComponent(elementId, filePath) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.error(elementId + " container nahi mila!");
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error("File load nahi hui: " + filePath);
        }

        const html = await response.text();
        element.innerHTML = html;

    } catch (error) {
        console.error("Component load karne mein error:", error);
    }
}

// Page ke according path set karna
document.addEventListener("DOMContentLoaded", async function () {

    const isHtmlPage = window.location.pathname
        .toLowerCase()
        .includes("/html/");

    const componentPath = isHtmlPage
        ? "../components/"
        : "components/";

    // Header aur Footer sabhi pages par
    await loadComponent("header", componentPath + "header.html");
    await loadComponent("footer", componentPath + "footer.html");

    // Ye sections sirf main page par load honge
    if (!isHtmlPage) {
        await loadComponent("home", "html/home.html");
        await loadComponent("services", "html/services.html");
        await loadComponent("gallery", "html/gallery.html");
    }

});
