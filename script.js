// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Dynamic Greeting
    const updateGreeting = () => {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
        document.getElementById('dynamic-greeting').textContent = greeting;
    };
    updateGreeting();

    // Projects Filter
    const filterProjects = (category) => {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(project => {
            project.style.display = category === 'all' || project.dataset.category === category ? 'block' : 'none';
        });
    };

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });

    // Form Validation
    const validateForm = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation logic here
        return isValid;
    };

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit form
        }
    });

    // Load Projects from JSON
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const grid = document.querySelector('.projects-grid');
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.dataset.category = project.category;
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="category">${project.category}</span>
                `;
                grid.appendChild(card);
            });
        });

    // Scroll Spy
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop - 100) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
