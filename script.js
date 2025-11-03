// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
});

// Keyboard support for mobile menu button
mobileMenuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuBtn.click();
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Hero Section Animations
anime({
    targets: '#hero-title',
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: 200
});

anime({
    targets: '#hero-tagline',
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 600
});

anime({
    targets: '#hero-cta',
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 1000
});

// Button hover animations
document.querySelectorAll('a[href="#projects"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.05,
            duration: 300
        });
    });

    button.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 300
        });
    });
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            if (element.classList.contains('picture-item')) {
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(100, {
                        grid: [3, 2],
                        from: 'first'
                    })
                });
                observer.unobserve(element);
            }

            if (element.classList.contains('timeline-item')) {
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(200)
                });
                observer.unobserve(element);
            }

            if (element.classList.contains('project-card')) {
                anime({
                    targets: element,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(150)
                });
                observer.unobserve(element);
            }
        }
    });
}, observerOptions);

// Observe all elements that need scroll animations
document.querySelectorAll('.picture-item, .timeline-item, .project-card').forEach(el => {
    observer.observe(el);
});

// About section animation
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: '#about [class*="opacity-0"]',
                opacity: [0, 1],
                translateX: [50, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: anime.stagger(200)
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.getElementById('about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Skills section animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: '#skills [class*="opacity-0"]',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: anime.stagger(200)
            });

            // Animate skill bars
            setTimeout(() => {
                document.querySelectorAll('.skill-bar').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    anime({
                        targets: bar,
                        width: ['0%', width + '%'],
                        duration: 1500,
                        easing: 'easeOutExpo',
                        delay: 300
                    });
                });
            }, 500);

            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact form animation
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: '#contact-form',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo'
            });
            contactObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const contactSection = document.getElementById('contact');
if (contactSection) {
    contactObserver.observe(contactSection);
}

// Footer animation
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: 'footer',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'easeOutExpo'
            });
            footerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const footer = document.querySelector('footer');
if (footer) {
    footerObserver.observe(footer);
}

// Lightbox functionality for pictures
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.querySelectorAll('.picture-item img').forEach(img => {
    // Handle image loading errors
    const originalSrc = img.src;
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', originalSrc);
        // Keep the image visible but show a subtle placeholder background
        this.style.background = 'linear-gradient(135deg, #E4F8E8 0%, #DCEFFD 100%)';
    }, {
        once: true
    });

    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.style.display = 'block';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeLightbox.focus();

        // Fade in animation
        anime({
            targets: lightbox,
            opacity: [0, 1],
            duration: 300
        });

        anime({
            targets: '.lightbox-content',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutExpo'
        });
    });
});

// Close lightbox
function closeLightboxFunc() {
    anime({
        targets: lightbox,
        opacity: [1, 0],
        duration: 200,
        complete: function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            lightbox.setAttribute('aria-hidden', 'true');
            // Return focus to the image that was clicked
            const activeImage = document.activeElement;
            if (activeImage && activeImage.tagName === 'IMG') {
                activeImage.focus();
            }
        }
    });
}

closeLightbox.addEventListener('click', closeLightboxFunc);
closeLightbox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeLightboxFunc();
    }
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightboxFunc();
    }
});

// Make images focusable for keyboard navigation
document.querySelectorAll('.picture-item img').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');

    img.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

/*
 * CONTACT FORM EMAIL SETUP INSTRUCTIONS:
 * 
 * To enable email functionality, you need to set up EmailJS (free service):
 * 
 * 1. Go to https://www.emailjs.com and create a free account
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with these variables:
 *    - {{from_name}} - Sender's name
 *    - {{from_email}} - Sender's email
 *    - {{message}} - Message content
 *    - {{to_email}} - Your email (mohammadmudassir1604@gmail.com)
 * 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
 * 5. Replace the placeholder values below (YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY)
 * 
 * The form will send emails to: mohammadmudassir1604@gmail.com
 */

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        showFormError('Please fill in all fields.');
        return;
    }

    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address.');
        return;
    }

    // Animate submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    anime({
        targets: submitBtn,
        scale: [1, 0.95, 1],
        duration: 300
    });

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // EmailJS service parameters (loaded from config.js)
    if (typeof EMAILJS_CONFIG === 'undefined') {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showFormError('Email service configuration is missing. Please ensure config.js exists with your EmailJS credentials.');
        return;
    }

    const serviceID = EMAILJS_CONFIG.serviceID;
    const templateID = EMAILJS_CONFIG.templateID;
    const publicKey = EMAILJS_CONFIG.publicKey;

    // Initialize EmailJS with public key
    emailjs.init(publicKey);

    // Prepare email parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'mohammadmudassir1604@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            // Success
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.backgroundColor = '#10b981';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);

            showFormSuccess('Thank you! Your message has been sent successfully.');
        }, function(error) {
            // Error
            console.error('EmailJS error:', error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showFormError('Sorry, there was an error sending your message. Please try again later or contact me directly at mohammadmudassir1604@gmail.com');
        });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4';
    errorDiv.textContent = message;

    const form = document.getElementById('contact-form');
    const existingError = form.querySelector('.bg-red-100');
    if (existingError) {
        existingError.remove();
    }

    form.insertBefore(errorDiv, form.firstChild);

    anime({
        targets: errorDiv,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 300
    });
}

function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4';
    successDiv.textContent = message;

    const form = document.getElementById('contact-form');
    const existingSuccess = form.querySelector('.bg-green-100');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    form.insertBefore(successDiv, form.firstChild);

    anime({
        targets: successDiv,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 300
    });

    setTimeout(() => {
        anime({
            targets: successDiv,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 300,
            complete: function() {
                successDiv.remove();
            }
        });
    }, 3000);
}

// Download CV button animation
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
        // Allow the download to proceed, but add animation
        anime({
            targets: this,
            scale: [1, 0.95, 1],
            duration: 300
        });

        // Show feedback
        const originalText = this.textContent;
        this.textContent = 'Downloading...';

        setTimeout(() => {
            this.textContent = originalText;
        }, 1500);
    });
}

// Social icons hover animation
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.1,
            rotate: 5,
            duration: 300
        });
    });

    icon.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            rotate: 0,
            duration: 300
        });
    });
});

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    }

    lastScroll = currentScroll;
});

// Spline 3D Scene Integration
// Note: Replace the splineSceneUrl with your actual Spline scene URL
// You can get this from Spline by exporting your scene and getting the embed URL
async function loadSplineScene() {
    try {
        // Replace this URL with your actual Spline scene URL
        // Example: https://my.spline.design/scene-abc123
        const splineSceneUrl = 'https://prod.spline.design/6Wq1q7K6P5-Z5UyB/scene.splinecode';

        // Create canvas for Spline scene
        const canvas = document.createElement('canvas');
        canvas.id = 'spline-canvas';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const container = document.getElementById('spline-container');
        if (container) {
            container.appendChild(canvas);

            // Load Spline scene
            // Note: This requires the Spline runtime to be loaded
            // For now, we'll create a placeholder animation
            // Uncomment and configure when you have a Spline scene URL:

            /*
            import { Application } from '@splinetool/runtime';
            const app = new Application(canvas);
            app.load(splineSceneUrl);
            */

            // Placeholder: Subtle animated background instead
            container.style.background = 'radial-gradient(circle at 50% 50%, rgba(220, 239, 253, 0.3) 0%, transparent 70%)';

            // Add a subtle animation
            anime({
                targets: '#spline-container',
                backgroundPosition: ['0% 0%', '100% 100%'],
                duration: 10000,
                easing: 'linear',
                loop: true
            });
        }
    } catch (error) {
        console.log('Spline scene could not be loaded. Using fallback animation.');
    }
}

// Initialize Spline on page load
window.addEventListener('load', () => {
    loadSplineScene();
    initThreeJS();
});

// Three.js 3D Animation Setup
function initThreeJS() {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    // Set canvas size
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const width = heroSection.offsetWidth;
        const height = heroSection.offsetHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // Camera position
    camera.position.z = 5;

    // Create floating geometric shapes
    const shapes = [];
    const colors = [0xDCEFFD, 0xE4F8E8, 0xFFE4E1, 0xFDF6EC]; // Sky blue, mint, blush pink, beige

    // Create multiple shapes
    for (let i = 0; i < 15; i++) {
        let geometry;
        const randomType = Math.random();

        if (randomType < 0.33) {
            geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        } else if (randomType < 0.66) {
            geometry = new THREE.OctahedronGeometry(0.2, 0);
        } else {
            geometry = new THREE.IcosahedronGeometry(0.2, 0);
        }

        const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.3,
            roughness: 0.6,
            transparent: true,
            opacity: 0.7
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Random position
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 5;

        // Random rotation speed
        mesh.userData = {
            rotationSpeedX: (Math.random() - 0.5) * 0.02,
            rotationSpeedY: (Math.random() - 0.5) * 0.02,
            rotationSpeedZ: (Math.random() - 0.5) * 0.02,
            floatSpeed: (Math.random() - 0.5) * 0.02,
            initialY: mesh.position.y
        };

        shapes.push(mesh);
        scene.add(mesh);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point lights for more depth
    const pointLight1 = new THREE.PointLight(0xDCEFFD, 0.5, 10);
    pointLight1.position.set(-5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xE4F8E8, 0.5, 10);
    pointLight2.position.set(5, -3, 5);
    scene.add(pointLight2);

    // Animation loop
    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotate and float shapes
        shapes.forEach((mesh, index) => {
            // Rotation
            mesh.rotation.x += mesh.userData.rotationSpeedX;
            mesh.rotation.y += mesh.userData.rotationSpeedY;
            mesh.rotation.z += mesh.userData.rotationSpeedZ;

            // Floating animation
            mesh.position.y = mesh.userData.initialY + Math.sin(time + index) * 0.5;

            // Subtle horizontal movement
            mesh.position.x += Math.sin(time * 0.5 + index) * 0.001;
        });

        // Rotate camera slightly for dynamic view
        camera.position.x = Math.sin(time * 0.3) * 0.5;
        camera.position.y = Math.cos(time * 0.2) * 0.3;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
        if (heroSection) {
            const width = heroSection.offsetWidth;
            const height = heroSection.offsetHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    }

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.02,
            translateY: -5,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    card.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            translateY: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('home');
    if (hero && scrolled < hero.offsetHeight) {
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Add keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});