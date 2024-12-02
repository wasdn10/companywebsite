document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById("categories-container");
    const subcategoriesContainer = document.getElementById("subcategories-container");
    const itemsContainer = document.getElementById("items-container");
    const backButton = document.getElementById("back-button");

    const servicesData = {
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

    // Render Cards Dynamically
    const renderCards = (container, data, type) => {
        container.innerHTML = "";
        if (type === "items") {
            data.forEach((item) => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<h3>${item}</h3>`;
                container.appendChild(card);
            });
        } else {
            Object.entries(data).forEach(([key, value]) => {
                const card = document.createElement("div");
                card.className = "card";
                card.dataset.key = key;
                card.innerHTML = `<h3>${value.title}</h3>`;
                card.addEventListener("click", () => handleCardClick(key, type));
                container.appendChild(card);
            });
        }
    };

    // Handle Card Click
    const handleCardClick = (key, type) => {
        if (type === "categories") {
            renderCards(
                subcategoriesContainer,
                servicesData[key].subcategories,
                "subcategories"
            );
            toggleVisibility(categoriesContainer, subcategoriesContainer);
        } else if (type === "subcategories") {
            const categoryKey = Object.keys(servicesData).find((key) =>
                servicesData[key].subcategories[key]
            );
            const items =
                servicesData[categoryKey].subcategories[key].items || [];
            renderCards(itemsContainer, items, "items");
            toggleVisibility(subcategoriesContainer, itemsContainer);
        }
    };

    // Toggle Visibility
    const toggleVisibility = (hide, show) => {
        hide.classList.add("hidden");
        show.classList.remove("hidden");
        backButton.classList.remove("hidden");
    };

    // Navigate Back
    const navigateBack = () => {
        if (!itemsContainer.classList.contains("hidden")) {
            toggleVisibility(itemsContainer, subcategoriesContainer);
        } else if (!subcategoriesContainer.classList.contains("hidden")) {
            toggleVisibility(subcategoriesContainer, categoriesContainer);
            backButton.classList.add("hidden");
        }
    };

    // Initialize
    renderCards(categoriesContainer, servicesData, "categories");
    backButton.addEventListener("click", navigateBack);
});
