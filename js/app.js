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

// Global Variables

const sections = document.querySelectorAll("section");
const navbarMenu = document.getElementById("navbar__list");
let previousActiveSection;
let previousActiveLink;
let scrolled = true;

// End Global Variables

// Begin Main Functions

//  Creates the navBar list using anchor elements
function createNavBar() {
  const navBar = document.createDocumentFragment();
  for (let i = 0; i < sections.length; i++) {
    const link = document.createElement("a");
    link.textContent = sections[i].getElementsByTagName("h2")[0].textContent;
    link.classList.add("menu__link");
    link.href = `#${sections[i].id}`;
    navBar.appendChild(link);
  }
  navbarMenu.appendChild(navBar);
}

// Scrolls to the section corresponding to the clicked link in the navBar
function goToSection(event) {
  const link = event.target;
  event.preventDefault();
  const section = document.getElementById(event.target.href.slice(-8));
  section.scrollIntoView({
    behavior: "smooth"
  });
  toggleActivation(section, link);
}

// Deactivates the current section and link and activates the next ones
function toggleActivation(section, link) {
  if (previousActiveSection == null) {
    previousActiveSection = section;
  }
  if (previousActiveLink == null) {
    previousActiveLink = link;
  }
  previousActiveSection.classList.remove("active-class"); //Sets the previous section inactive
  previousActiveLink.classList.remove("active-link"); //Sets the previous link inactive
  section.classList.add("active-class"); //Sets the current section active
  link.classList.add("active-link"); //Sets the current link active
  previousActiveSection = section;
  previousActiveLink = link;
}

// Add/Remove class 'active-class' from/to sections according to scrolling
// Add/Remove class 'active-link' from/to navBar links according to scrolling
function scrollControl() {
  const activeSection = document.querySelector(".active-class");
  const activeLink = document.querySelector("a.active-link");
  // Select the first section in the page if no link is active
  if (activeSection == null) {
    let firstSection = document.querySelectorAll("section")[0];
    let firstLink = document.querySelectorAll("menu__link")[0];
    // Activate the section and the link if the section reaches a certain Y position
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
    let index = Array.from(document.querySelectorAll("section")).indexOf(activeSection);
    // When scrolling down, if the section reaches a certain Y position, Deactivates the section and its link and activates the next ones below
    if (bottomPosition < 0) {
      document.querySelectorAll("section")[index + 1].classList.add("active-class");
      document.querySelectorAll("a.menu__link")[index + 1].classList.add("active-link");
      activeSection.classList.remove("active-class");
      activeLink.classList.remove("active-link");
      // When scrolling up, if the section reaches a certain Y position, Deactivates the section and its link and activates the next ones above
    } else if (topPosition - activeSection.clientHeight > -20) {
      document.querySelectorAll("section")[index - 1].classList.add("active-class");
      document.querySelectorAll("a.menu__link")[index - 1].classList.add("active-link");
      activeSection.classList.remove("active-class");
      activeLink.classList.remove("active-link");
    }
  }
}

// Hide the navBar
function hideNavbar() {
  if (scrolled == true) {
    scrolled = false;
  } else {
    let navBar = document.querySelector(".page__header");
    navBar.classList.add("hiddenNav");
  }
}

// Make the navBar visible when moving the mouse near the top of the screen
function showNavBarWhenMouseMove(event) {
  if (event.clientY < 300) {
    scrolled = true;
    let navBar = document.querySelector(".page__header");
    navBar.classList.remove("hiddenNav");
  }
}

// Make the navBar visible again when scrolling
function showNavBarWhenScrolling() {
  scrolled = true;
  let navBar = document.querySelector(".page__header");
  navBar.classList.remove("hiddenNav");
}

// End Main Functions
// Begin Events

//Creates the navBar dynamically according to the number of sections and thier h2 elements text content
window.addEventListener("DOMContentLoaded", createNavBar);
// Scroll to section on link click
navbarMenu.addEventListener("click", goToSection);
// Sets links and sections active/inactive according to thier position in the viewport
window.addEventListener("scroll", scrollControl);
// Show the navBar when scrolling
window.addEventListener("scroll", showNavBarWhenScrolling);
// show the navBar when moving the mouse cursor near the top of the viewport
window.addEventListener("mousemove", showNavBarWhenMouseMove);
setInterval(hideNavbar, 2000);

// End Events