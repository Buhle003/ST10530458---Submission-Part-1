// Select donation amount buttons

const amountButtons = document.querySelectorAll(".amount-btn");
const amountInput = document.getElementById("amount");


// Set the selected donation amount

amountButtons.forEach(function(button) {

    button.addEventListener("click", function() {

// Remove active class from all buttons

        amountButtons.forEach(function(btn) {
            btn.classList.remove("active-amount");
        });


// Add active class to selected button

        button.classList.add("active-amount");


// Put selected amount into input

        amountInput.value = button.dataset.amount;
    });

});


// Process donation

function processDonation() {

    const amount = amountInput.value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();


// Check if fields are completed

    if (amount === "" || Number(amount) <= 0) {

        alert("Please enter a valid donation amount.");
        return;
    }


    if (name === "") {

        alert("Please enter your full name.");
        return;
    }


    if (email === "" || !email.includes("@")) {

        alert("Please enter a valid email address.");
        return;
    }


// Get selected payment method

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    ).value;


// Success message

    alert(
        "Thank you, " + name + "!\n\n" +
        "Your donation of R" + amount +
        " has been received.\n\n" +
        "Payment Method: " + payment
    );

}