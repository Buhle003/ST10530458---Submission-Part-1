/* Donation form functionality */

document.addEventListener("DOMContentLoaded", function () {

    const donationForm = document.querySelector("#donationForm");
    const donationButton = document.getElementById("donateButton");
    const formMessage = document.getElementById("formMessage");

    if (!donationForm) return;

    const amountButtons = donationForm.querySelectorAll(".amount-btn");
    const amountInput = document.getElementById("amount");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const errorBox = document.getElementById("donationErrors");
    const successBox = document.getElementById("donationSuccess");

     donationForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // Check that all required fields are valid
        
        if (!donationForm.checkValidity()) {
            donationForm.reportValidity();
            return;
        }


        // Prevent repeated submissions
        
        donateButton.disabled = true;
        donateButton.textContent = "Submitting...";

        formMessage.textContent = "";


        // Collect form information
        
        const formData = new FormData(donationForm);

        try {

         
        // Send information asynchronously
        
        const response = await fetch("YOUR_FORM_ENDPOINT", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }


        // Display success message
            
            formMessage.textContent =
                "Thank you! Your donation information was submitted successfully.";

            formMessage.style.color = "#2e8b57";

            // Clear the form
            donationForm.reset();

        } catch (error) {


        // Display error message
            
            formMessage.textContent =
                "Sorry, something went wrong. Please try again.";

            formMessage.style.color = "red";

        } finally {


        // Enable button again
            
            donateButton.disabled = false;
            donateButton.textContent = "Donate Now";

        }

    });


 // Suggested donation amounts

    amountButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const amount = Number(button.dataset.amount);

            if (!Number.isFinite(amount) || amount <= 0) return;

            amountInput.value = amount;

            amountButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active-amount");
                otherButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active-amount");
            button.setAttribute("aria-pressed", "true");

            clearMessages();
        });

    });


 // Custom donation amount

    amountInput.addEventListener("input", function () {

        amountButtons.forEach(function (button) {

            const selected =
                Number(button.dataset.amount) === Number(amountInput.value) &&
                amountInput.value !== "";

            button.classList.toggle("active-amount", selected);
            button.setAttribute("aria-pressed", String(selected));

        });

        clearMessages();
    });


 // Clear old messages

    function clearMessages() {
        errorBox.textContent = "";
        successBox.textContent = "";
    }


// Validate donation form

    donationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearMessages();

        const errors = [];

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const amount = Number(amountInput.value);

        const payment = donationForm.querySelector(
            'input[name="payment"]:checked'
        );


// Name validation

        if (name.length < 2) {
            errors.push("Please enter your full name.");
        }


// Email validation

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            errors.push("Please enter a valid email address.");
        }


// Donation amount validation

        if (
            amountInput.value.trim() === "" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            errors.push("Please enter a donation amount greater than R0.");
        }


// Payment method validation

        if (!payment) {
            errors.push("Please select a payment method.");
        }


// Display errors

        if (errors.length > 0) {

            errorBox.innerHTML = errors
                .map(function (error) {
                    return "<p>• " + error + "</p>";
                })
                .join("");

            if (name.length < 2) {
                nameInput.focus();
            } else if (!emailPattern.test(email)) {
                emailInput.focus();
            } else if (amount <= 0 || amountInput.value.trim() === "") {
                amountInput.focus();
            }

            return;
        }


// Display success message

        successBox.textContent =
            "Thank you, " + name + "! Your donation form has passed validation. " +
            "Donation amount: R" + amount.toFixed(2) +
            ". Payment method: " + payment.value +
            ". This is a demonstration only; no payment has been processed.";

        donationForm.reset();

        amountButtons.forEach(function (button) {
            button.classList.remove("active-amount");
            button.setAttribute("aria-pressed", "false");
        });

    });

});