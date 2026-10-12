// ===== Cloudinary Gallery Upload =====

const CLOUDINARY_CLOUD_NAME = "d9ih3etj";
const CLOUDINARY_UPLOAD_PRESET = "watch_gallery";

const galleryForm = document.getElementById("galleryForm");
const watchNameInput = document.getElementById("watchName");
const watchCategoryInput = document.getElementById("watchCategory");
const watchImageInput = document.getElementById("watchImage");
const imagePreview = document.getElementById("imagePreview");
const galleryMessage = document.getElementById("galleryMessage");
const uploadButton = document.getElementById("uploadButton");
const galleryList = document.getElementById("galleryList");

const GALLERY_STORAGE_KEY = "sharmaWatchGallery";

let selectedImage = null;
let previewUrl = null;

// Read gallery records saved in this browser.
function getGalleryItems() {
    try {
        const items = JSON.parse(
            localStorage.getItem(GALLERY_STORAGE_KEY) || "[]"
        );

        return Array.isArray(items) ? items : [];
    } catch {
        return [];
    }
}

// Save gallery records in this browser only.
function saveGalleryItems(items) {
    try {
        localStorage.setItem(
            GALLERY_STORAGE_KEY,
            JSON.stringify(items)
        );

        return true;
    } catch {
        return false;
    }
}

// Show selected image before upload.
if (watchImageInput && imagePreview) {
    watchImageInput.addEventListener("change", function () {
        const file = watchImageInput.files[0];

        selectedImage = null;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }

        if (!file) {
            imagePreview.innerHTML =
                '<i class="bi bi-image"></i>' +
                '<span>Image preview will appear here</span>';
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            watchImageInput.value = "";
            imagePreview.innerHTML =
                '<i class="bi bi-exclamation-circle"></i>' +
                '<span>Please select a JPG, PNG or WEBP image.</span>';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            watchImageInput.value = "";
            imagePreview.innerHTML =
                '<i class="bi bi-exclamation-circle"></i>' +
                '<span>Image must be 5 MB or smaller.</span>';
            return;
        }

        selectedImage = file;
        previewUrl = URL.createObjectURL(file);

        const img = document.createElement("img");
        img.src = previewUrl;
        img.alt = "Selected watch image preview";

        imagePreview.replaceChildren(img);
    });
}

// Render the records saved in this browser.
function renderGallery() {
    if (!galleryList) return;

    galleryList.replaceChildren();

    const items = getGalleryItems();

    if (items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-gallery";
        empty.textContent =
            "No images saved in this browser yet. Upload your first watch image.";
        galleryList.appendChild(empty);
        return;
    }

    items.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "gallery-item";

        const img = document.createElement("img");
        img.src = item.url;
        img.alt = item.name;
        img.loading = "lazy";

        const info = document.createElement("div");
        info.className = "gallery-item-info";

        const title = document.createElement("h4");
        title.textContent = item.name;

        const category = document.createElement("p");
        category.textContent = item.category;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-gallery-item";
        removeButton.textContent = "Remove from this browser";

        removeButton.addEventListener("click", function () {
            const confirmed = window.confirm(
                "Remove this image from this browser's gallery list? " +
                "The Cloudinary image itself will not be deleted."
            );

            if (!confirmed) return;

            const updatedItems = getGalleryItems().filter(
                function (savedItem) {
                    return savedItem.id !== item.id;
                }
            );

            if (!saveGalleryItems(updatedItems)) {
                alert("Could not update browser storage.");
                return;
            }

            renderGallery();
        });

        info.append(title, category, removeButton);
        card.append(img, info);
        galleryList.appendChild(card);
    });
}

// Upload the selected image to Cloudinary.
if (galleryForm) {
    galleryForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = watchNameInput.value.trim();
        const category = watchCategoryInput.value;
        const file = watchImageInput.files[0];

        if (!name || !category || !file) {
            galleryMessage.textContent =
                "Please enter the name, select a category and choose an image.";
            galleryMessage.style.color = "#b42318";
            return;
        }

        if (
            !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
            file.size > 5 * 1024 * 1024
        ) {
            galleryMessage.textContent =
                "Choose a JPG, PNG or WEBP image up to 5 MB.";
            galleryMessage.style.color = "#b42318";
            return;
        }

        uploadButton.disabled = true;
        galleryMessage.textContent = "Uploading image to Cloudinary...";
        galleryMessage.style.color = "#235db0";

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error?.message || "Cloudinary upload failed."
                );
            }

            const items = getGalleryItems();

            items.unshift({
                id: result.public_id,
                name: name,
                category: category,
                url: result.secure_url
            });

            if (!saveGalleryItems(items)) {
                galleryMessage.textContent =
                    "Image uploaded to Cloudinary, but this browser could not save its gallery record. Save the image URL separately.";
                galleryMessage.style.color = "#b42318";
                return;
            }

            galleryForm.reset();
            selectedImage = null;

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                previewUrl = null;
            }

            imagePreview.innerHTML =
                '<i class="bi bi-check-circle"></i>' +
                '<span>Upload complete. Choose another image to continue.</span>';

            galleryMessage.textContent =
                "Image uploaded successfully! URL: " + result.secure_url;
            galleryMessage.style.color = "#218653";

            renderGallery();
        } catch (error) {
            galleryMessage.textContent =
                "Upload failed: " + error.message;
            galleryMessage.style.color = "#b42318";
        } finally {
            uploadButton.disabled = false;
        }
    });
}

renderGallery();