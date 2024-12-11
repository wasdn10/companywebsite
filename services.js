document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const serviceCards = document.querySelectorAll(".service-card");
    const subcategoryPopup = document.getElementById("subcategory-popup");
    const itemPopup = document.getElementById("item-popup");
    const popupTitle = document.getElementById("popup-title");
    const subcategoryGrid = document.getElementById("subcategory-grid");
    const itemGrid = document.getElementById("item-grid");
    const closeSubcategoryPopup = document.getElementById("close-subcategory-popup");
    const closeItemPopup = document.getElementById("close-item-popup");
    const cart = []; // Array to store cart items

    // Validate necessary DOM elements
    if (!serviceCards.length || !subcategoryPopup || !itemPopup || !subcategoryGrid || !itemGrid) {
        console.error("One or more DOM elements are missing.");
        return;
    }

    // Fetch Subcategories and Items Data dynamically
    fetch('data.json')
        .then(response => response.json())
        .then(data => {

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
                    subcategoryPopup.classList.add("visible");
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

                    const itemPrice = document.createElement("p");
                    itemPrice.textContent = `Price: $${item.price}`;

                    const addToCartButton = document.createElement("button");
                    addToCartButton.textContent = "Add to Cart";
                    addToCartButton.className = "add-to-cart";
                    addToCartButton.addEventListener("click", () => {
                        addToCart(item);
                    });

                    itemCard.appendChild(itemImage);
                    itemCard.appendChild(itemName);
                    itemCard.appendChild(itemPrice);
                    itemCard.appendChild(addToCartButton);

                    itemCard.addEventListener("click", () => {
                        showItemDetails(item);
                    });

                    itemGrid.appendChild(itemCard);
                });

                itemPopup.classList.add("visible");
            }

            // Show item details with carousel
            function showItemDetails(item) {
                itemGrid.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <div class="carousel">
                        ${item.images
                            .map(
                                (image) => `<img class="carousel-image" src="assets/images/${image}" alt="${item.name}">`
                            )
                            .join("")}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${JSON.stringify(item)})">Add to Cart</button>
                `;

                setupCarousel();
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

                itemGrid.appendChild(prevButton);
                itemGrid.appendChild(nextButton);
            }

            // Add item to cart
            function addToCart(item) {
                cart.push(item);
                alert(`${item.name} has been added to your cart.`);
                console.log("Cart: ", cart);
            }

            // Close subcategory popup
            closeSubcategoryPopup.addEventListener("click", () => {
                subcategoryPopup.classList.remove("visible");
            });

            // Close item popup
            closeItemPopup.addEventListener("click", () => {
                itemPopup.classList.remove("visible");
            });

        })
        .catch(error => console.error("Error loading data: ", error));

    // Detect clicks outside popups to close them
    window.addEventListener("click", (event) => {
        if (!subcategoryPopup.contains(event.target) && !subcategoryPopup.classList.contains("hidden")) {
            subcategoryPopup.classList.remove("visible");
        }

        if (!itemPopup.contains(event.target) && !itemPopup.classList.contains("hidden")) {
            itemPopup.classList.remove("visible");
        }
    });
});
