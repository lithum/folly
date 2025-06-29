// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Artwork filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const artworkItems = document.querySelectorAll('.artwork-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        artworkItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Artwork modal functionality
const modal = document.getElementById('artworkModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDetails = document.getElementById('modalDetails');
const modalDimensions = document.getElementById('modalDimensions');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

// Sample artwork data (in a real implementation, this would come from a database or CMS)
const artworkData = {
    'artwork-1': {
        title: 'Urban Reflections',
        medium: 'Oil on Canvas',
        year: '2024',
        dimensions: '36" x 48"',
        description: 'This piece explores the interplay between urban architecture and natural light, capturing the essence of city life through bold brushstrokes and vibrant colors.',
        image: 'images/artwork-1.jpg'
    },
    'artwork-2': {
        title: 'Metamorphosis',
        medium: 'Bronze',
        year: '2023',
        dimensions: '24" x 18" x 12"',
        description: 'A sculptural exploration of transformation and growth, this bronze piece represents the constant evolution of human experience.',
        image: 'images/artwork-2.jpg'
    },
    'artwork-3': {
        title: 'Digital Dreams',
        medium: 'Mixed Media Installation',
        year: '2023',
        dimensions: 'Site-specific',
        description: 'An immersive installation that blends digital projections with physical elements, creating a dreamlike environment that questions our relationship with technology.',
        image: 'images/artwork-3.jpg'
    },
    'artwork-4': {
        title: 'Pixel Poetry',
        medium: 'Digital Art',
        year: '2024',
        dimensions: 'Limited Edition Print',
        description: 'A digital artwork that transforms code into visual poetry, exploring the beauty found in the intersection of technology and art.',
        image: 'images/artwork-4.jpg'
    },
    'artwork-5': {
        title: 'Emotional Landscapes',
        medium: 'Acrylic on Canvas',
        year: '2022',
        dimensions: '30" x 40"',
        description: 'Abstract landscapes that represent internal emotional states, using color and form to convey feelings that words cannot express.',
        image: 'images/artwork-5.jpg'
    },
    'artwork-6': {
        title: 'Fragmented Memories',
        medium: 'Ceramic',
        year: '2023',
        dimensions: '16" x 12" x 8"',
        description: 'A ceramic sculpture that explores the fragmented nature of memory, with broken and reassembled pieces representing how we reconstruct our past.',
        image: 'images/artwork-6.jpg'
    }
};

// Add click event to artwork items
artworkItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const artworkKey = `artwork-${index + 1}`;
        const artwork = artworkData[artworkKey];
        
        if (artwork) {
            modalImage.src = artwork.image;
            modalImage.alt = artwork.title;
            modalTitle.textContent = artwork.title;
            modalDetails.textContent = `${artwork.medium}, ${artwork.year}`;
            modalDimensions.textContent = artwork.dimensions;
            modalDescription.textContent = artwork.description;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal functionality
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in a real implementation, this would send to a server)
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add fade-in to artwork items with stagger effect
    artworkItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add fade-in to exhibition items
    const exhibitionItems = document.querySelectorAll('.exhibition-item');
    exhibitionItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Add fade-in to interview items
    const interviewItems = document.querySelectorAll('.interview-item');
    interviewItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Print styles helper
window.addEventListener('beforeprint', () => {
    // Hide navigation and other non-essential elements when printing
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.hero').style.pageBreakAfter = 'always';
});

window.addEventListener('afterprint', () => {
    // Restore navigation after printing
    document.querySelector('.navbar').style.display = 'block';
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Artist Portfolio Website Loaded Successfully! 🎨');

