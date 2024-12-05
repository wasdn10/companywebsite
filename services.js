document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".service-card");
    const subcategoryPopup = document.getElementById("subcategory-popup");
    const subcategoryGrid = document.getElementById("subcategory-grid");
    const subcategoryTitle = document.getElementById("subcategory-title");
    const closeSubcategoryPopup = document.getElementById("close-subcategory-popup");

    const itemPopup = document.getElementById("item-popup");
    const itemGrid = document.getElementById("item-grid");
    const itemTitle = document.getElementById("item-title");
    const closeItemPopup = document.getElementById("close-item-popup");

    // Subcategories and Items Data
    const data = {
        furniture: {
            title: "Furniture and Office Equipment",
            subcategories: {
                "Laboratory Furniture": [
                    { name: "Lab Chair", images: ["lab-chair1.jpg", "lab-chair2.jpg", "lab-chair3.jpg", "lab-chair4.jpg", "lab-chair5.jpg"] },
                    { name: "Workbench", images: ["workbench1.jpg", "workbench2.jpg", "workbench3.jpg", "workbench4.jpg", "workbench5.jpg"] }
                ],
                "Wooden Furniture": [
                    { name: "Dining Table", images: ["dining1.jpg", "dining2.jpg", "dining3.jpg", "dining4.jpg", "dining5.jpg"] },
                    { name: "Bookshelf", images: ["bookshelf1.jpg", "bookshelf2.jpg", "bookshelf3.jpg", "bookshelf4.jpg", "bookshelf5.jpg"] }
                ]
            }
        },
        stationery: {
            title: "Office Supplies and Stationery",
            subcategories: {
                "General Stationery": [
                    { name: "Stapler", images: ["stapler1.jpg", "stapler2.jpg", "stapler3.jpg", "stapler4.jpg", "stapler5.jpg"] },
                    { name: "Puncher", images: ["puncher1.jpg", "puncher2.jpg", "puncher3.jpg", "puncher4.jpg", "puncher5.jpg"] }
                ],
                "Drafting Materials": [
                    { name: "Drafting Table", images: ["drafting1.jpg", "drafting2.jpg", "drafting3.jpg", "drafting4.jpg", "drafting5.jpg"] },
                    { name: "Drafting Compass", images: ["compass1.jpg", "compass2.jpg", "compass3.jpg", "compass4.jpg", "compass5.jpg"] }
                ]
            }
        },
        sports: {
            title: "Sports and Recreational Equipment",
            subcategories: {
                "Sportswear": [
                    { name: "Running Shoes", images: ["shoes1.jpg", "shoes2.jpg", "shoes3.jpg", "shoes4.jpg", "shoes5.jpg"] },
                    { name: "Tracksuit", images: ["tracksuit1.jpg", "tracksuit2.jpg", "tracksuit3.jpg", "tracksuit4.jpg", "tracksuit5.jpg"] }
                ]
            }
        },
        medical: {
            title: "Medical and Pharmaceutical Equipment",
            subcategories: {
                "Hospital Equipment and Medical Supplies": [
                    { name: "Hospital Beds", images: ["hospital-bed1.jpg", "hospital-bed2.jpg", "hospital-bed3.jpg", "hospital-bed4.jpg", "hospital-bed5.jpg"] },
                    { name: "Wheelchairs", images: ["wheelchair1.jpg", "wheelchair2.jpg", "wheelchair3.jpg", "wheelchair4.jpg", "wheelchair5.jpg"] },
                    { name: "Oxygen Tanks", images: ["oxygen1.jpg", "oxygen2.jpg", "oxygen3.jpg", "oxygen4.jpg", "oxygen5.jpg"] },
                ],
                "Hospital Equipment and Accessories": [
                    { name: "IV Stands", images: ["iv-stand1.jpg", "iv-stand2.jpg", "iv-stand3.jpg", "iv-stand4.jpg", "iv-stand5.jpg"] },
                    { name: "Medical Monitors", images: ["monitor1.jpg", "monitor2.jpg", "monitor3.jpg", "monitor4.jpg", "monitor5.jpg"] },
                    { name: "Surgical Lights", images: ["surgical-light1.jpg", "surgical-light2.jpg", "surgical-light3.jpg", "surgical-light4.jpg", "surgical-light5.jpg"] },
                ],
                "Medical Equipment and Supplies": [
                    { name: "Stethoscopes", images: ["stethoscope1.jpg", "stethoscope2.jpg", "stethoscope3.jpg", "stethoscope4.jpg", "stethoscope5.jpg"] },
                    { name: "Thermometers", images: ["thermometer1.jpg", "thermometer2.jpg", "thermometer3.jpg", "thermometer4.jpg", "thermometer5.jpg"] },
                    { name: "Blood Pressure Monitors", images: ["bp-monitor1.jpg", "bp-monitor2.jpg", "bp-monitor3.jpg", "bp-monitor4.jpg", "bp-monitor5.jpg"] },
                ],
                "Rehabilitation and Disability Equipment": [
                    { name: "Crutches", images: ["crutch1.jpg", "crutch2.jpg", "crutch3.jpg", "crutch4.jpg", "crutch5.jpg"] },
                    { name: "Walkers", images: ["walker1.jpg", "walker2.jpg", "walker3.jpg", "walker4.jpg", "walker5.jpg"] },
                    { name: "Hearing Aids", images: ["hearing-aid1.jpg", "hearing-aid2.jpg", "hearing-aid3.jpg", "hearing-aid4.jpg", "hearing-aid5.jpg"] },
                ],
            },
        },
        pharmaceuticals: {
            title: "Pharmaceuticals",
            subcategories: {
                "Non-Scheduled Medicines": [
                    { name: "Pain Relievers", images: ["pain-reliever1.jpg", "pain-reliever2.jpg", "pain-reliever3.jpg", "pain-reliever4.jpg", "pain-reliever5.jpg"] },
                    { name: "Cold Medications", images: ["cold-med1.jpg", "cold-med2.jpg", "cold-med3.jpg", "cold-med4.jpg", "cold-med5.jpg"] },
                    { name: "Vitamins", images: ["vitamin1.jpg", "vitamin2.jpg", "vitamin3.jpg", "vitamin4.jpg", "vitamin5.jpg"] },
                ],
            },
        },
        disposable: {
            title: "Medical Disposable and Reusable Equipment",
            subcategories: {
                "Disposable Medical Tools": [
                    { name: "Syringes", images: ["syringe1.jpg", "syringe2.jpg", "syringe3.jpg", "syringe4.jpg", "syringe5.jpg"] },
                    { name: "Disposable Gloves", images: ["glove1.jpg", "glove2.jpg", "glove3.jpg", "glove4.jpg", "glove5.jpg"] },
                    { name: "Face Masks", images: ["mask1.jpg", "mask2.jpg", "mask3.jpg", "mask4.jpg", "mask5.jpg"] },
                ],
                "Disposable Textiles for Staff/Patients": [
                    { name: "Surgical Gowns", images: ["surgical-gown1.jpg", "surgical-gown2.jpg", "surgical-gown3.jpg", "surgical-gown4.jpg", "surgical-gown5.jpg"] },
                    { name: "Patient Sheets", images: ["patient-sheet1.jpg", "patient-sheet2.jpg", "patient-sheet3.jpg", "patient-sheet4.jpg", "patient-sheet5.jpg"] },
                    { name: "Head Covers", images: ["head-cover1.jpg", "head-cover2.jpg", "head-cover3.jpg", "head-cover4.jpg", "head-cover5.jpg"] },
                ],
            },
        },
        chemicals: {
            title: "Chemicals and Laboratory Equipment",
            subcategories: {
                "Laboratory Equipment": [
                    { name: "Test Tubes", images: ["test-tube1.jpg", "test-tube2.jpg", "test-tube3.jpg", "test-tube4.jpg", "test-tube5.jpg"] },
                    { name: "Microscopes", images: ["microscope1.jpg", "microscope2.jpg", "microscope3.jpg", "microscope4.jpg", "microscope5.jpg"] },
                    { name: "Beakers", images: ["beaker1.jpg", "beaker2.jpg", "beaker3.jpg", "beaker4.jpg", "beaker5.jpg"] },
                ],
                "Laboratory Accessories": [
                    { name: "Sample Holders", images: ["sample-holder1.jpg", "sample-holder2.jpg", "sample-holder3.jpg", "sample-holder4.jpg", "sample-holder5.jpg"] },
                    { name: "Petri Dishes", images: ["petri-dish1.jpg", "petri-dish2.jpg", "petri-dish3.jpg", "petri-dish4.jpg", "petri-dish5.jpg"] },
                    { name: "Bunsen Burners", images: ["bunsen-burner1.jpg", "bunsen-burner2.jpg", "bunsen-burner3.jpg", "bunsen-burner4.jpg", "bunsen-burner5.jpg"] },
                ],
                "Measuring and Calibration Tools": [
                    { name: "Calipers", images: ["caliper1.jpg", "caliper2.jpg", "caliper3.jpg", "caliper4.jpg", "caliper5.jpg"] },
                    { name: "Thermometers", images: ["thermometer1.jpg", "thermometer2.jpg", "thermometer3.jpg", "thermometer4.jpg", "thermometer5.jpg"] },
                    { name: "Weight Scales", images: ["scale1.jpg", "scale2.jpg", "scale3.jpg", "scale4.jpg", "scale5.jpg"] },
                ],
            },
        },
        defense: {
            title: "Defense and Security",
            subcategories: {
                "Security and Enforcement Equipment": [
                    { name: "Security Cameras", images: ["camera1.jpg", "camera2.jpg", "camera3.jpg", "camera4.jpg", "camera5.jpg"] },
                    { name: "Metal Detectors", images: ["detector1.jpg", "detector2.jpg", "detector3.jpg", "detector4.jpg", "detector5.jpg"] },
                    { name: "Handcuffs", images: ["handcuff1.jpg", "handcuff2.jpg", "handcuff3.jpg", "handcuff4.jpg", "handcuff5.jpg"] },
                ],
                "Safety, Protection, and Monitoring Tools": [
                    { name: "Smoke Alarms", images: ["smoke-alarm1.jpg", "smoke-alarm2.jpg", "smoke-alarm3.jpg", "smoke-alarm4.jpg", "smoke-alarm5.jpg"] },
                    { name: "First Aid Kits", images: ["first-aid1.jpg", "first-aid2.jpg", "first-aid3.jpg", "first-aid4.jpg", "first-aid5.jpg"] },
                    { name: "Protective Helmets", images: ["helmet1.jpg", "helmet2.jpg", "helmet3.jpg", "helmet4.jpg", "helmet5.jpg"] },
                ],
                "Fire Prevention Equipment": [
                    { name: "Fire Extinguishers", images: ["extinguisher1.jpg", "extinguisher2.jpg", "extinguisher3.jpg", "extinguisher4.jpg", "extinguisher5.jpg"] },
                    { name: "Fire Blankets", images: ["fire-blanket1.jpg", "fire-blanket2.jpg", "fire-blanket3.jpg", "fire-blanket4.jpg", "fire-blanket5.jpg"] },
                    { name: "Sprinkler Systems", images: ["sprinkler1.jpg", "sprinkler2.jpg", "sprinkler3.jpg", "sprinkler4.jpg", "sprinkler5.jpg"] },
                ],
            },
        },
        repairs: {
            title: "Repairs and Maintenance",
            subcategories: {
                "Air Conditioning Systems": [
                    { name: "HVAC Repairs", images: ["hvac1.jpg", "hvac2.jpg", "hvac3.jpg", "hvac4.jpg", "hvac5.jpg"] },
                    { name: "Filter Replacements", images: ["filter1.jpg", "filter2.jpg", "filter3.jpg", "filter4.jpg", "filter5.jpg"] },
                    { name: "Thermostat Calibration", images: ["thermostat1.jpg", "thermostat2.jpg", "thermostat3.jpg", "thermostat4.jpg", "thermostat5.jpg"] },
                ],
                "Medical and Laboratory Equipment": [
                    { name: "Diagnostic Machine Repairs", images: ["diag-repair1.jpg", "diag-repair2.jpg", "diag-repair3.jpg", "diag-repair4.jpg", "diag-repair5.jpg"] },
                    { name: "Calibration Services", images: ["calib1.jpg", "calib2.jpg", "calib3.jpg", "calib4.jpg", "calib5.jpg"] },
                    { name: "Replacement Parts", images: ["replace1.jpg", "replace2.jpg", "replace3.jpg", "replace4.jpg", "replace5.jpg"] },
                ],
            },
        },
        beautification: {
            title: "Beautification Services",
            subcategories: {
                "Building Interior Design": [
                    { name: "Furniture Layouts", images: ["layout1.jpg", "layout2.jpg", "layout3.jpg", "layout4.jpg", "layout5.jpg"] },
                    { name: "Wall Art Installations", images: ["wall-art1.jpg", "wall-art2.jpg", "wall-art3.jpg", "wall-art4.jpg", "wall-art5.jpg"] },
                    { name: "Lighting Designs", images: ["lighting1.jpg", "lighting2.jpg", "lighting3.jpg", "lighting4.jpg", "lighting5.jpg"] },
                ],
                "Outdoor Landscaping": [
                    { name: "Garden Design", images: ["garden1.jpg", "garden2.jpg", "garden3.jpg", "garden4.jpg", "garden5.jpg"] },
                    { name: "Lawn Maintenance", images: ["lawn1.jpg", "lawn2.jpg", "lawn3.jpg", "lawn4.jpg", "lawn5.jpg"] },
                    { name: "Tree Planting", images: ["tree1.jpg", "tree2.jpg", "tree3.jpg", "tree4.jpg", "tree5.jpg"] },
                ],
            },
        },
        tailoring: {
            title: "Tailoring Services",
            subcategories: {
                "Clothing and Accessories Tailoring": [
                    { name: "Custom Suits", images: ["suit1.jpg", "suit2.jpg", "suit3.jpg", "suit4.jpg", "suit5.jpg"] },
                    { name: "Uniforms", images: ["uniform1.jpg", "uniform2.jpg", "uniform3.jpg", "uniform4.jpg", "uniform5.jpg"] },
                    { name: "Alteration Services", images: ["alteration1.jpg", "alteration2.jpg", "alteration3.jpg", "alteration4.jpg", "alteration5.jpg"] },
                ],
            },
        },
    };
});

    // Open Subcategory Popup
    serviceCards.forEach((card) => {
        card.addEventListener("click", () => {
            const category = card.getAttribute("data-category");
            const selectedCategory = data[category];
            if (!selectedCategory) {
                console.error("Category not found:", category);
                return;
            }

            subcategoryTitle.textContent = selectedCategory.title;
            subcategoryGrid.innerHTML = ""; // Clear previous content

            Object.keys(selectedCategory.subcategories).forEach((subcategory) => {
                const subcategoryCard = document.createElement("div");
                subcategoryCard.className = "subcategory-card";
                subcategoryCard.textContent = subcategory;

                // Add dynamic background image for each subcategory
                subcategoryCard.style.backgroundImage = `url('assets/images/${subcategory.toLowerCase().replace(/\s+/g, "-")}.jpg')`;

                subcategoryCard.addEventListener("click", () => {
                    openItemPopup(selectedCategory.subcategories[subcategory], subcategory);
                });

                subcategoryGrid.appendChild(subcategoryCard);
            });

            subcategoryPopup.classList.add("visible");
        });
    });

    // Close Subcategory Popup
    closeSubcategoryPopup.addEventListener("click", () => {
        subcategoryPopup.classList.remove("visible");
    });

    // Open Item Popup
    function openItemPopup(items, subcategoryName) {
        itemTitle.textContent = subcategoryName;
        itemGrid.innerHTML = ""; // Clear previous content

        items.forEach((item) => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";

            const itemImage = document.createElement("img");
            itemImage.src = `assets/images/${item.images[0]}`; // Use the first image
            itemImage.alt = item.name;

            const itemName = document.createElement("h5");
            itemName.textContent = item.name;

            itemCard.appendChild(itemImage);
            itemCard.appendChild(itemName);

            itemCard.addEventListener("click", () => {
                showItemDetails(item);
            });

            itemGrid.appendChild(itemCard);
        });

        itemPopup.classList.add("visible");
    }

    // Close Item Popup
    closeItemPopup.addEventListener("click", () => {
        itemPopup.classList.remove("visible");
    });

    // Show Item Details (Image Carousel)
    function showItemDetails(item) {
    itemGrid.innerHTML = `<h4>${item.name}</h4>`;
    item.images.forEach((image) => {
        const img = document.createElement("img");
        img.src = `assets/images/${image}`;
        img.alt = item.name;
        img.className = "carousel-image";
        itemGrid.appendChild(img); // Ensure this line is correct
    });
});
