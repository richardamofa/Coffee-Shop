// Menu data
const menuItems = [
    {
        id: 1,
        name: "Espresso",
        category: "hot-coffee",
        price: 20.50,
        description: "Rich and bold espresso shot",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg"
    },
    {
        id: 2,
        name: "Cappuccino",
        category: "hot-coffee",
        price: 40.25,
        description: "Espresso with steamed milk and foam",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cappuccino_in_original.jpg/1200px-Cappuccino_in_original.jpg"
    },
    {
        id: 3,
        name: "Latte",
        category: "hot-coffee",
        price: 45.75,
        description: "Smooth espresso with steamed milk",
        image: "https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dw2ca0aa66/images/recipe-Images/cafe-latte1-recipe.jpg?sw=1200&sh=630"
    },
    {
        id: 4,
        name: "Americano",
        category: "hot-coffee",
        price: 30.75,
        description: "Espresso with hot water",
        image: "https://assets.beanbox.com/blog_images/AB7ud4YSE6nmOX0iGlgA.jpeg"
    },
    {
        id: 5,
        name: "Mocha",
        category: "hot-coffee",
        price: 50.25,
        description: "Espresso with chocolate and steamed milk",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw3tC7AUTzU2KVzoeAP41P3kAYROR840Dtuw&s"
    },
    {
        id: 6,
        name: "Iced Coffee",
        category: "cold-coffee",
        price: 35.95,
        description: "Chilled coffee served over ice",
        image: "https://www.allrecipes.com/thmb/Hqro0FNdnDEwDjrEoxhMfKdWfOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21667-easy-iced-coffee-ddmfs-4x3-0093-7becf3932bd64ed7b594d46c02d0889f.jpg"
    },
    {
        id: 7,
        name: "Cold Brew",
        category: "cold-coffee",
        price: 40.50,
        description: "Smooth cold-brewed coffee",
        image: "https://lifesimplified.gorenje.com/wp-content/uploads/2024/06/gorenje-blog-refreshing_cold_brew_coffee.jpg"
    },
    {
        id: 8,
        name: "Frappuccino",
        category: "cold-coffee",
        price: 50.75,
        description: "Blended iced coffee with whipped cream",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrK83EquDfitjzSW8MPpL1rY1EGjPhm23RQ&s"
    },
    {
        id: 9,
        name: "Iced Latte",
        category: "cold-coffee",
        price: 20.95,
        description: "Espresso with cold milk over ice",
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg"
    },
    {
        id: 10,
        name: "Croissant",
        category: "pastries",
        price: 25.95,
        description: "Buttery, flaky French pastry",
        image: "https://baranbakery.com/wp-content/uploads/2024/07/Croissants-20-500x500.jpg"
    },
    {
        id: 11,
        name: "Blueberry Muffin",
        category: "pastries",
        price: 30.25,
        description: "Fresh baked muffin with blueberries",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzt_RD7uxGPxeR2sQVYnTKtQALj-IIMP5eA&s"
    },
    {
        id: 12,
        name: "Danish Pastry",
        category: "pastries",
        price: 20.75,
        description: "Sweet pastry with fruit filling",
        image: "https://www.browneyedbaker.com/wp-content/uploads/2020/03/BEB-danish-pastries-36-square.jpg"
    },
    {
        id: 13,
        name: "Club Sandwich",
        category: "sandwiches",
        price: 30.95,
        description: "Triple-decker with turkey, bacon, and vegetables",
        image: "https://www.jocooks.com/wp-content/uploads/2020/10/club-sandwich-1-9.jpg"
    },
    {
        id: 14,
        name: "Grilled Cheese",
        category: "sandwiches",
        price: 60.50,
        description: "Classic grilled cheese with tomato",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg"
    },
    {
        id: 15,
        name: "BLT Sandwich",
        category: "sandwiches",
        price: 45.75,
        description: "Bacon, lettuce, and tomato on toasted bread",
        image: "https://dyvn6jpt1f0d3.cloudfront.net/wp-content/uploads/2023/10/14154227/BLT-for-recipe-1-6-1200x675.jpeg"
    }
];

// Cart functionality Storing In Local Storage
let cart = JSON.parse(localStorage.getItem('coffeeShopCart')) || [];

// DOM elements
const menuGrid = document.getElementById('menuGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cartTotal');
const checkoutModal = document.getElementById('checkoutModal');
const confirmationModal = document.getElementById('confirmationModal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayMenuItems(menuItems);
    updateCartUI();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Category filter buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            if (category === 'all') {
                displayMenuItems(menuItems);
            } else {
                const filteredItems = menuItems.filter(item => item.category === category);
                displayMenuItems(filteredItems);
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });

    // Order form
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', handleOrderSubmit);

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
}

// Display menu items
function displayMenuItems(items) {
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item fade-in';
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">₵${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItemElement);
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    
    // Show success feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#d4a574';
    }, 1000);
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

// Update cart items display
function updateCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">₵${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
            saveCart();
        }
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('coffeeShopCart', JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    displayCheckoutItems();
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Display checkout items
function displayCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    checkoutItems.innerHTML = '';
    cart.forEach(item => {
        const checkoutItemElement = document.createElement('div');
        checkoutItemElement.className = 'checkout-item';
        checkoutItemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <div class="item-quantity">Quantity: ${item.quantity}</div>
            </div>
            <div class="item-price">₵${(item.price * item.quantity).toFixed(2)}</div>
        `;
        checkoutItems.appendChild(checkoutItemElement);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
}

// Handle order submission
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        customer: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value
        },
        paymentMethod: document.getElementById('paymentMethod').value,
        specialInstructions: document.getElementById('specialInstructions').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderNumber: generateOrderNumber(),
        timestamp: new Date().toISOString()
    };
    
    // Simulate order processing
    const submitBtn = document.querySelector('.place-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Order successful
        closeCheckout();
        showOrderConfirmation(orderData.orderNumber);
        
        // Clear cart
        cart = [];
        updateCartUI();
        saveCart();
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Generate order number
function generateOrderNumber() {
    return 'BH' + Date.now().toString().slice(-6);
}

// Show order confirmation
function showOrderConfirmation(orderNumber) {
    document.getElementById('orderNumber').textContent = orderNumber;
    confirmationModal.classList.add('active');
}

// Close checkout modal
function closeCheckout() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close confirmation modal
function closeConfirmation() {
    confirmationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Scroll to menu section
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        closeCheckout();
    }
    if (e.target === confirmationModal) {
        closeConfirmation();
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        if (checkoutModal.classList.contains('active')) {
            closeCheckout();
        }
        if (confirmationModal.classList.contains('active')) {
            closeConfirmation();
        }
    }
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 24, 16, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#2c1810';
        navbar.style.backdropFilter = 'none';
    }
});

window.addEventListener('click', (e) => {
    if (e.target === navbar) {
        closenavbar();
    }
});


// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .about-content, .contact-content');
    animateElements.forEach(el => observer.observe(el));
});