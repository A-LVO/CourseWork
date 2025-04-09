document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
      Dynamic Greeting Based on Time
  ----------------------------- */
  const greetingElement = document.getElementById('greeting');
  const now = new Date();
  const hour = now.getHours();
  let greetingText = "Hello!";

  if (hour < 12) {
    greetingText = "Good morning!";
  } else if (hour < 18) {
    greetingText = "Good afternoon!";
  } else {
    greetingText = "Good evening!";
  }
  greetingElement.textContent = greetingText;

  /* -----------------------------
      Smooth Scrolling & ScrollSpy
  ----------------------------- */
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth"
      });
    });
  });

  window.addEventListener("scroll", () => {
    let fromTop = window.scrollY + 70;
    navLinks.forEach(link => {
      let section = document.querySelector(link.getAttribute("href"));
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  /* -----------------------------
      Theme Toggle and localStorage
  ----------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.body.classList.toggle("dark", currentTheme === "dark");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });

  /* -----------------------------
      Blog Manager - Dynamic Blog Loading
  ----------------------------- */
  const blogData = [
    {
      title: "Understanding Modern Web Development",
      date: "2025-03-01",
      content: "A dive into the evolution of web technologies and best practices for building modern applications."
    },
    {
      title: "Interactive JavaScript Features",
      date: "2025-02-15",
      content: "Exploring various ways to enhance web pages with dynamic JavaScript functionalities."
    },
    {
      title: "Responsive Design Techniques",
      date: "2025-01-20",
      content: "Tips and tricks on making websites work seamlessly on any device."
    }
  ];

  const blogContainer = document.getElementById("blog-container");
  blogData.forEach(post => {
    const article = document.createElement("article");
    article.classList.add("blog-post");
    article.innerHTML = `<h3>${post.title}</h3>
                         <small>${post.date}</small>
                         <p>${post.content}</p>`;
    blogContainer.appendChild(article);
  });

  /* -----------------------------
      Portfolio Filter
  ----------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      projectItems.forEach(item => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* -----------------------------
      Modal Popup for Project Details
  ----------------------------- */
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalClose = document.getElementById("modal-close");

  const detailButtons = document.querySelectorAll(".project-details");
  detailButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      const desc = btn.getAttribute("data-desc");
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.style.display = "block";
    });
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  /* -----------------------------
      Contact Form Validation
  ----------------------------- */
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Simple form validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert("Please complete all fields.");
      return;
    }

    // Validate email format (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Enter a valid email address.");
      return;
    }

    alert("Thank you for reaching out!");
    form.reset();
  });
});
