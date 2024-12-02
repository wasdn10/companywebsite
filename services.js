document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.getElementById('category-cards');
    const subcategoryContainer = document.getElementById('subcategory-cards');
    const itemContainer = document.getElementById('item-cards');
    const backButton = document.getElementById('back-button');

    const servicesData = {
        furniture: {
            title: 'Furniture and Office Equipment',
            subcategories: {
                lab: { title: 'Laboratory Furniture', items: ['Desks', 'Chairs', 'Cabinets'] },
                wood: { title: 'Wooden Furniture', items: ['Tables', 'Bookshelves'] },
                accessories: { title: 'Accessories', items: ['Lab Tables', 'Lab Cabinets'] }
            }
        },
        stationery: {
            title: 'Office Supplies and Stationery',
            subcategories: {
                general: { title: 'General Stationery', items: ['Pens', 'Notebooks'] },
                drafting: { title: 'Drafting Tools', items: ['Rulers', 'Drawing Pads'] },
                organizers: { title: 'Organizers', items: ['Diaries', 'Calendars', 'Address Books'] }
            }
        },
        // Additional categories and subcategories...
    };

    const renderCards = (container, data, type) => {
        container.innerHTML = '';
        Object.entries(data).forEach(([key, value]) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-key', key);
            card.innerHTML = `<h3>${value.title || key}</h3><p>${value.description || ''}</p>`;
            card.addEventListener('click', () => handleCardClick(key, type));
            container.appendChild(card);
        });
    };

    const handleCardClick = (key, type) => {
        if (type === 'category') {
            renderCards(subcategoryContainer, servicesData[key].subcategories, 'subcategory');
            toggleVisibility(categoryContainer, subcategoryContainer);
        } else if (type === 'subcategory') {
            renderCards(itemContainer, servicesData[key].items.reduce((acc, item) => {
                acc[item] = { title: item };
                return acc;
            }, {}), 'item');
            toggleVisibility(subcategoryContainer, itemContainer);
        }
    };

    const toggleVisibility = (hideContainer, showContainer) => {
        hideContainer.classList.add('hidden');
        showContainer.classList.remove('hidden');
        backButton.classList.remove('hidden');
    };

    const navigateBack = () => {
        if (!itemContainer.classList.contains('hidden')) {
            toggleVisibility(itemContainer, subcategoryContainer);
        } else if (!subcategoryContainer.classList.contains('hidden')) {
            toggleVisibility(subcategoryContainer, categoryContainer);
            backButton.classList.add('hidden');
        }
    };

    renderCards(categoryContainer, servicesData, 'category');
    backButton.addEventListener('click', navigateBack);
});
