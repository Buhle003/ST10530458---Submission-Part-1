function donateMessage() {
    alert(
        "Thank you for supporting KhulisaSocial Solutions!"
    );
}


<TouchableOpacity
  onPress={() => setMenuOpen(!menuOpen)}
>
  <Text style={styles.menuIcon}>☰</Text>
</TouchableOpacity>

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");


// Open and close menu
hamburger.addEventListener("click", function () {

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    hamburger.setAttribute("aria-expanded", isOpen);

});


// Close menu when a link is clicked
const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");

    });

});


// Close menu when clicking outside
document.addEventListener("click", function (event) {

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedHamburger = hamburger.contains(event.target);

    if (!clickedInsideMenu && !clickedHamburger) {

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");

    }

});


// Close menu when pressing Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");

    }

});