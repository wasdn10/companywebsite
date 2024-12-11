document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelector(".service-grid");
    const subcategoryPopup = document.getElementById("subcategory-popup");
    const itemPopup = document.getElementById("item-popup");
    const cartPopup = document.getElementById("cart-popup");
    const subcategoryGrid = document.getElementById("subcategory-grid");
    const itemGrid = document.getElementById("item-grid");
    const cartItems = document.getElementById("cart-items");
    const totalPriceDisplay = document.getElementById("total-price");
    const searchInput = document.getElementById("search-bar");
    const closeSubcategoryPopup = document.getElementById("close-subcategory-popup");
    const closeItemPopup = document.getElementById("close-item-popup");
    const closeCartPopup = document.getElementById("close-cart-popup");
    const cart = [];
    let data = {};

    // Fetch JSON Data
    fetch("data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data.json");
            }
            return response.json();
        })
        .then((fetchedData) => {
            data = fetchedData.categories;
            renderServiceCards(data);
        })
        .catch((err) => console.error("Failed to load data:", err));

    // Render Service Cards
    function renderServiceCards(data) {
        serviceCards.innerHTML = ""; // Clear existing content
        data.forEach((category) => {
            const card = document.createElement("div");
            card.className = "service-card";
            card.setAttribute("data-category", category.id);
            card.style.backgroundImage = `url('images/${category.id}.png')`;

            const title = document.createElement("h3");
            title.textContent = category.title;

            card.appendChild(title);
            serviceCards.appendChild(card);

            card.addEventListener("click", () => renderSubcategories(category));
        });
    }

    // Render Subcategories
    function renderSubcategories(category) {
        subcategoryPopup.classList.add("visible");
        subcategoryGrid.innerHTML = ""; // Clear existing content
        category.subcategories.forEach((subcategory) => {
            const subCard = document.createElement("div");
            subCard.className = "subcategory-card";
            subCard.textContent = subcategory.name;

            subCard.addEventListener("click", () => renderItems(subcategory.items));
            subcategoryGrid.appendChild(subCard);
        });
    }

    // Render Items
    function renderItems(items) {
        itemGrid.innerHTML = ""; // Clear existing content
        items.forEach((item) => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";

            itemCard.innerHTML = `
                <img src="images/${item.images[0]}" alt="${item.name}">
                <h5>${item.name}</h5>
                <p>${item.description}</p>
                <p>Price: $${item.price}</p>
                <p>Stock: ${item.stock}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            itemCard.querySelector(".add-to-cart").addEventListener("click", () => addToCart(item));
            itemGrid.appendChild(itemCard);
        });

        itemPopup.classList.add("visible");
    }

    // Add to Cart
    function addToCart(item) {
        const cartItem = cart.find((ci) => ci.id === item.id);
        if (cartItem) {
            if (cartItem.quantity < item.stock) {
                cartItem.quantity++;
            } else {
                alert("Not enough stock available.");
                return;
            }
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        updateCart();
    }

    // Update Cart
    function updateCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item) => {
            totalPrice += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <h5>${item.name} (x${item.quantity})</h5>
                <p>$${item.price} each</p>
            `;

            cartItems.appendChild(cartItem);
        });

        totalPriceDisplay.textContent = `Total: $${totalPrice}`;
    }

    // Close Popups
    [closeSubcategoryPopup, closeItemPopup, closeCartPopup].forEach((button) => {
        button.addEventListener("click", () => {
            subcategoryPopup.classList.remove("visible");
            itemPopup.classList.remove("visible");
            cartPopup.classList.remove("visible");
        });
    });

    // Search Functionality
    searchInput.addEventListener("input", debounce((e) => {
        const query = e.target.value.toLowerCase();
        const filteredItems = data
            .flatMap((category) => category.subcategories.flatMap((sub) => sub.items))
            .filter((item) => item.name.toLowerCase().includes(query));

        renderItems(filteredItems);
    }, 300));

    // Debounce Function
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
});
