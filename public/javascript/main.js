loadMenu = function(event){
    const menu = document.querySelector(".navbar-menu");
    menu.classList.add("is-active");
};

const burgerEL =document.querySelector(".navbar-burger");

if(burgerEL){
    burgerEL.addEventListener("click", loadMenu)
};