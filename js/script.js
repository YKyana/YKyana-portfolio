"use strict";


/* =================================
   PAGE ELEMENTS
================================= */

const menuButton = document.querySelector(".menu-button");
const mobileNavigation = document.querySelector(".mobile-nav");
const mobileNavigationLinks = document.querySelectorAll(".mobile-nav a");
const revealElements = document.querySelectorAll(".reveal");


/* =================================
   MOBILE MENU
================================= */

/**
 * Opens the mobile navigation menu.
 */
function openMenu() {
  if (!menuButton || !mobileNavigation) {
    return;
  }

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close menu");

  mobileNavigation.classList.add("open");
  document.body.classList.add("menu-open");
}


/**
 * Closes the mobile navigation menu.
 */
function closeMenu() {
  if (!menuButton || !mobileNavigation) {
    return;
  }

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");

  mobileNavigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}


/**
 * Switches between the open and closed menu states.
 */
function toggleMenu() {
  if (!menuButton) {
    return;
  }

  const menuIsOpen =
    menuButton.getAttribute("aria-expanded") === "true";

  if (menuIsOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}


/* Open or close the menu after clicking the menu button. */
if (menuButton && mobileNavigation) {
  menuButton.addEventListener("click", toggleMenu);
}


/* Close the menu after selecting a navigation link. */
mobileNavigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});


/* Close the menu when Escape is pressed. */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


/* Close the menu when switching to desktop size. */
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});


/* =================================
   SMOOTH ANCHOR NAVIGATION
================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.history.replaceState(null, "", targetId);
  });
});


/* =================================
   SCROLL REVEAL ANIMATION
================================= */

/**
 * Immediately displays all reveal elements.
 * This is also used as a fallback for older browsers.
 */
function showAllRevealElements() {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/**
 * Check whether the user has disabled animations
 * in their operating system settings.
 */
const reducedMotionEnabled = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/**
 * Use reveal animations only when:
 * 1. the browser supports IntersectionObserver;
 * 2. the user has not disabled animations.
 */
if (
  "IntersectionObserver" in window &&
  !reducedMotionEnabled
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  showAllRevealElements();
}


/* =================================
   EMAIL LINK
================================= */

const emailLink = document.querySelector(".email-link");

if (emailLink) {
  emailLink.addEventListener("click", () => {
    emailLink.classList.add("email-clicked");

    window.setTimeout(() => {
      emailLink.classList.remove("email-clicked");
    }, 500);
  });
}


/* =================================
   EXTERNAL LINKS
================================= */

const externalLinks = document.querySelectorAll(
  'a[target="_blank"]'
);

externalLinks.forEach((link) => {
  /*
   * Protect the original page when opening an
   * external website in a new browser tab.
   */
  link.setAttribute("rel", "noopener noreferrer");
});


/* =================================
   INITIAL PAGE STATE
================================= */

/*
 * Make sure the menu is closed when returning
 * to the page using the browser Back button.
 */
window.addEventListener("pageshow", () => {
  closeMenu();
});
