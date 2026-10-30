/*Donation form*/

document.addEventListener("DOMContentLoaded", function () {
    const donationForm = document.querySelector(".donation-form");


// Stop if this page does not contain the donation form.
   
if (!donationForm) return;

    const amountButtons = donationForm.querySelectorAll(".amount-btn");
    const customAmountInput =
        donationForm.querySelector('.amount-input input[type="number"]') ||
        donationForm.querySelector('input[type="number"]');


// Suggested donation amount.
   
    amountButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const amountText = button.textContent.replace(/[^\d.]/g, "");
            const amount = Number(amountText);

            if (!Number.isFinite(amount) || amount <= 0) return;

            amountButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active-amount");
                otherButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active-amount");
            button.setAttribute("aria-pressed", "true");

            if (customAmountInput) {
                customAmountInput.value = amount;
            }
        });
    });


// User types a different amount
   
    if (customAmountInput) {
        customAmountInput.addEventListener("input", function () {
            amountButtons.forEach(function (button) {
                const buttonAmount = Number(
                    button.textContent.replace(/[^\d.]/g, "")
                );

                const isSelected =
                    Number(customAmountInput.value) === buttonAmount &&
                    customAmountInput.value !== "";

                button.classList.toggle("active-amount", isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
            });
        });
    }


// Validate form when donate button is pressed.
   
    donationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!donationForm.checkValidity()) {
            donationForm.reportValidity();
            return;
        }

        const textInputs =
            donationForm.querySelectorAll('input[type="text"]');
        const emailInput =
            donationForm.querySelector('input[type="email"]');

        const amountInput =
            customAmountInput;

        const amount = amountInput ? Number(amountInput.value) : 0;

        if (!textInputs.length || !emailInput || !amountInput) {
            alert(
                "Please check that the donation form includes " +
                "your name, email and donation amount fields."
            );
            return;
        }

        const name = textInputs[0].value.trim();
        const email = emailInput.value.trim();

        if (!name) {
            alert("Please enter your name.");
            textInputs[0].focus();
            return;
        }

        if (!email || !emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Please choose or enter a valid donation amount.");
            amountInput.focus();
            return;
        }

        const paymentInput = donationForm.querySelector(
            '.payment-option input:checked, input[name="paymentMethod"]:checked'
        );

        if (!paymentInput) {
            alert("Please select a payment method.");
            return;
        }

        const paymentMethod =
            paymentInput.value || paymentInput.parentElement.textContent.trim();

        alert(
            "Thank you, " + name + "!\n\n" +
            "Your donation form has been validated.\n" +
            "Donation amount: R" + amount.toFixed(2) + "\n" +
            "Payment method: " + paymentMethod + "\n\n" +
            "This is a demonstration only. No payment has been processed."
        );

    });
});