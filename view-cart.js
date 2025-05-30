// TimeHaven Cart Management System
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
        // Add this method to your CartManager class
    debugCart() 
    console.log('Current Cart:', this.cart);
    console.log('LocalStorage Cart:', localStorage.getItem('timehaven_cart'));
    console.log('Cart Container:', document.getElementById('cart-items-container'));

    document.addEventListener('DOMContentLoaded', function() {
        cartManager = new CartManager();
        window.cartManager = cartManager;
        cartManager.debugCart(); // Add this line
        console.log('TimeHaven Cart System initialized');
    });
    }
    

    // Initialize cart functionality
    init() {
        this.displayCartItems();
        this.updateCartSummary();
        this.updateCartCount();
        this.setupEventListeners();
        this.setupModal();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const cart = localStorage.getItem('timehaven_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('timehaven_cart', JSON.stringify(this.cart));
            this.updateCartCount();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addToCart(item) {
        try {
            // Validate required fields
            if (!item || !item.id || !item.name || !item.price) {
                console.error('Invalid item format:', item);
                this.showNotification('Invalid item format', 'error');
                return false;
            }
    
            // Check if item already exists in cart
            const existingItemIndex = this.cart.findIndex(cartItem => cartItem.id === item.id);
            
            if (existingItemIndex > -1) {
                this.showNotification('This item is already in your cart!', 'warning');
                return false;
            }
        
            // Add new item to cart
            this.cart.push({
                user_id: item.id,
                name: item.name,
                price: item.price,
                image: item.image || 'img/product/placeholder-watch.jpg',
                specs: item.specs || '',
                condition: item.condition || 'Pre-owned',
                addedAt: new Date().toISOString()
            });
        
            this.saveCart();
            this.displayCartItems();
            this.updateCartSummary();
            this.showNotification('Item added to cart successfully!', 'success');
            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            this.showNotification('Error adding item to cart', 'error');
            return false;
        }
    }
    // Remove item from cart
    removeFromCart(itemId) {
        const itemIndex = this.cart.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            const removedItem = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.saveCart();
            
            // Animate removal
            const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
            if (itemElement) {
                itemElement.classList.add('slide-out');
                setTimeout(() => {
                    this.displayCartItems();
                    this.updateCartSummary();
                    this.showNotification(`${removedItem.name} removed from cart`, 'info');
                }, 300);
            }
        }
    }

    // Clear entire cart
    clearCart() {
        if (this.cart.length === 0) {
            this.showNotification('Cart is already empty!', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear your entire cart?')) {
            this.cart = [];
            this.saveCart();
            this.displayCartItems();
            this.updateCartSummary();
            this.showNotification('Cart cleared successfully!', 'info');
        }
    }

    displayCartItems() {
        try {
            const cartContainer = document.getElementById('cart-items-container');
            const emptyCart = document.getElementById('empty-cart');
            const checkoutBtn = document.getElementById('checkout-all-btn');
    
            if (!cartContainer || !emptyCart || !checkoutBtn) {
                console.error('Required cart elements not found in DOM');
                return;
            }
    
            console.log('Displaying cart items:', this.cart); // Debug log
    
            if (this.cart.length === 0) {
                cartContainer.innerHTML = '';
                emptyCart.style.display = 'block';
                checkoutBtn.disabled = true;
                return;
            }
    
            emptyCart.style.display = 'none';
            checkoutBtn.disabled = false;
    
            cartContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item fade-in" data-item-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='img product/placeholder-watch.jpg'">
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-specs">${item.specs}</p>
                        <p class="item-condition">${item.condition}</p>
                    </div>
                    <div class="item-price">₱${this.formatPrice(item.price)}</div>
                    <div class="item-actions">
                        <button class="remove-item" onclick="cartManager.removeFromCart('${item.id}')">
                            Remove
                        </button>
                        <a href="product-details.html?id=${item.id}" class="view-details">
                            View Details
                        </a>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error displaying cart items:', error);
        }
    }

    // Update cart summary
    updateCartSummary() {
        const itemCount = this.cart.length;
        const subtotal = this.cart.reduce((total, item) => total + parseFloat(item.price), 0);
        
        document.getElementById('item-count').textContent = itemCount;
        document.getElementById('subtotal').textContent = '₱' + this.formatPrice(subtotal);
        document.getElementById('total-price').textContent = '₱' + this.formatPrice(subtotal);

        // Update shipping info based on total
        const shippingElement = document.getElementById('shipping-cost');
        if (subtotal >= 50000) {
            shippingElement.textContent = 'Free';
        } else {
            shippingElement.textContent = 'Calculated at checkout';
        }
    }

    // Update cart count in navigation
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = this.cart.length;
        });
    }

    // Format price with thousands separator
    formatPrice(price) {
        const num = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : parseFloat(price);
        return isNaN(num) ? '0' : num.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-all-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
        }

        // Meetup location change handler
        const meetupSelect = document.getElementById('meetup-location');
        if (meetupSelect) {
            meetupSelect.addEventListener('change', (e) => this.handleMeetupLocationChange(e));
        }

        // Checkout form submission
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => this.handleCheckoutSubmission(e));
        }
    }

    // Setup modal functionality
    setupModal() {
        const modal = document.getElementById('checkout-modal');
        const closeBtn = document.getElementById('close-checkout');
        const cancelBtn = document.getElementById('cancel-checkout');

        // Close modal handlers
        [closeBtn, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.closeCheckoutModal());
            }
        });

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeCheckoutModal();
                }
            });
        }

        // Prevent modal close when clicking inside modal content
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Open checkout modal
    openCheckoutModal() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        const modal = document.getElementById('checkout-modal');
        this.populateCheckoutSummary();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = document.getElementById('full-name');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    // Close checkout modal
    closeCheckoutModal() {
        const modal = document.getElementById('checkout-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetCheckoutForm();
    }

    // Populate checkout summary
    populateCheckoutSummary() {
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutTotal = document.getElementById('checkout-total');
        
        const subtotal = this.cart.reduce((total, item) => total + parseFloat(item.price), 0);
        
        checkoutItems.innerHTML = this.cart.map(item => `
            <div class="checkout-item">
                <span class="checkout-item-name">${item.name}</span>
                <span class="checkout-item-price">₱${this.formatPrice(item.price)}</span>
            </div>
        `).join('');
        
        checkoutTotal.textContent = '₱' + this.formatPrice(subtotal);
    }

    // Handle meetup location change
    handleMeetupLocationChange(e) {
        const addressGroup = document.getElementById('address-group');
        const selectedValue = e.target.value;
        
        if (selectedValue.includes('Courier') || selectedValue.includes('Shipping')) {
            addressGroup.style.display = 'block';
            document.getElementById('address').required = true;
        } else {
            addressGroup.style.display = 'none';
            document.getElementById('address').required = false;
            document.getElementById('address').value = '';
        }
    }

    // Handle checkout form submission
    handleCheckoutSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const orderData = {
            customer: {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                meetupLocation: formData.get('meetupLocation'),
                address: formData.get('address') || ''
            },
            items: this.cart,
            subtotal: this.cart.reduce((total, item) => total + parseFloat(item.price), 0),
            orderDate: new Date().toISOString(),
            orderId: this.generateOrderId()
        };

        // Show processing state
        const submitBtn = document.getElementById('submit-order');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing Order...';
        
        // Simulate server processing
        setTimeout(() => {
            // In a real app, this would be an API call
            console.log('Order processed:', orderData);
            
            // Store order in localStorage for demo purposes
            this.saveOrder(orderData);
            
            // Clear cart after successful order
            this.cart = [];
            this.saveCart();
            
            // Close modal and show success
            this.closeCheckoutModal();
            this.displayCartItems();
            this.updateCartSummary();
            
            // Show success message
            this.showOrderConfirmation(orderData);
            
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 2000);
    }

    // Generate unique order ID
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `TH${timestamp}${random}`;
    }

    // Save order to localStorage
    saveOrder(orderData) {
        try {
            const orders = JSON.parse(localStorage.getItem('timehaven_orders') || '[]');
            orders.push(orderData);
            localStorage.setItem('timehaven_orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving order:', error);
        }
    }

    // Show order confirmation
    showOrderConfirmation(orderData) {
        const message = `
            🎉 Order Confirmed! 
            
            Order ID: ${orderData.orderId}
            Total: ₱${this.formatPrice(orderData.subtotal)}
            
            We'll contact you shortly at ${orderData.customer.phone} to confirm your ${orderData.customer.meetupLocation}.
            
            Thank you for choosing TimeHaven!
        `;
        
        alert(message);
    }

    // Reset checkout form
    resetCheckoutForm() {
        const form = document.getElementById('checkout-form');
        if (form) {
            form.reset();
            const addressGroup = document.getElementById('address-group');
            addressGroup.style.display = 'none';
            document.getElementById('address').required = false;
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Get cart data (for external use)
    getCart() {
        return this.cart;
    }

    // Get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => total + parseFloat(item.price), 0);
    }

    // Get cart count
    getCartCount() {
        return this.cart.length;
    }
}

// CSS for notifications (injected dynamically)
const notificationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize cart manager when DOM is loaded
let cartManager;

document.addEventListener('DOMContentLoaded', function() {
    cartManager = new CartManager();
    
    // Expose cartManager globally for use in other scripts
    window.cartManager = cartManager;
    
    console.log('TimeHaven Cart System initialized');
});

// Utility functions for external use
window.addToCart = function(item) {
    if (window.cartManager) {
        return window.cartManager.addToCart(item);
    }
    console.error('Cart manager not initialized');
    return false;
};

window.getCartCount = function() {
    if (window.cartManager) {
        return window.cartManager.getCartCount();
    }
    return 0;
};

window.getCartTotal = function() {
    if (window.cartManager) {
        return window.cartManager.getCartTotal();
    }
    return 0;
};

// Handle page visibility change (update cart when returning to page)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.cartManager) {
        // Refresh cart data when page becomes visible
        window.cartManager.cart = window.cartManager.loadCart();
        window.cartManager.displayCartItems();
        window.cartManager.updateCartSummary();
        window.cartManager.updateCartCount();
    }
});