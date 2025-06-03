document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const bars = document.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a nav link or dropdown item
    const allLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    allLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                // Check if the clicked link is a main nav-link or a dropdown link
                // For main nav-links that are not part of a dropdown, or for dropdown links themselves, close the menu.
                // This prevents closing the menu if a user clicks on a 'Services' main link that just opens a dropdown.
                const isDropdownToggle = this.parentElement.classList.contains('dropdown') && this.classList.contains('nav-link');
                if (!isDropdownToggle || this.closest('.dropdown-menu')){
                    menuToggle.click();
                }
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Prevent default only if it's a valid internal link
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    let offset = 80; // Default offset for fixed header
                    // Special handling for service section items to scroll to the card, not just the anchor div
                    if (targetId === '#it-solutions') {
                        const card = document.getElementById('it-solutions-card');
                        if (card) {
                            window.scrollTo({
                                top: card.offsetTop - offset,
                                behavior: 'smooth'
                            });
                            return;
                        }
                    } else if (targetId === '#data-engineering') {
                        const card = document.getElementById('data-engineering-card');
                        if (card) {
                            window.scrollTo({
                                top: card.offsetTop - offset,
                                behavior: 'smooth'
                            });
                            return;
                        }
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault(); // Prevent submission if validation fails
            } else {
                // If validation passes, allow the form to submit to Formspree.
                // Formspree will handle the success message and redirection.
                // You can optionally show a temporary 'sending...' message here.
            }
        });
    }

    // Newsletter Form Validation
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Popup functionality
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    const popupForm = document.getElementById('popupForm');
    
    // Show popup after 5 seconds
    setTimeout(function() {
        if (popup) {
            popup.classList.add('show');
        }
    }, 5000);
    
    // Close popup when clicking the close button
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            popup.classList.remove('show');
        });
    }
    
    // Close popup when clicking outside the popup content
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('show');
            }
        });
    }
    
    // Popup Form Validation
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            // Basic validation
            const name = document.getElementById('popup-name').value.trim();
            const email = document.getElementById('popup-email').value.trim();
            const interest = document.getElementById('popup-interest').value;
            let isValid = true;

            if (name === '' || email === '' || interest === '') {
                alert('Please fill in all required fields.');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault(); // Prevent submission if validation fails
            } else {
                // If validation passes, allow the form to submit to Formspree.
                // Formspree will handle the success message and redirection.
                // Optionally, you can hide the popup here or show a 'sending...' message.
                // Hiding the popup immediately after successful client-side validation:
                if (popup) {
                    popup.classList.remove('show');
                }
            }
        });
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .feature, .about-image').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});