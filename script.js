// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const dynamicGreeting = document.getElementById('dynamic-greeting');
const contactForm = document.getElementById('contact-form');
const projectsContainer = document.getElementById('projects-container');
const blogContainer = document.getElementById('blog-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const blogSearch = document.getElementById('blog-search');
const navLinks = document.querySelectorAll('nav a');

// Data
let projects = [];
let blogPosts = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load theme preference
    loadTheme();
    
    // Set dynamic greeting
    setGreeting();
    
    // Load projects and blog posts
    loadProjects();
    loadBlogPosts();
    
    // Set up form validation
    setupFormValidation();
    
    // Set up scroll spy for navigation
    setupScrollSpy();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Advanced functionality: Modal for project details
    setupProjectModals();
    
    // Advanced functionality: Skills progress bars
    setupSkillsProgress();
});

// Theme toggle functionality
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Dynamic greeting based on time of day
function setGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Good Morning!';
    } else if (hour < 18) {
        greeting = 'Good Afternoon!';
    } else {
        greeting = 'Good Evening!';
    }
    
    dynamicGreeting.textContent = greeting;
}

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('assets/projects.json');
        projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Display projects with filtering
function displayProjects(projectsToDisplay) {
    projectsContainer.innerHTML = '';
    
    projectsToDisplay.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        projectCard.innerHTML = `
            <img src="assets/images/${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="category-tag">${project.category}</span>
            <button class="view-details" data-id="${project.id}">View Details</button>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Filter projects by category
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        if (filter === 'all') {
            displayProjects(projects);
        } else {
            const filteredProjects = projects.filter(project => project.category === filter);
            displayProjects(filteredProjects);
        }
    });
});

// Load blog posts from JSON
async function loadBlogPosts() {
    try {
        const response = await fetch('assets/blog.json');
        blogPosts = await response.json();
        displayBlogPosts(blogPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Display blog posts with search functionality
function displayBlogPosts(postsToDisplay) {
    blogContainer.innerHTML = '';
    
    postsToDisplay.forEach(post => {
        const blogPost = document.createElement('article');
        blogPost.className = 'blog-post';
        blogPost.innerHTML = `
            <h3>${post.title}</h3>
            <p class="post-date">${post.date}</p>
            <p>${post.excerpt}</p>
            <a href="#" class="read-more">Read More</a>
        `;
        blogContainer.appendChild(blogPost);
    });
}

// Blog search functionality
blogSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm)
    );
    displayBlogPosts(filteredPosts);
});

// Form validation
function setupFormValidation() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            clearError(name);
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            clearError(message);
        }
        
        if (isValid) {
            // Form is valid, submit it
            alert('Form submitted successfully!');
            this.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    formGroup.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    formGroup.classList.remove('error');
}

// Scroll spy for navigation
function setupScrollSpy() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// Advanced Functionality 1: Project Modals
function setupProjectModals() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details')) {
            e.preventDefault();
            const projectId = e.target.dataset.id;
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>${project.title}</h2>
                        <img src="assets/images/${project.image}" alt="${project.title}">
                        <p>${project.description}</p>
                        <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                        <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                    </div>
                `;
                document.body.appendChild(modal);
                
                // Close modal functionality
                modal.querySelector('.close-modal').addEventListener('click', function() {
                    modal.remove();
                });
                
                // Close when clicking outside modal
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            }
        }
    });
}

// Advanced Functionality 2: Skills Progress Bars
function setupSkillsProgress() {
    const skills = [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Node.js', level: 75 },
        { name: 'Python', level: 70 }
    ];
    
    const skillsSection = document.createElement('section');
    skillsSection.id = 'skills';
    skillsSection.className = 'section';
    skillsSection.innerHTML = `
        <h2>My Skills</h2>
        <div class="skills-container" id="skills-container"></div>
    `;
    
    document.querySelector('main').appendChild(skillsSection);
    
    const skillsContainer = document.getElementById('skills-container');
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.innerHTML = `
            <h3>${skill.name}</h3>
            <div class="progress-bar">
                <div class="progress" style="width: 0%" data-level="${skill.level}"></div>
            </div>
            <span class="skill-level">0%</span>
        `;
        skillsContainer.appendChild(skillElement);
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const level = bar.dataset.level;
        let width = 0;
        const interval = setInterval(() => {
            if (width >= level) {
                clearInterval(interval);
            } else {
                width++;
                bar.style.width = `${width}%`;
                bar.parentElement.nextElementSibling.textContent = `${width}%`;
            }
        }, 20);
    });
}
