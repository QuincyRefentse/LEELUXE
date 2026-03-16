/**
 * LEE LUXE - Main JavaScript
 * Enterprise-level functionality
 */

// Product Data (simulating JSON fetch)
const products = [
    {
        id: 1,
        name: "The Sandton Pump",
        price: 550,
        category: "classic",
        image: "assets/images/shoe-classic-1.jpg",
        hoverImage: "assets/images/shoe-classic-1-hover.jpg",
        description: "Architectural heel for the boardroom."
    },
    {
        id: 2,
        name: "Hatfield Stiletto",
        price: 525,
        category: "signature",
        image: "assets/images/shoe-signature-1.jpg",
        hoverImage: "assets/images/shoe-signature-1-hover.jpg",
        description: "The campus icon, reimagined."
    },
    {
        id: 3,
        name: "The Luxe Pump",
        price: 600,
        category: "luxe",
        image: "assets/images/shoe-classic-2.jpg",
        hoverImage: "assets/images/shoe-classic-2-hover.jpg",
        description: "Limited edition, unlimited power."
    },
    {
        id: 4,
        name: "Midnight Stiletto",
        price: 580,
        category: "evening",
        image: "assets/images/shoe-signature-2.jpg",
        hoverImage: "assets/images/shoe-signature-2-hover.jpg",
        description: "For the woman who owns the night."
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scroll
    initSmoothScroll();
    
    // Newsletter form
    initNewsletter();
    
    // Lazy load images with fallback
    initImageFallback();
});

/**
 * Load featured products into grid
 */
function loadFeaturedProducts() {
    const productGrid = document.getElementById('featured-products');
    if (!productGrid) return;
    
    // Take first 4 products
    const featuredProducts = products.slice(0, 4);
    
    let html = '';
    featuredProducts.forEach(product => {
        html += `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}"
                         onerror="this.src='https://via.placeholder.com/600x800/111111/ffffff?text=LEE+LUXE'">
                    <div class="product-overlay">
                        <div class="product-actions">
                            <a href="#" class="action-btn" onclick="quickView(${product.id}); return false;">
                                <i class="fa-regular fa-eye"></i>
                            </a>
                            <a href="#" class="action-btn" onclick="addToWishlist(${product.id}); return false;">
                                <i class="fa-regular fa-heart"></i>
                            </a>
                            <a href="#" class="action-btn" onclick="addToCart(${product.id}); return false;">
                                <i class="fa-regular fa-bag-shopping"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">R${product.price}</p>
                </div>
            </div>
        `;
    });
    
    productGrid.innerHTML = html;
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = '';
            if (toggle.querySelector('i')) {
                toggle.querySelector('i').classList.remove('fa-times');
                toggle.querySelector('i').classList.add('fa-bars');
            }
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
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
}

/**
 * Newsletter form handling
 */
function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            const email = input.value;
            
            if (validateEmail(email)) {
                // Simulate API call
                console.log('Newsletter signup:', email);
                showMessage('Thank you for subscribing to The Luxe Edit.', 'success');
                input.value = '';
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    });
}

/**
 * Email validation
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show message (can be expanded to toast/notification)
 */
function showMessage(message, type) {
    alert(message); // Simple for demo - in production use a toast
}

/**
 * Image fallback handling
 */
function initImageFallback() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/600x800/111111/ffffff?text=LEE+LUXE';
        });
    });
}

/**
 * Product actions (these would connect to cart/wishlist in production)
 */
window.quickView = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        console.log('Quick view:', product);
        alert(`${product.name}\n${product.description}\nPrice: R${product.price}`);
    }
};

window.addToWishlist = function(productId) {
    const product = products.find(p => p.id === productId);
    console.log('Added to wishlist:', product);
    showMessage(`${product.name} added to wishlist`, 'success');
};

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    console.log('Added to cart:', product);
    showMessage(`${product.name} added to cart (R${product.price})`, 'success');
};

/**
 * Header scroll effect
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    }
});