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
    const cart = [];

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
            },
        },
    };

    // Utility to clear an element's content
    const clearElement = (element) => {
        element.innerHTML = "";
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
        clearElement(subcategoryGrid);
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
        clearElement(itemGrid);

        items.forEach((item) => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";

            const itemImage = document.createElement("img");
            itemImage.src = `assets/images/${item.images[0]}`;
            itemImage.alt = item.name;

            const itemName = document.createElement("h5");
            itemName.textContent = item.name;

            const itemPrice = document.createElement("p");
            itemPrice.textContent = item.price;

            itemCard.appendChild(itemImage);
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);

            itemCard.addEventListener("click", () => {
                showProductDetails(item);
            });

            itemGrid.appendChild(itemCard);
        });

        itemPopup.classList.remove("hidden");
    }

    // Show product details in a modal
    function showProductDetails(item) {
        clearElement(productDetails);
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

        setupCarousel(item);
        productPopup.classList.remove("hidden");

        // Add to Cart functionality
        const addToCartButton = document.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => {
            cart.push(item);
            alert(`${item.name} has been added to your cart!`);
            console.log("Current Cart:", cart);
        });
    }

    // Setup carousel functionality
    function setupCarousel(item) {
        const images = document.querySelectorAll(".carousel-image");
        let currentIndex = 0;

        const updateCarousel = () => {
            images.forEach((img, index) => {
                img.style.display = index === currentIndex ? "block" : "none";
            });
        };

        updateCarousel();

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

    // Close popups
    closeSubcategoryPopup.addEventListener("click", () => {
        subcategoryPopup.classList.add("hidden");
    });

    closeItemPopup.addEventListener("click", () => {
        itemPopup.classList.add("hidden");
    });

    closeProductPopup.addEventListener("click", () => {
        productPopup.classList.add("hidden");
    });
});
