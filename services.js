document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const serviceCards = document.querySelectorAll(".service-card");
    const subcategoryPopup = document.getElementById("subcategory-popup");
    const itemPopup = document.getElementById("item-popup");
    const productPopup = document.getElementById("product-popup");
    const popupTitle = document.getElementById("popup-title");
    const subcategoryGrid = document.getElementById("subcategory-grid");
    const itemGrid = document.getElementById("item-grid");
    const productDetails = document.getElementById("product-details");
    const closeSubcategoryPopup = document.getElementById("close-subcategory-popup");
    const closeItemPopup = document.getElementById("close-item-popup");
    const closeProductPopup = document.getElementById("close-product-popup");

    // Validate necessary DOM elements
    if (!serviceCards.length || !subcategoryPopup || !itemPopup || !subcategoryGrid || !itemGrid || !productPopup || !productDetails) {
        console.error("One or more DOM elements are missing.");
        return;
    }

    // Mocked subcategories and items data
    const data = {
        furniture: {
            title: "Furniture and Office Equipment",
            subcategories: {
                "Laboratory Furniture": [
                    {
                        name: "Lab Chair",
                        price: "RM120.00",
                        description: "Comfortable and ergonomic lab chair suitable for laboratories.",
                        images: ["lab-chair1.jpg", "lab-chair2.jpg"]
                    },
                    {
                        name: "Workbench",
                        price: "RM450.00",
                        description: "Durable and spacious workbench for industrial and laboratory use.",
                        images: ["workbench1.jpg", "workbench2.jpg"]
                    }
                ],
                "Wooden Furniture": [
                    {
                        name: "Dining Table",
                        price: "RM999.00",
                        description: "Elegant wooden dining table with a classic finish.",
                        images: ["dining-table1.jpg", "dining-table2.jpg"]
                    },
                    {
                        name: "Bookshelf",
                        price: "RM250.00",
                        description: "Spacious bookshelf for organizing your books and documents.",
                        images: ["bookshelf1.jpg", "bookshelf2.jpg"]
                    }
                ]
            }
        },
        stationery: {
            title: "Office Supplies and Stationery",
            subcategories: {
                "General Stationery": [
                    {
                        name: "Stapler",
                        price: "RM10.00",
                        description: "High-quality stapler for efficient document management.",
                        images: ["stapler1.jpg", "stapler2.jpg"]
                    },
                    {
                        name: "Puncher",
                        price: "RM15.00",
                        description: "Durable puncher for creating neat holes in documents.",
                        images: ["puncher1.jpg", "puncher2.jpg"]
                    }
                ]
            }
        }
    };

    // Add click event listeners to service cards
    serviceCards.forEach((card) => {
        card.addEventListener("click", () => {
            const category = card.getAttribute("data-category");
            const selectedCategory = data[category];

            if (!selectedCategory) {
                console.error(`Category "${category}" not found.`);
                return;
            }

            // Populate subcategory popup
            popupTitle.textContent = selectedCategory.title;
            renderSubcategories(selectedCategory.subcategories);
            subcategoryPopup.classList.remove("hidden");
        });
    });

    // Render subcategories dynamically
    function renderSubcategories(subcategories) {
        subcategoryGrid.innerHTML = ""; // Clear previous content
        Object.keys(subcategories).forEach((subcategory) => {
            const subcategoryCard = document.createElement("div");
            subcategoryCard.className = "subcategory-card";
            subcategoryCard.textContent = subcategory;
            subcategoryCard.addEventListener("click", () => {
                renderItems(subcategories[subcategory], subcategory);
            });
            subcategoryGrid.appendChild(subcategoryCard);
        });
    }

    // Render items dynamically
    function renderItems(items, subcategoryName) {
        popupTitle.textContent = subcategoryName;
        itemGrid.innerHTML = ""; // Clear previous content

        items.forEach((item) => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";

            const itemImage = document.createElement("img");
            itemImage.src = `assets/images/${item.images[0]}`;
            itemImage.alt = item.name;

            const itemName = document.createElement("h5");
            itemName.textContent = item.name;

            itemCard.appendChild(itemImage);
            itemCard.appendChild(itemName);

            itemCard.addEventListener("click", () => {
                showProductDetails(item);
            });

            itemGrid.appendChild(itemCard);
        });

        itemPopup.classList.remove("hidden");
    }

    // Show product details in a modal
    function showProductDetails(item) {
        productDetails.innerHTML = `
            <h2>${item.name}</h2>
            <p class="price">${item.price}</p>
            <p class="description">${item.description}</p>
            <div class="carousel">
                ${item.images
                    .map(
                        (image) => `<img class="carousel-image" src="assets/images/${image}" alt="${item.name}">`
                    )
                    .join("")}
            </div>
            <button class="add-to-cart">Add to Cart</button>
        `;

        setupCarousel();
        productPopup.classList.remove("hidden");
    }

    // Setup carousel functionality
    function setupCarousel() {
        const images = document.querySelectorAll(".carousel-image");
        let currentIndex = 0;

        const updateCarousel = () => {
            images.forEach((img, index) => {
                img.style.display = index === currentIndex ? "block" : "none";
            });
        };

        updateCarousel();

        // Add navigation buttons
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.className = "carousel-prev";
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        });

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.className = "carousel-next";
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        });

        productDetails.appendChild(prevButton);
        productDetails.appendChild(nextButton);
    }

    // Close subcategory popup
    closeSubcategoryPopup.addEventListener("click", () => {
        subcategoryPopup.classList.add("hidden");
    });

    // Close item popup
    closeItemPopup.addEventListener("click", () => {
        itemPopup.classList.add("hidden");
    });

    // Close product popup
    closeProductPopup.addEventListener("click", () => {
        productPopup.classList.add("hidden");
    });
});
