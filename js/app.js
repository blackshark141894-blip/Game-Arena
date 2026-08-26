const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

});


document.querySelectorAll(".tier-card button").forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Tournament system will be connected in the next development step."
        );

    });

});