/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll("section");
const navbarMenu = document.getElementById("navbar__list");
let previousActiveSection;
let previousActiveLink;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createNavBar() {
  const navBar = document.createDocumentFragment();
  for (let i = 0; i < sections.length; i++) {
    const link = document.createElement("li");
    link.textContent = sections[i].getElementsByTagName("h2")[0].textContent;
    link.classList.add("menu__link");
    link.setAttribute("name", sections[i].id);
    navBar.appendChild(link);
  }
  navbarMenu.appendChild(navBar);
}

function goToSection(event) {
  const link = event.target;
  const section = document.getElementById(event.target.getAttribute("name"));
  // const previousActiveLink = document.querySelector(".active-class");
  // const previousActiveSection = document.querySelector(".active-link");
  previousActiveSection == null
    ? (previousActiveSection = section)
    : (previousActiveSection = previousActiveSection);
  previousActiveLink == null
    ? (previousActiveLink = link)
    : (previousActiveLink = previousActiveLink);
  previousActiveSection.classList.remove("active-class");
  previousActiveLink.classList.remove("active-link");
  section.scrollIntoView({ behavior: "smooth" });
  section.classList.add("active-class");
  link.classList.add("active-link");
  previousActiveSection = section;
  previousActiveLink = link;
}

function scrollControl() {
  const activeSection = document.querySelector(".active-class");
  const activeLink = document.querySelector(".active-link");
  if (activeSection == null) {
    let firstSection = document.querySelectorAll("section")[0];
    let firstLink = document.querySelectorAll("li.menu__link")[0];
    if (
      firstSection.getBoundingClientRect().y < 130 &&
      firstSection.getBoundingClientRect().y > -400
    ) {
      firstSection.classList.add("active-class");
      firstLink.classList.add("active-link");
    }
  } else {
    const topPosition = activeSection.getBoundingClientRect().y;
    const bottomPosition = topPosition + activeSection.clientHeight - 170;
    if (bottomPosition < 0) {
      let index =
        Array.from(document.querySelectorAll("section")).indexOf(
          activeSection
        ) + 1;
      document.querySelectorAll("section")[index].classList.add("active-class");
      document
        .querySelectorAll("li.menu__link")
        [index].classList.add("active-link");
      activeSection.classList.remove("active-class");
      activeLink.classList.remove("active-link");
    } else if (topPosition - activeSection.clientHeight > 0) {
      let index =
        Array.from(document.querySelectorAll("section")).indexOf(
          activeSection
        ) - 1;
      document.querySelectorAll("section")[index].classList.add("active-class");
      document
        .querySelectorAll("li.menu__link")
        [index].classList.add("active-link");
      activeSection.classList.remove("active-class");
      activeLink.classList.remove("active-link");
    }
  }
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
window.addEventListener("DOMContentLoaded", createNavBar);

// Add class 'active' to section when near top of viewport
// Scroll to section ID using scrollTO event
navbarMenu.addEventListener("click", goToSection);
window.addEventListener("scroll", scrollControl);

/**
 *  Add/Remove class 'active-class' from/to sections according to scrolling
    Add/Remove class 'active-link' from/to navBar links according to scrolling
 */

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
