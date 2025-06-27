    // Initialize particles.js when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3b82f6"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3b82f6",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Add more floating elements dynamically
        const floatingContainer = document.querySelector('.floating-elements');
        const colors = [
            'rgba(59, 130, 246, 0.1)',
            'rgba(96, 165, 250, 0.1)',
            'rgba(147, 197, 253, 0.1)'
        ];
        
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.classList.add('floating-element');
            
            const size = Math.floor(Math.random() * 300) + 100;
            const top = Math.floor(Math.random() * 80);
            const left = Math.floor(Math.random() * 80);
            const delay = Math.floor(Math.random() * 5);
            const duration = Math.floor(Math.random() * 15) + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.top = `${top}%`;
            element.style.left = `${left}%`;
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
            element.style.backgroundColor = color;
            
            floatingContainer.appendChild(element);
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Scroll animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => fadeInObserver.observe(el));
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const statusMessage = document.getElementById('statusMessage');
        
        // Set original button text
        const originalBtnText = submitBtn.innerHTML;
        
        // Update button to show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Set the _replyto field with the current email value
            form.querySelector('input[name="_replyto"]').value = form.querySelector('input[name="email"]').value;
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                statusMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                statusMessage.className = 'status-message success';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = 'Oops! There was a problem sending your message. Please try again later.';
            statusMessage.className = 'status-message error';
        } finally {
            // Reset button to original state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        }
    });