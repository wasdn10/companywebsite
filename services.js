document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const popup = document.getElementById('subcategory-popup');
    const popupTitle = document.getElementById('popup-title');
    const subcategoryList = document.getElementById('subcategory-list');
    const closePopup = document.getElementById('close-popup');

    // Subcategories Data
    const subcategories = {
        furniture: [
            'Furniture, Laboratory Furniture, and Accessories',
            'Wooden, Rattan, Fabric, Metal, Plastic-Based Furniture',
            'Laboratory Furniture and Equipment'
        ],
        stationery: [
            'General Stationery (Excluding Forms and Paper)',
            'Drafting Materials and Drawing Tools',
            'Organizers, Diaries, Calendars, Address Books, Receipt Books, Memo Pads',
            'Tags, Labels, Signs, and Stickers'
        ],
        sports: ['Sportswear and Accessories'],
        medical: [
            'Hospital Equipment and Medical Supplies',
            'Hospital Equipment and Accessories',
            'Medical Equipment and Supplies',
            'Rehabilitation and Disability Equipment'
        ],
        pharmaceuticals: ['Non-Scheduled Medicines'],
        disposable: [
            'Disposable Medical Tools',
            'Disposable Textiles for Staff/Patients',
            'Reusable Textiles for Staff/Patients'
        ],
        chemicals: [
            'Laboratory Equipment',
            'Laboratory Accessories',
            'Measuring and Calibration Tools'
        ],
        defense: [
            'Security and Enforcement Equipment',
            'Safety, Protection, and Monitoring Tools',
            'Fire Prevention Equipment'
        ],
        engineering: [
            'Electrical Engineering Tools',
            'Electrical Cables, Wires, and Accessories',
            'Electrical and Electronic Components and Systems',
            'Lighting Components and Accessories'
        ],
        professional: [
            'Cleaning and Maintenance Services',
            'Building and Office Cleaning',
            'Area Cleaning',
            'Garbage Collection'
        ],
        repairs: ['Air Conditioning Systems', 'Medical and Laboratory Equipment'],
        beautification: [
            'Building Interior Design',
            'Outdoor Landscaping'
        ],
        leasing: ['Office Machines and Equipment'],
        tailoring: ['Clothing and Accessories Tailoring']
    };

    // Show Subcategory Popup
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            popupTitle.textContent = card.querySelector('h3').textContent;
            subcategoryList.innerHTML = subcategories[category]
                .map(item => `<li>${item}</li>`)
                .join('');
            popup.classList.add('visible');
        });
    });

    // Close Popup
    closePopup.addEventListener('click', () => {
        popup.classList.remove('visible');
    });

    // Close Popup on Outside Click
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('visible');
        }
    });
});
