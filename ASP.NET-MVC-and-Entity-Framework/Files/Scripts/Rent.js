

//-------------------------------------------------------
// Create.cshtml & Edit.cshtml Scripts
//-------------------------------------------------------


//If the checkbox is checked (Rental is damaged) show the "Damages Incurred" text.  If the checkbox is not checked (Rental not damaged), the label should have the text "Notes"
document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("rentalDamaged");
    const label = document.getElementById("damagesLabel");

    function updateLabel() {
        if (checkbox.checked) {
            label.textContent = "Damages Incurred";
        } else {
            label.textContent = "Notes";
        }
    }

    // Run once on page load
    updateLabel();

    // Run whenever checkbox changes
    checkbox.addEventListener("change", updateLabel);
});

//-------------------------------------------------------
// Index.cshtml 
//-------------------------------------------------------

//Three dot menu open when hover and also stay open when click
$(document).ready(function () {
    let isClicked = false;

    $('.threedot-btn').on('click', function (e) {
        e.stopPropagation(); // Prevent document click from immediately closing
        isClicked = true;

        let $dropdown = $(this).parent('.dropdown');
        $('.dropdown').not($dropdown).removeClass('show').find('.dropdown-menu').removeClass('show'); // close others

        $dropdown.toggleClass('show');
        $dropdown.find('.dropdown-menu').toggleClass('show');
    });

    $('.threedot-btn').parent('.dropdown').hover(
        function () {
            if (!isClicked) {
                $(this).addClass('show');
                $(this).find('.dropdown-menu').addClass('show');
            }
        },
        function () {
            if (!isClicked) {
                $(this).removeClass('show');
                $(this).find('.dropdown-menu').removeClass('show');
            }
        }
    );

    // Close when clicking anywhere else
    $(document).on('click', function () {
        if (isClicked) {
            $('.dropdown').removeClass('show');
            $('.dropdown-menu').removeClass('show');
            isClicked = false;
        }
    });
});



// Sorted by

document.addEventListener("DOMContentLoaded", function () {
    const sortSelect = document.getElementById("sortSelect");
    const tbody = document.querySelector(".index-table tbody");

    // Convert NodeList to array
    function getRowsArray() {
        return Array.from(tbody.querySelectorAll("tr"));
    }

    // Sort rows
    function sortRows(criteria) {
        const rows = getRowsArray();

        rows.sort((a, b) => {
            const rentalA = a.querySelector(".rental-badge").textContent.trim().toLowerCase();
            const rentalB = b.querySelector(".rental-badge").textContent.trim().toLowerCase();

            const damagedA = a.querySelector(".bi-x-circle-fill") !== null;
            const damagedB = b.querySelector(".bi-x-circle-fill") !== null;

            switch (criteria) {
                case "damaged":
                    return (damagedB - damagedA); // Damaged first
                case "undamaged":
                    return (damagedA - damagedB); // Undamaged first
                case "az":
                    return rentalA.localeCompare(rentalB);
                case "za":
                    return rentalB.localeCompare(rentalA);
                default:
                    return 0; // no sorting
            }
        });

        // Append sorted rows back to tbody
        rows.forEach(row => tbody.appendChild(row));
    }

    // Listen for dropdown changes
    sortSelect.addEventListener("change", function () {
        sortRows(this.value);
    });
});