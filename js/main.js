
// ============================
// DOM READY
// ============================
document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // BURGER MENU
  // ============================
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // ============================
  // SMOOTH SCROLL
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ============================
  // SKILL CIRCLE ANIMATION
  // ============================
  const animateSkills = (scope) => {
    if (!scope) return;

    scope.querySelectorAll(".skill-item").forEach(item => {
      const circle = item.querySelector(".circle-progress");
      const percentEl = item.querySelector(".skill-percentage");
      if (!circle || !percentEl) return;

      const percent = parseInt(percentEl.textContent, 10);
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.transition = "none";
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;

      requestAnimationFrame(() => {
        circle.style.transition = "stroke-dashoffset 1.4s ease";
        circle.style.strokeDashoffset =
          circumference - (percent / 100) * circumference;
      });
    });
  };

  // ============================
  // SKILLS ANIMATE ON SCROLL (ONCE)
  // ============================
  const skillsSection = document.querySelector("#skills");
  let skillsAnimated = false;

  const checkSkillsInView = () => {
    if (!skillsSection || skillsAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      const activeCategory = document.querySelector(".skill-category.active");
      animateSkills(activeCategory);
      skillsAnimated = true;
    }
  };

  window.addEventListener("scroll", checkSkillsInView);
  checkSkillsInView();

  // ============================
  // SKILL TABS (SINGLE SOURCE OF TRUTH 🔥)
  // ============================
  const tabs = document.querySelectorAll(".skills-tabs input");
  const categories = document.querySelectorAll(".skill-category");

  tabs.forEach(tab => {
    tab.addEventListener("change", () => {
      const target = tab.id.replace("tab-", "");

      categories.forEach(cat => {
        cat.classList.toggle("active", cat.dataset.skill === target);
      });

      animateSkills(
        document.querySelector(`.skill-category[data-skill="${target}"]`)
      );
    });
  });

  // ============================
  // SHOW FRONTEND BY DEFAULT
  // ============================
  const defaultTab = document.getElementById("tab-frontend");
  if (defaultTab) defaultTab.checked = true;

  const defaultCategory = document.querySelector('.skill-category[data-skill="frontend"]');
  if (defaultCategory) defaultCategory.classList.add("active");

  // ============================
  // ROTATING SKILLS TEXT
  // ============================
  const rotatingText = document.getElementById("rotating-text");
  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Node.js",
    "MongoDB",
    "ASP.NET",
    "Bootstrap"
  ];

  if (rotatingText) {
    let i = 0;
    setInterval(() => {
      rotatingText.style.opacity = "0";
      setTimeout(() => {
        i = (i + 1) % skills.length;
        rotatingText.textContent = skills[i];
        rotatingText.style.opacity = "1";
      }, 300);
    }, 2000);
  }

  // ============================
  // SCROLL TO TOP
  // ============================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ============================
  // CONTACT FORM
  // ============================
  const form = document.querySelector(".contact-form form");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you! I’ll contact you soon 💜");
      form.reset();
    });
  }

  // ============================
  // NAV ACTIVE ON SCROLL
  // ============================
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const updateNav = () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 200;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", updateNav);
  updateNav();

});