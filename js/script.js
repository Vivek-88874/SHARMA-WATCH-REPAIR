// Header aur Footer load karne ka function
async function loadComponent(elementId, filePath) {

    // Index page mein container find karo
    const element = document.getElementById(elementId);

    // Agar container nahi mila, to function rok do
    if (!element) {
        console.error(elementId + " container nahi mila!");
        return;
    }

    try {
        // HTML file ko fetch karo
        const response = await fetch(filePath);

        // Check karo file successfully mili ya nahi
        if (!response.ok) {
            throw new Error("File load nahi hui: " + filePath);
        }

        // HTML file ka content read karo
        const html = await response.text();

        // HTML content ko index page mein insert karo
        element.innerHTML = html;

    } catch (error) {
        console.error("Component load karne mein error:", error);
    }
}

// Page load hone ke baad Header aur Footer load karo
document.addEventListener("DOMContentLoaded", async function () {

    await loadComponent("header", "components/header.html");
    await loadComponent("home", "html/home.html");  
    await loadComponent("services", "html/services.html");  
    await loadComponent("footer", "components/footer.html");

});
