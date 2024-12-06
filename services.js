document.addEventListener('DOMContentLoaded', () => {
    // Complete data structure with categories, subcategories, and items
    const categories = {
        furniture: {
            subcategories: [
                {
                    name: "Furniture, Laboratory Furniture, and Accessories",
                    items: ["Office Desks", "Ergonomic Chairs", "Laboratory Tables"]
                },
                {
                    name: "Wooden, Rattan, Fabric, Metal, Plastic-Based Furniture",
                    items: ["Wooden Cabinets", "Rattan Sofas", "Metal Shelves"]
                },
                {
                    name: "Laboratory Furniture and Equipment",
                    items: ["Lab Benches", "Storage Racks", "Safety Cabinets"]
                },
            ],
        },
        stationery: {
            subcategories: [
                {
                    name: "General Stationery (Excluding Forms and Paper)",
                    items: ["Pens", "Markers", "Notebooks"]
                },
                {
                    name: "Drafting Materials and Drawing Tools",
                    items: ["Rulers", "Protractors", "Drawing Compasses"]
                },
                {
                    name: "Organizers, Diaries, Calendars, Address Books, Receipt Books, Memo Pads",
                    items: ["Wall Calendars", "Desk Planners", "Memo Pads"]
                },
                {
                    name: "Tags, Labels, Signs, and Stickers",
                    items: ["Adhesive Labels", "Name Tags", "Custom Stickers"]
                },
            ],
        },
        sports: {
            subcategories: [
                {
                    name: "Sportswear and Accessories",
                    items: ["Running Shoes", "Sports Bags", "Workout Apparel"]
                },
            ],
        },
        medical: {
            subcategories: [
                {
                    name: "Hospital Equipment and Medical Supplies",
                    items: ["Hospital Beds", "Wheelchairs", "Oxygen Tanks"]
                },
                {
                    name: "Hospital Equipment and Accessories",
                    items: ["IV Stands", "Medical Monitors", "Surgical Lights"]
                },
                {
                    name: "Medical Equipment and Supplies",
                    items: ["Stethoscopes", "Thermometers", "Blood Pressure Monitors"]
                },
                {
                    name: "Rehabilitation and Disability Equipment",
                    items: ["Crutches", "Walkers", "Hearing Aids"]
                },
            ],
        },
        pharmaceuticals: {
            subcategories: [
                {
                    name: "Non-Scheduled Medicines",
                    items: ["Pain Relievers", "Cold Medications", "Vitamins"]
                },
            ],
        },
        disposable: {
            subcategories: [
                {
                    name: "Disposable Medical Tools",
                    items: ["Syringes", "Disposable Gloves", "Face Masks"]
                },
                {
                    name: "Disposable Textiles for Staff/Patients",
                    items: ["Surgical Gowns", "Patient Sheets", "Head Covers"]
                },
                {
                    name: "Reusable Textiles for Staff/Patients",
                    items: ["Washable Gowns", "Reusable Bed Sheets", "Pillow Covers"]
                },
            ],
        },
        chemicals: {
            subcategories: [
                {
                    name: "Laboratory Equipment",
                    items: ["Test Tubes", "Microscopes", "Beakers"]
                },
                {
                    name: "Laboratory Accessories",
                    items: ["Sample Holders", "Petri Dishes", "Bunsen Burners"]
                },
                {
                    name: "Measuring and Calibration Tools",
                    items: ["Calipers", "Thermometers", "Weight Scales"]
                },
            ],
        },
        defense: {
            subcategories: [
                {
                    name: "Security and Enforcement Equipment",
                    items: ["Security Cameras", "Metal Detectors", "Handcuffs"]
                },
                {
                    name: "Safety, Protection, and Monitoring Tools",
                    items: ["Smoke Alarms", "First Aid Kits", "Protective Helmets"]
                },
                {
                    name: "Fire Prevention Equipment",
                    items: ["Fire Extinguishers", "Fire Blankets", "Sprinkler Systems"]
                },
            ],
        },
        engineering: {
            subcategories: [
                {
                    name: "Electrical Engineering Tools",
                    items: ["Multimeters", "Soldering Kits", "Circuit Testers"]
                },
                {
                    name: "Electrical Cables, Wires, and Accessories",
                    items: ["Power Cables", "LAN Wires", "Extension Cords"]
                },
                {
                    name: "Electrical and Electronic Components and Systems",
                    items: ["Transformers", "Circuit Breakers", "Relays"]
                },
                {
                    name: "Lighting Components and Accessories",
                    items: ["LED Bulbs", "Light Switches", "Smart Lighting Systems"]
                },
            ],
        },
        professional: {
            subcategories: [
                {
                    name: "Cleaning and Maintenance Services",
                    items: ["Deep Cleaning", "Janitorial Supplies", "Sanitization Services"]
                },
                {
                    name: "Building and Office Cleaning",
                    items: ["Window Cleaning", "Floor Polishing", "Carpet Cleaning"]
                },
                {
                    name: "Area Cleaning",
                    items: ["Garden Maintenance", "Parking Lot Sweeping", "Trash Removal"]
                },
                {
                    name: "Garbage Collection",
                    items: ["Commercial Trash Pickup", "Recycling Services", "Waste Management"]
                },
            ],
        },
        repairs: {
            subcategories: [
                {
                    name: "Air Conditioning Systems",
                    items: ["HVAC Repairs", "Filter Replacements", "Thermostat Calibration"]
                },
                {
                    name: "Medical and Laboratory Equipment",
                    items: ["Diagnostic Machine Repairs", "Calibration Services", "Replacement Parts"]
                },
            ],
        },
        beautification: {
            subcategories: [
                {
                    name: "Building Interior Design",
                    items: ["Furniture Layouts", "Wall Art Installations", "Lighting Designs"]
                },
                {
                    name: "Outdoor Landscaping",
                    items: ["Garden Design", "Lawn Maintenance", "Tree Planting"]
                },
            ],
        },
        leasing: {
            subcategories: [
                {
                    name: "Office Machines and Equipment",
                    items: ["Photocopiers", "Printers", "Workstations"]
                },
            ],
        },
        tailoring: {
            subcategories: [
                {
                    name: "Clothing and Accessories Tailoring",
                    items: ["Custom Suits", "Uniforms", "Alteration Services"]
                },
            ],
        },
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
