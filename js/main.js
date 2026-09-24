/*
 * GOOGLE SHEETS SETUP
 * ------------------------------------------------------------
 * 1. Create your Google Sheet with these columns:
 *    Name | Email | Subject | Message | Date
 *
 * 2. Create a Google Apps Script Web App.
 *
 * 3. Paste your Web App /exec URL below.
 *
 * Example:
 * const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
 */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw-F9Kk1UNeQKej1m5p3RdqqDUV2P8-HynYwDIQiO7OiulRTa0HLTfPA920Vv8tC8GRBA/exec";

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const sendBtn = document.getElementById("sendBtn");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
      formMessage.textContent =
        "Google Sheet is not connected yet. Add your Apps Script Web App URL in js/main.js.";
      formMessage.style.color = "#dc3545";
      return;
    }

    const formData = new FormData(form);
    sendBtn.disabled = true;
    sendBtn.querySelector("span").textContent = "Sending...";
    formMessage.textContent = "";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset();
      formMessage.textContent =
        "Thank you! Your message has been sent successfully.";
      formMessage.style.color = "#457efa";
    } catch (error) {
      formMessage.textContent = "Something went wrong. Please try again.";
      formMessage.style.color = "#dc3545";
    } finally {
      sendBtn.disabled = false;
      sendBtn.querySelector("span").textContent = "Send Message";
    }
  });
}

const navToggle = document.getElementById("navToggle");
const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll(".nav-link");
const typedText = document.getElementById("typedText");
const topBtn = document.getElementById("topBtn");

if (navToggle)
  navToggle.addEventListener("click", () =>
    navbarMenu.classList.toggle("open"),
  );
navLinks.forEach((link) =>
  link.addEventListener("click", () => navbarMenu.classList.remove("open")),
);

const words = [
  "Full Stack Developer",
  "Laravel & PHP Developer",
  "Web Developer",
  "Full-Stack Applications",
];

let wordIndex = 0,
  charIndex = 0,
  deleting = false;

function typeEffect() {
  if (!typedText) return;
  const word = words[wordIndex];

  if (!deleting) {
    typedText.textContent = word.substring(0, charIndex++);
    if (charIndex > word.length) {
      deleting = true;
      setTimeout(typeEffect, 1300);
      return;
    }
  } else {
    typedText.textContent = word.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

window.addEventListener("scroll", () => {
  if (topBtn) topBtn.classList.toggle("show", window.scrollY > 400);

  let current = "";
  document.querySelectorAll("section[id]").forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current,
    );
  });
});

if (topBtn) {
  topBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// =====================================
// Skills Progress Bar Animation
// =====================================

const skillSection = document.getElementById("skill");
const skillBars = document.querySelectorAll(".progress i");

let skillsAnimated = false;

function animateSkills() {
  if (!skillSection || skillsAnimated) {
    return;
  }

  const sectionPosition = skillSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionPosition < screenHeight - 100) {
    skillsAnimated = true;

    skillBars.forEach((bar, index) => {
      const targetWidth = bar.getAttribute("data-width");

      setTimeout(() => {
        bar.style.width = targetWidth;
      }, index * 150);
    });
  }
}

// Page load
window.addEventListener("load", animateSkills);

// Scroll
window.addEventListener("scroll", animateSkills);
