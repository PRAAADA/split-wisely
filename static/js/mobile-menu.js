// mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Mobile menu initialized! 📱');
    
    // ===== HAMBURGER MENU CREATION =====
    // agar hamburger button nahi hai to create karo
    const navContainer = document.querySelector('.nav-container');
    
    if (navContainer && !document.querySelector('.hamburger-menu')) {
        // hamburger button create kiya
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        // dark mode toggle ke pehle insert kiya
        const themeToggle = navContainer.querySelector('.theme-toggle');
        if (themeToggle) {
            navContainer.insertBefore(hamburger, themeToggle);
        } else {
            navContainer.appendChild(hamburger);
        }
    }
    
    // ===== HAMBURGER MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        // hamburger click - menu open/close
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // body click se menu close na ho
            
            // toggle active class
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            console.log('Menu toggled');
        });
    }
    
    // ===== CLOSE MENU ON LINK CLICK =====
    // jab koi link click ho to menu close ho jaye
    const menuLinks = document.querySelectorAll('.nav-links a');
    
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // ===== CLOSE MENU ON OUTSIDE CLICK =====
    // screen pe kahi bhi click karo to menu close
    document.addEventListener('click', function(e) {
        if (hamburger && navLinks) {
            // agar click menu ya hamburger pe nahi hua
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
    
    // ===== CLOSE MENU ON ESC KEY =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
    
    // ===== PREVENT BODY SCROLL WHEN MENU OPEN =====
    // optional - menu open hone pe background scroll na ho
    if (hamburger && navLinks) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navLinks.classList.contains('active')) {
                        // menu open - body scroll disable
                        document.body.style.overflow = 'hidden';
                    } else {
                        // menu close - body scroll enable
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        observer.observe(navLinks, { attributes: true });
    }
    
    // ===== SWIPE GESTURES (OPTIONAL) =====
    // left swipe se menu close ho jaye
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (navLinks) {
        navLinks.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        navLinks.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // right to left swipe (50px se zyada)
            if (touchStartX - touchEndX > 50) {
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        }
    }
    
    // ===== RESIZE HANDLER =====
    // desktop size pe wapas aane pe menu reset kar do
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // desktop size - menu close kar do
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
});