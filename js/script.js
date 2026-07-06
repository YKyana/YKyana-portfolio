const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

menuButton.addEventListener("click", () => {

    menu.classList.toggle("active");

});
