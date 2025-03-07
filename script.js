document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const languageSelector = document.querySelector('.language-selector');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            languageSelector.style.display = languageSelector.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Language Translation
    const languageSelect = document.getElementById('language-select');
    const translateElements = document.querySelectorAll('.translate');

    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }

    function changeLanguage(language) {
        translateElements.forEach(element => {
            const translatedText = element.getAttribute(`data-${language}`);
            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        // Update form placeholders
        updateFormPlaceholders(language);

        // Store language preference
        localStorage.setItem('preferredLanguage', language);
    }

    function updateFormPlaceholders(language) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        if (language === 'en') {
            if (nameInput) nameInput.placeholder = 'Enter your name';
            if (emailInput) emailInput.placeholder = 'Enter your email';
            if (phoneInput) phoneInput.placeholder = 'Enter your phone number';
            if (messageInput) messageInput.placeholder = 'Enter your message';
        } else if (language === 'hi') {
            if (nameInput) nameInput.placeholder = 'अपना नाम दर्ज करें';
            if (emailInput) emailInput.placeholder = 'अपना ईमेल दर्ज करें';
            if (phoneInput) phoneInput.placeholder = 'अपना फोन नंबर दर्ज करें';
            if (messageInput) messageInput.placeholder = 'अपना संदेश दर्ज करें';
        } else if (language === 'mr') {
            if (nameInput) nameInput.placeholder = 'आपले नाव प्रविष्ट करा';
            if (emailInput) emailInput.placeholder = 'आपला ईमेल प्रविष्ट करा';
            if (phoneInput) phoneInput.placeholder = 'आपला फोन नंबर प्रविष्ट करा';
            if (messageInput) messageInput.placeholder = 'आपला संदेश प्रविष्ट करा';
        }
    }

    // Check for stored language preference
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
        languageSelect.value = storedLanguage;
        changeLanguage(storedLanguage);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (window.innerWidth < 768) {
                nav.style.display = 'none';
                languageSelector.style.display = 'none';
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! We will contact you soon.');
            
            // Clear the form
            contactForm.reset();
            
            // Redirect to WhatsApp with the message
            const whatsappMessage = `Hello, my name is ${name}. I'm interested in ${service}. ${message}`;
            const whatsappUrl = `https://wa.me/917030307028?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Add lazy loading attribute to all images
    document.querySelectorAll('.card-img img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .section-title, .section-description');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .card, .section-title, .section-description {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Mobile Navigation Toggle
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    }
});
