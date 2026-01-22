// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', function(e) {
        // Only prevent default on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Toggle icon
            const icon = link.querySelector('i');
            if (dropdown.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    });
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !link.parentElement.classList.contains('dropdown')) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Close any open dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const dropdownIcon = dropdown.querySelector('i');
                dropdownIcon.classList.remove('fa-chevron-up');
                dropdownIcon.classList.add('fa-chevron-down');
            });
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Don't interfere with dropdown toggles on mobile
        if (this.parentElement.classList.contains('dropdown') && window.innerWidth <= 768) {
            return;
        }
        
        const targetId = this.getAttribute('href');
        
        // Only process if it's an anchor link (not a regular link)
        if (targetId.startsWith('#') && targetId.length > 1) {
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        if (successMessage) {
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Testimonial Slider
const testimonialContainer = document.querySelector('.testimonial-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

if (testimonialContainer && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;
    
    // Set initial position
    testimonialContainer.style.transform = `translateX(0)`;
    
    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Go to slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// 3D Animation for Hero Section
if (document.querySelector('.hero')) {
    class Particle {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > window.innerWidth) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > window.innerHeight) {
                this.speedY *= -1;
            }
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    const heroSection = document.querySelector('.hero');
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(173, 216, 230, ${Math.random() * 0.5})`;
        
        particles.push(new Particle(x, y, size, color));
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        
        // Draw connections between particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(173, 216, 230, ${0.1 - distance/1500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Apply parallax to hero section elements
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        
        // Apply parallax to floating elements
        const cubes = document.querySelectorAll('.cube');
        cubes.forEach(cube => {
            const speed = cube.classList.contains('cube-1') ? 0.1 : 0.15;
            cube.style.transform = `translateY(${scrollY * speed}px) rotateX(${scrollY * 0.05}deg) rotateY(${scrollY * 0.05}deg)`;
        });
        
        const circles = document.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
            const speed = 0.1 + (index * 0.05);
            circle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Mouse move effect for hero section
    heroSection.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const cubes = document.querySelectorAll('.cube');
        cubes.forEach(cube => {
            cube.style.transform = `rotateX(${y * 20}deg) rotateY(${x * 20}deg)`;
        });
        
        const circles = document.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
            const factor = index + 1;
            circle.style.transform = `translate(${x * 30 * factor}px, ${y * 30 * factor}px)`;
        });
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Observe elements to animate
document.querySelectorAll('.section-title, .about-content, .services-grid, .projects-grid, .team-grid, .contact-container').forEach(el => {
    observer.observe(el);
    el.classList.add('fade-in');
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Project Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    // Append elements
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(closeBtn);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const lightboxStyle = document.createElement('style');
    lightboxStyle.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1010;
            justify-content: center;
            align-items: center;
        }
        .lightbox.active {
            display: flex;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox-img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 5px;
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(lightboxStyle);
    
    // Open lightbox on gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Newsletter Form Submission






// ✅ Newsletter Form Submission - Web3Forms
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const input = newsletterForm.querySelector('input').value;

        const formData = new FormData();
        formData.append('access_key', 'e83b790f-b9c7-4c1e-ad0c-1ea4277d5f46');
        formData.append('Form Type', 'Newsletter Contact');
        formData.append('Contact Info (Email or Phone)', input);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Thank you! We’ll get in touch with you soon.');
                newsletterForm.reset();
            } else {
                alert('There was an error. Please try again later.');
            }
        } catch (error) {
            alert('Something went wrong. Please try again later.');
        }
    });
}


//for that nav bar bogati tech logo


// Video Modal
const videoTriggers = document.querySelectorAll('.video-trigger');

if (videoTriggers.length > 0) {
    // Create video modal elements
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    
    const videoModalContent = document.createElement('div');
    videoModalContent.className = 'video-modal-content';
    
    const videoFrame = document.createElement('iframe');
    videoFrame.className = 'video-frame';
    videoFrame.setAttribute('allowfullscreen', '');
    
    const closeVideoBtn = document.createElement('span');
    closeVideoBtn.className = 'video-modal-close';
    closeVideoBtn.innerHTML = '&times;';
    
    // Append elements
    videoModalContent.appendChild(videoFrame);
    videoModalContent.appendChild(closeVideoBtn);
    videoModal.appendChild(videoModalContent);
    document.body.appendChild(videoModal);
    
    // Add video modal styles
    const videoModalStyle = document.createElement('style');
    videoModalStyle.textContent = `
        .video-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1010;
            justify-content: center;
            align-items: center;
        }
        .video-modal.active {
            display: flex;
        }
        .video-modal-content {
            position: relative;
            width: 80%;
            max-width: 900px;
        }
        .video-frame {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            border: none;
            position: relative;
        }
        .video-frame iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .video-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(videoModalStyle);
    
    // Open video modal on trigger click
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = trigger.getAttribute('data-video');
            videoFrame.src = videoUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close video modal
    closeVideoBtn.addEventListener('click', () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        videoFrame.src = '';
    });
    
    // Close video modal on outside click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            videoFrame.src = '';
        }
    });
}
