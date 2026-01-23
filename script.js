// ==================== CONFIGURATION ====================
// Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_abc123', // Replace with your service ID
    TEMPLATE_ID: 'template_xyz789', // Replace with your template ID
    USER_ID: 'user_123456789' // Replace with your public key
};

// Your GitHub projects
const GITHUB_PROJECTS = [
    {
        title: "Portfolio Website",
        description: "Modern, animated, and responsive coder portfolio with glass morphism design",
        category: "web",
        icon: "fas fa-laptop-code",
        github: "https://github.com/iammaryam24/portfolio"
    },
    {
        title: "Handling Student Transcript",
        description: "Programming Fundamentals project with C++",
        category: "university",
        icon: "fas fa-file-alt",
        github: "https://github.com/iammaryam24/student-transcript"
    },
    {
        title: "Matching Card Game",
        description: "Artificial Intelligence memory matching game project",
        category: "ai",
        icon: "fas fa-brain",
        github: "https://github.com/iammaryam24/matching-game"
    },
    {
        title: "E-Commerce Website",
        description: "Full-featured e-commerce platform with cart functionality",
        category: "web",
        icon: "fas fa-shopping-cart",
        github: "https://github.com/iammaryam24/ecommerce-website"
    },
    {
        title: "Weather App",
        description: "Real-time weather application with API integration",
        category: "web",
        icon: "fas fa-cloud-sun",
        github: "https://github.com/iammaryam24/weather-app"
    },
    {
        title: "Task Manager",
        description: "Todo application with drag & drop functionality",
        category: "personal",
        icon: "fas fa-tasks",
        github: "https://github.com/iammaryam24/task-manager"
    },
    {
        title: "Calculator App",
        description: "Scientific calculator with advanced functions",
        category: "personal",
        icon: "fas fa-calculator",
        github: "https://github.com/iammaryam24/calculator"
    },
    {
        title: "Restaurant Website",
        description: "Responsive restaurant website with menu and booking system",
        category: "web",
        icon: "fas fa-utensils",
        github: "https://github.com/iammaryam24/restaurant-website"
    },
    {
        title: "Chat Application",
        description: "Real-time chat app using WebSocket",
        category: "web",
        icon: "fas fa-comments",
        github: "https://github.com/iammaryam24/chat-app"
    },
    {
        title: "Expense Tracker",
        description: "Personal finance management application",
        category: "personal",
        icon: "fas fa-chart-line",
        github: "https://github.com/iammaryam24/expense-tracker"
    },
    {
        title: "Blog Platform",
        description: "CMS blog with rich text editor",
        category: "web",
        icon: "fas fa-blog",
        github: "https://github.com/iammaryam24/blog-platform"
    }
];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio initialized');
    
    // Hide loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // Load initial data
    loadProjects();
    loadStats();
    createParticles();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initAnimations();
    
    // Initialize EmailJS
    if (EMAILJS_CONFIG.USER_ID !== 'user_123456789') {
        emailjs.init(EMAILJS_CONFIG.USER_ID);
    } else {
        console.warn('⚠️ Please update EmailJS configuration in script.js');
    }
});

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('close-menu');
    if (hamburger) {
        hamburger.addEventListener('click', openMobileMenu);
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterProjects(this.dataset.filter);
        });
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu if open
            closeMobileMenu();
            
            // Update active state
            if (this.classList.contains('nav-link')) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const icon = document.querySelector('#theme-toggle i');
        if (icon) icon.className = 'fas fa-sun';
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.getElementById('hamburger');
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// ==================== THEME TOGGLE ====================
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = document.body.classList.contains('light-theme') ? 'fas fa-sun' : 'fas fa-moon';
    }
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// ==================== MOBILE MENU ====================
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// ==================== CONTACT FORM ====================
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: "maryamazmat444@gmail.com",
                reply_to: formData.email
            }
        );
        
        if (response.status === 200) {
            showMessage('🎉 Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            updateMessageCount();
        } else {
            showMessage('❌ Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        showMessage('❌ Error sending message. Please try again or contact me directly at maryamazmat444@gmail.com', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ==================== PROJECTS ====================
function loadProjects() {
    displayProjects(GITHUB_PROJECTS);
    updateProjectCount(GITHUB_PROJECTS.length);
}

function displayProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    if (projects.length === 0) {
        container.innerHTML = '<p class="empty-state">No projects found</p>';
        return;
    }
    
    container.innerHTML = projects.map(project => `
        <div class="project-card glass-card" data-category="${project.category}">
            <div class="project-icon">
                <i class="${project.icon || 'fas fa-code'}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="project-category">${project.category}</span>
                <a href="${project.github}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        </div>
    `).join('');
}

function filterProjects(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// ==================== STATISTICS ====================
function loadStats() {
    // Load visit count from localStorage
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    
    // Load message count from localStorage
    let messageCount = localStorage.getItem('messageCount') || 0;
    
    updateStats(visitCount, messageCount);
}

function updateStats(visits, messages) {
    const visitCount = document.getElementById('visitCount');
    const messageCount = document.getElementById('messageCount');
    const footerMessageCount = document.getElementById('footerMessageCount');
    const footerProjectCount = document.getElementById('footerProjectCount');
    
    if (visitCount) visitCount.textContent = visits;
    if (messageCount) messageCount.textContent = messages;
    if (footerMessageCount) footerMessageCount.textContent = messages;
    if (footerProjectCount) footerProjectCount.textContent = GITHUB_PROJECTS.length;
}

function updateMessageCount() {
    let messageCount = localStorage.getItem('messageCount') || 0;
    messageCount = parseInt(messageCount) + 1;
    localStorage.setItem('messageCount', messageCount);
    
    const messageElements = [
        'messageCount',
        'footerMessageCount'
    ];
    
    messageElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = messageCount;
        }
    });
}

function updateProjectCount(count) {
    const elements = [
        'projectCount',
        'totalProjects',
        'footerProjectCount'
    ];
    
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'totalProjects') {
                el.textContent = `${count}+`;
            } else {
                el.textContent = count;
            }
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    if (!messageDiv) {
        alert(text);
        return;
    }
    
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function initAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease-in-out';
                    entry.target.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // Animate floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const x = Math.random() * 80 + 10; // 10% to 90%
        const y = Math.random() * 80 + 10;
        shape.style.left = `${x}%`;
        shape.style.top = `${y}%`;
    });
}

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: var(--primary);
            border-radius: 50%;
            animation: particleFloat ${Math.random() * 20 + 10}s infinite linear;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
        `;
        
        // Add keyframes for this particle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                90% {
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        particlesContainer.appendChild(particle);
    }
}

// Make filterProjects available globally
window.filterProjects = filterProjects;