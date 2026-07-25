/**
 * Cortexa Electronics Theme - Main JavaScript
 *
 * @package Cortexa
 */
(function() {
    'use strict';

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('site-navigation');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mainNav.classList.toggle('toggled');
        });

        // Close menu on link click (mobile)
        document.querySelectorAll('.primary-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('toggled');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 600) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#' || target.length <= 1) return;
            const el = document.querySelector(target);
            if (el) {
                e.preventDefault();
                const headerOffset = 100;
                const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('masthead');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const current = window.scrollY;
            if (current > 100) {
                header.style.background = 'rgba(10, 22, 40, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 22, 40, 0.95)';
                header.style.boxShadow = 'none';
            }
            lastScroll = current;
        });
    }

    // Reveal animations on scroll
    if ('IntersectionObserver' in window) {
        const reveals = document.querySelectorAll('.service-card, .partner-card, .why-card, .brand-card, .about-card, .timeline-item');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-num');
    if (stats.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    if (isNaN(num)) return;
                    const suffix = text.replace(/[0-9]/g, '');
                    let current = 0;
                    const step = Math.max(1, Math.ceil(num / 30));
                    const interval = setInterval(function() {
                        current += step;
                        if (current >= num) {
                            current = num;
                            clearInterval(interval);
                        }
                        el.textContent = current + suffix;
                    }, 30);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        stats.forEach(function(s) { counterObserver.observe(s); });
    }

    // Contact form basic validation
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = new FormData(form);
            console.log('Form submitted', data);
            alert('Thank you! We have received your message and will contact you shortly.');
            form.reset();
        });
    }
})();
