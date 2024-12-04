document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        furniture: {
            subcategories: [
                { name: "Furniture, Laboratory Furniture, and Accessories", items: ["Office Desk", "Laboratory Chair"] },
                { name: "Wooden, Rattan, Fabric, Metal, Plastic-Based Furniture", items: ["Wooden Table", "Rattan Sofa"] },
                { name: "Laboratory Furniture and Equipment", items: ["Lab Bench", "Lab Cabinet"] },
            ],
        },
        stationery: {
            subcategories: [
                { name: "General Stationery", items: ["Pens", "Notebooks"] },
                { name: "Drafting Materials", items: ["Rulers", "Drawing Tools"] },
            ],
        },
        // Add more categories here
    };

    const serviceCards = document.querySelectorAll('.service-card');
    const subcategoryPopup = document.getElementById('subcategory-popup');
    const itemsPopup = document.getElementById('items-popup');
    const subcategoryList = document.getElementById('subcategory-list');
    const itemsList = document.getElementById('items-list');
    const subcategoryClose = document.getElementById('subcategory-close');
    const itemsClose = document.getElementById('items-close');

    // Show Subcategories
    serviceCards.forEach((card) => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const subcategories = categories[category]?.subcategories;

            if (subcategories) {
                subcategoryList.innerHTML = subcategories
                    .map((sub) => `<li data-sub="${sub.name}">${sub.name}</li>`)
                    .join('');
                subcategoryPopup.classList.add('visible');
            }
        });
    });

    // Show Items
    subcategoryList.addEventListener('click', (event) => {
        const subName = event.target.dataset.sub;
        const category = Object.values(categories).find((cat) =>
            cat.subcategories.some((sub) => sub.name === subName)
        );
        const sub = category.subcategories.find((s) => s.name === subName);

        if (sub) {
            itemsList.innerHTML = sub.items.map((item) => `<li>${item}</li>`).join('');
            itemsPopup.classList.add('visible');
        }
    });

    // Close Popups
    subcategoryClose.addEventListener('click', () => subcategoryPopup.classList.remove('visible'));
    itemsClose.addEventListener('click', () => itemsPopup.classList.remove('visible'));
});
