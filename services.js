document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        furniture: {
            title: "Furniture and Office Equipment",
            subcategories: {
                labFurniture: {
                    title: "Furniture, Laboratory Furniture, and Accessories",
                    items: ["Lab Tables", "Cabinets", "Shelves"],
                },
                woodenFurniture: {
                    title: "Wooden, Rattan, Fabric, Metal, Plastic-Based Furniture",
                    items: ["Desks", "Rattan Chairs", "Plastic Cabinets"],
                },
                labEquipment: {
                    title: "Laboratory Furniture and Equipment",
                    items: ["Lab Stools", "Chemical Cabinets"],
                },
            },
        },
        stationery: {
            title: "Office Supplies and Stationery",
            subcategories: {
                generalStationery: {
                    title: "General Stationery (Excluding Forms and Paper)",
                    items: ["Pens", "Pencils", "Staplers"],
                },
                draftingTools: {
                    title: "Drafting Materials and Drawing Tools",
                    items: ["Rulers", "Drawing Pads"],
                },
                organizers: {
                    title: "Organizers, Diaries, Calendars, Address Books",
                    items: ["Planners", "Calendars", "Memo Pads"],
                },
                tagsAndLabels: {
                    title: "Tags, Labels, Signs, and Stickers",
                    items: ["Adhesive Labels", "Name Tags"],
                },
            },
        },
        sports: {
            title: "Sports and Recreational Equipment",
            subcategories: {
                sportswear: {
                    title: "Sportswear and Accessories",
                    items: ["Jerseys", "Shoes", "Sports Bags"],
                },
            },
        },
        medical: {
            title: "Medical and Pharmaceutical Equipment",
            subcategories: {
                hospitalEquipment: {
                    title: "Hospital Equipment and Medical Supplies",
                    items: ["Surgical Beds", "ECG Machines"],
                },
                accessories: {
                    title: "Hospital Equipment and Accessories",
                    items: ["Bed Rails", "Medical Trolleys"],
                },
                supplies: {
                    title: "Medical Equipment and Supplies",
                    items: ["Syringes", "Blood Pressure Monitors"],
                },
                rehabilitation: {
                    title: "Rehabilitation and Disability Equipment",
                    items: ["Wheelchairs", "Crutches"],
                },
            },
        },
        pharmaceuticals: {
            title: "Pharmaceuticals",
            subcategories: {
                nonScheduled: {
                    title: "Non-Scheduled Medicines",
                    items: ["Painkillers", "Vitamins"],
                },
            },
        },
        disposable: {
            title: "Medical Disposable and Reusable Equipment",
            subcategories: {
                disposableTools: {
                    title: "Disposable Medical Tools",
                    items: ["Surgical Gloves", "Face Masks"],
                },
                disposableTextiles: {
                    title: "Disposable Textiles for Staff/Patients",
                    items: ["Gowns", "Bed Linens"],
                },
                reusableTextiles: {
                    title: "Reusable Textiles for Staff/Patients",
                    items: ["Reusable Scrubs", "Reusable Masks"],
                },
            },
        },
        chemicals: {
            title: "Chemicals and Laboratory Equipment",
            subcategories: {
                labEquipment: {
                    title: "Laboratory Equipment",
                    items: ["Beakers", "Test Tubes", "Microscopes"],
                },
                labAccessories: {
                    title: "Laboratory Accessories",
                    items: ["Safety Goggles", "Gloves"],
                },
                measuringTools: {
                    title: "Measuring and Calibration Tools",
                    items: ["Calipers", "Thermometers"],
                },
            },
        },
        defense: {
            title: "Defense and Security",
            subcategories: {
                securityTools: {
                    title: "Security and Enforcement Equipment",
                    items: ["Cameras", "Alarms"],
                },
                safetyTools: {
                    title: "Safety, Protection, and Monitoring Tools",
                    items: ["Fire Extinguishers", "Safety Helmets"],
                },
                firePrevention: {
                    title: "Fire Prevention Equipment",
                    items: ["Smoke Detectors", "Sprinklers"],
                },
            },
        },
        professional: {
            title: "Professional Services",
            subcategories: {
                cleaning: {
                    title: "Cleaning and Maintenance Services",
                    items: ["Office Cleaning", "Window Washing"],
                },
                wasteManagement: {
                    title: "Garbage Collection",
                    items: ["Trash Bags", "Dumpsters"],
                },
            },
        },
        tailoring: {
            title: "Tailoring Services",
            subcategories: {
                clothing: {
                    title: "Clothing and Accessories Tailoring",
                    items: ["Suits", "Dresses"],
                },
            },
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
