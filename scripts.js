/******************
 * Menu Behaviour *============================================================
 ******************/

let sideBar = false; // track whether sidebar menu is open or closed
let canToggle = true; // block toggling while menu is currently closing
const menu = document.getElementById("nav-desktop");
const mobMenu = document.getElementById("nav-mobile");
const tinter = document.getElementById("tinter");

// open and close the sidebar on mobile
function toggleMenu() {
    const icon = document.getElementById("menu-icon");
    // if sidebar is closed, open it
    if (!sideBar) {
        if (canToggle === true) {
            menu.style.transitionDuration = "0.3s";
            // make tinter display but set its opacity to 0
            tinter.style.display = "block";
            tinter.style.opacity = 0;
            // fade tinter in underneath sidebar
            setTimeout(() => {
                tinter.style.opacity = 0.7;
            }, this.animationDelay + 20);
            // make sidebar display, and have it slide in from left
            menu.style.display = "flex";
            menu.style.left = "-300px";
            setTimeout(() => {
                menu.style.left = "0px";
            }, this.animationDelay + 20);

            sideBar = true;

            if (!icon.classList.contains("change"))
                icon.classList.toggle("change");
        }
    }
    // if sidebar is open, close it
    else {
        canToggle = false;
        closeMenu();
    }
}

// close the menu
function closeMenu() {
    if (sideBar) {
        setTimeout(() => {
            menu.style.left = "-300px";
        }, this.animationDelay + 20);
        setTimeout(() => {
            tinter.style.opacity = 0;
        }, this.animationDelay + 20);
        setTimeout(() => {
            menu.style.display = "none";
            tinter.style.display = "none";
            menu.style.left = "0px";
            canToggle = true;
        }, 500);
        sideBar = false;
        const icon = document.getElementById("menu-icon");
        if (icon.classList.contains("change"))
            icon.classList.toggle("change");
    }
}

// make sure screen resizes don't break sidebar functionality
const mediaQuery = '(max-width: 768px)';
const mediaQueryList = window.matchMedia(mediaQuery);
mediaQueryList.addEventListener('change', event => {
    // mobile display mode
    if (event.matches) {
        // hide nav menu if shown
        if (sideBar) {
            menu.style.display = "flex";
        } else {
            menu.style.transitionDuration = "0.3s";
            menu.style.display = "none";
            tinter.style.display = "none";
        }
    // desktop display mode
    } else {
        const icon = document.getElementById("menu-icon");
        if (icon.classList.contains("change"))
            icon.classList.toggle("change");
        menu.style.transitionDuration = "0s";
        menu.style.display = "flex";
        tinter.style.display = "none";
        sideBar = false;
    }
})