/* Newsletter subscription*/

function subscribeNewsletter() {
    const emailInput = document.getElementById("newsletterEmail");

    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (!email) {
        alert("Please enter your email address.");
        emailInput.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    alert("Thank you for subscribing to Khulisa Social Solutions!");
    emailInput.value = "";
}


// FAQ questions

function toggleFAQ(button) {
    if (!button) return;

    const answer = button.nextElementSibling;
    const icon = button.querySelector("i");

    if (!answer) return;

    const isOpen = answer.style.display === "block";

    answer.style.display = isOpen ? "none" : "block";
    button.setAttribute("aria-expanded", String(!isOpen));

    if (icon) {
        icon.classList.toggle("fa-plus", isOpen);
        icon.classList.toggle("fa-minus", !isOpen);
    }
}


// Contact form

function submitContactForm(event) {
    if (event) event.preventDefault();

    const form = document.getElementById("contactForm");

    if (!form) return;

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    alert(
        "Thank you for contacting Khulisa Social Solutions."
    );

    form.reset();
}


// Contact form error handling

function submitContactForm(event) {

    event.preventDefault();

    const form = document.getElementById("contactForm");


// Get all form fields

    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const consent = document.getElementById("consent");


// Remove previous error messages
    
    form.querySelectorAll(".error-message").forEach(function(error) {
        error.remove();
    });


// Remove previous error styling
    form.querySelectorAll(".input-error").forEach(function(field) {
        field.classList.remove("input-error");
    });

    let hasErrors = false;


// Function to display an error

    function showError(field, errorText) {

        const error = document.createElement("small");

        error.className = "error-message";
        error.textContent = errorText;

        field.classList.add("input-error");


// Display error underneath the field

        field.insertAdjacentElement("afterend", error);

        hasErrors = true;
    }


// Name validation

    if (name.value.trim() === "") {
        showError(name, "Please enter your name.");
    } else if (!/^[A-Za-z\s'-]+$/.test(name.value.trim())) {
        showError(name, "Please enter a valid name using letters only.");
    }


// Surname validation
    
    if (surname.value.trim() === "") {
        showError(surname, "Please enter your surname.");
    } else if (!/^[A-Za-z\s'-]+$/.test(surname.value.trim())) {
        showError(surname, "Please enter a valid surname using letters only.");
    }


// Email validation
    
    if (email.value.trim() === "") {
        showError(email, "Please enter your email address.");
    } else if (!email.validity.valid) {
        showError(email, "Please enter a valid email address.");
    }


// Phone validation (optional field)

    if (phone.value.trim() !== "" &&
        !/^[0-9+\s()-]{7,20}$/.test(phone.value.trim())) {
        showError(phone, "Please enter a valid phone number.");
    }


// Subject validation

    if (subject.value === "") {
        showError(subject, "Please select an enquiry subject.");
    }


// Message validation

    if (message.value.trim() === "") {
        showError(message, "Please enter your message.");
    } else if (message.value.trim().length < 10) {
        showError(message, "Your message must contain at least 10 characters.");
    }


// Consent validation

    if (!consent.checked) {
        showError(consent, "Please agree to the use of your information.");
    }


// Stop submission if errors exist

    if (hasErrors) {

        const firstError = form.querySelector(".input-error");

        if (firstError) {
            firstError.focus();
        }

        return;
    }

// Success message

    alert(
        "Thank you for contacting Khulisa Social Solutions!\n\n" +
        "Your form has been successfully validated."
    );

// Clear the form

    form.reset();

}


// Join mission button

function joinMission() {
    window.location.href = "contact.html";
}


/* Website search */

const websitePages = [
    {
        title: "Home",
        url: "index.html",
        description: "Welcome to Khulisa Social Solutions.",
        keywords: "home community positive change"
    },

    {
        title: "About Us",
        url: "about.html",
        description: "Learn about our mission, vision and values.",
        keywords: "about mission vision organisation"
    },

    {
        title: "Programmes",
        url: "programmes.html",
        description: "Explore our programmes and services.",
        keywords: "programmes children education caregivers development"
    },

    {
        title: "Our Impact",
        url: "impact.html",
        description: "Discover our community impact and initiatives.",
        keywords: "impact reports achievements community"
    },

    {
        title: "Donate",
        url: "donate.html",
        description: "Learn how to support our work.",
        keywords: "donate donations support fundraising"
    },

    {
        title: "Contact",
        url: "contact.html",
        description: "Contact us about programmes and partnerships.",
        keywords: "contact email enquiries partnerships"
    }
];

const siteSearchForm = document.getElementById("siteSearchForm");

if (siteSearchForm) {
    siteSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const input = document.getElementById("siteSearchInput");
        const resultsContainer =
            document.getElementById("siteSearchResults");

        if (!input || !resultsContainer) return;

        const searchTerm = input.value.trim().toLowerCase();

        resultsContainer.replaceChildren();

        if (!searchTerm) {
            resultsContainer.textContent =
                "Please enter something to search for.";
            return;
        }

        const results = websitePages.filter(function (page) {
            const searchableText =
                `${page.title} ${page.description} ${page.keywords}`
                    .toLowerCase();

            return searchableText.includes(searchTerm);
        });

        const heading = document.createElement("h3");
        heading.textContent = `Search results for "${searchTerm}"`;
        resultsContainer.appendChild(heading);

        if (results.length === 0) {
            const message = document.createElement("p");
            message.textContent =
                "No matching pages found. Try another search term.";
            resultsContainer.appendChild(message);
            return;
        }

        results.forEach(function (page) {
            const result = document.createElement("div");
            result.className = "search-result";

            const link = document.createElement("a");
            link.href = page.url;
            link.textContent = page.title;

            const description = document.createElement("p");
            description.textContent = page.description;

            result.appendChild(link);
            result.appendChild(description);
            resultsContainer.appendChild(result);
        });
    });
}


// Enquiry validation

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiryForm");
    const feedback = document.getElementById("enquiryFeedback");

    if (!form || !feedback) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        feedback.textContent = "";
        feedback.className = "";


// Remove previous errors

        form.querySelectorAll(".field-error").forEach(function (error) {
            error.remove();
        });

        form.querySelectorAll(".input-error").forEach(function (field) {
            field.classList.remove("input-error");
        });

        let hasErrors = false;

        function showError(field, message) {

            const error = document.createElement("small");

            error.className = "field-error";
            error.style.color = "#c62828";
            error.style.display = "block";
            error.style.marginTop = "5px";
            error.textContent = message;

            field.classList.add("input-error");
            field.insertAdjacentElement("afterend", error);

            hasErrors = true;
        }

        const firstName = document.getElementById("enquiryName");
        const surname = document.getElementById("enquirySurname");
        const email = document.getElementById("enquiryEmail");
        const phone = document.getElementById("enquiryPhone");
        const type = document.getElementById("enquiryType");
        const message = document.getElementById("enquiryMessage");
        const consent = document.getElementById("enquiryConsent");


        // First name

        if (!firstName.value.trim()) {
            showError(firstName, "Please enter your first name.");
        }


        // Surname

        if (!surname.value.trim()) {
            showError(surname, "Please enter your surname.");
        }


        // Email

        if (!email.value.trim()) {
            showError(email, "Please enter your email address.");
        } else if (!email.validity.valid) {
            showError(email, "Please enter a valid email address.");
        }


        // Optional phone number

        if (phone.value.trim() &&
            !/^[0-9+\s()-]{7,20}$/.test(phone.value.trim())) {
            showError(phone, "Please enter a valid phone number.");
        }


        // Enquiry type

        if (!type.value) {
            showError(type, "Please select an enquiry type.");
        }


        // Message

        if (!message.value.trim()) {
            showError(message, "Please enter your enquiry message.");
        } else if (message.value.trim().length < 10) {
            showError(message, "Your message must contain at least 10 characters.");
        }


        // Consent

        if (!consent.checked) {
            showError(consent, "Please agree before submitting.");
        }

        if (hasErrors) {
            feedback.textContent =
                "Please correct the highlighted fields and try again.";
            feedback.className = "error";

            const firstInvalid = form.querySelector(".input-error");
            if (firstInvalid) firstInvalid.focus();

            return;
        }

        feedback.textContent =
            "Thank you! Your enquiry has been noted.";

        feedback.className = "success";

        form.reset();

    });

});


// Gallery lightbox

document.addEventListener("DOMContentLoaded", function () {

    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const previousButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");

    let currentIndex = 0;

    if (!lightbox || !lightboxImage || !galleryImages.length === 0) return;

    function showImage(index) {
        currentIndex = (index + galleryImages.length) % galleryImages.length;

        lightboxImage.src = galleryImages[currentIndex].src;
        lightboxImage.alt = galleryImages[currentIndex].alt;

        lightbox.classList.add("active");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightboxImage.src = "";
    }

    galleryImages.forEach(function (image, index) {
        image.addEventListener("click", function () {
            showImage(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    previousButton.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    
// Close when clicking outside the image

lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });


// Keyboard controls

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }
    });

});