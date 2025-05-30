document.addEventListener('DOMContentLoaded', function() {
    
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            this.classList.add('active');
            
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });

        thumbnail.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        thumbnail.setAttribute('tabindex', '0');
    });

    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const product = {
                user_id: 1, // You should get this from session in a real app
                product_id: 'srpg35', // Unique product identifier
                name: 'Seiko Black Field Watch (Vintage Look)',
                price: 9499,
                image: 'img product/Seiko Black Field Watch.jpg',
                specs: 'Model: SRPG35, 9/10 condition with small scratch',
                condition: 'Pre-owned'
            };
            
            // Add to cart via AJAX
            fetch('add_to_cart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    // Update cart count
                    updateCartCount();
                    // Show success message
                    this.textContent = 'Added to Cart!';
                    setTimeout(() => {
                        this.textContent = 'Add to Cart';
                    }, 2000);
                } else {
                    alert('Failed to add to cart: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to add to cart');
            });
        });
    }
    
    // Function to update cart count
    function updateCartCount() {
        fetch('get_cart_count.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'user_id=1' // Again, get from session in real app
        })
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('#cart-count').forEach(el => {
                el.textContent = data.count;
            });
        });
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (!checkoutModal) {
                checkoutModal = createCheckoutModal();
            }
            
            checkoutModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            
            setTimeout(() => {
                const firstInput = checkoutModal.querySelector('input[name="fullName"]');
                if (firstInput) firstInput.focus();
            }, 100);
        });
    }

    if (mainImage) {
        let isZoomed = false;
        
        mainImage.addEventListener('click', function() {
            if (!isZoomed) {
                this.style.transform = 'scale(1.5)';
                this.style.cursor = 'zoom-out';
                this.style.zIndex = '1000';
                isZoomed = true;
            } else {
                this.style.transform = 'scale(1)';
                this.style.cursor = 'zoom-in';
                this.style.zIndex = 'auto';
                isZoomed = false;
            }
        });

        mainImage.style.cursor = 'zoom-in';
 
        document.addEventListener('click', function(e) {
            if (isZoomed && !mainImage.contains(e.target)) {
                mainImage.style.transform = 'scale(1)';
                mainImage.style.cursor = 'zoom-in';
                mainImage.style.zIndex = 'auto';
                isZoomed = false;
            }
        });
    }

    const createMobileMenuToggle = () => {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
    
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #d69b40;
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
        `;
        
        navContainer.insertBefore(menuToggle, navLinks);

        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });

        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
            } else {
                menuToggle.style.display = 'none';
                navLinks.classList.remove('mobile-active');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileMenuToggle();

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
   
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
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });

    const priceElement = document.querySelector('.price');
    if (priceElement) {
        const price = priceElement.textContent;
        priceElement.style.opacity = '0';
        setTimeout(() => {
            priceElement.style.transition = 'opacity 0.5s ease';
            priceElement.style.opacity = '1';
        }, 300);
    }
    
    console.log('Seiko Black Field Watch Product Page Loaded Successfully');
    console.log('Features: Image Gallery, Zoom, Mobile Menu, Smooth Transitions, Cart Integration');
});

const createCheckoutModal = () => {
    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: #fff;
        margin: 5% auto;
        padding: 30px;
        border-radius: 15px;
        width: 90%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    modalContent.innerHTML = `
        <span id="close-modal" style="
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            line-height: 1;
            margin-top: -10px;
        ">&times;</span>
        <h2 style="color: #2b1d0e; margin-top: 0; margin-bottom: 20px;">Complete Your Purchase</h2>
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f5f0; border-radius: 8px; border-left: 4px solid #d69b40;">
            <h3 style="margin: 0 0 10px 0; color: #2b1d0e;">Seiko Black Field Watch (Vintage Look)</h3>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Model: SRPG35</p>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Condition: 9/10 (has a very small scratch)</p>
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #d69b40;">₱9,499</p>
        </div>
        <form id="checkout-form">
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Full Name:</label>
                <input type="text" name="fullName" required style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Email:</label>
                <input type="email" name="email" required style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Phone Number:</label>
                <input type="tel" name="phone" required style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Preferred Meetup Location:</label>
                <select name="meetupLocation" required style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                ">
                    <option value="">Select location...</option>
                    <option value="Angeles City">Angeles City</option>
                    <option value="San Fernando">San Fernando</option>
                    <option value="Clark">Clark</option>
                    <option value="Other Pampanga Area">Other Pampanga Area</option>
                    <option value="Courier (J&T)">Courier (J&T) - Nationwide 🇵🇭</option>
                    <option value="Courier (DHL)">Courier (DHL) - Worldwide ✈️ 🌎</option>
                </select>
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Shipping Address (if courier selected):</label>
                <textarea name="address" rows="3" placeholder="Required only if selecting courier option" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    resize: vertical;
                    box-sizing: border-box;
                "></textarea>
            </div>
            <div style="margin-bottom: 20px; padding: 10px; background-color: #e8f4f8; border-radius: 5px; font-size: 14px; color: #555;">
                <strong>Note:</strong> This is a pre-owned watch (9/10 condition with a very small scratch). 
                Includes: Watch, Original Nato Strap, After Market Leather Strap, Hang tag, Pin Bar tool, Actual Box, and Double Box.
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" id="cancel-checkout" style="
                    background-color: #ccc;
                    color: #666;
                    border: none;
                    padding: 12px 24px;
                    font-size: 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Cancel</button>
                <button type="submit" style="
                    background-color: #d69b40;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Submit Order</button>
            </div>
        </form>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    return modal;
};

let checkoutModal = null;

document.addEventListener('click', function(e) {
    if (e.target.id === 'close-modal' || e.target.id === 'cancel-checkout') {
        if (checkoutModal) {
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    if (e.target.id === 'checkout-modal') {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('submit', function(e) {
    if (e.target.id === 'checkout-form') {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const orderData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            meetupLocation: formData.get('meetupLocation'),
            address: formData.get('address'),
            product: 'Seiko Black Field Watch (Vintage Look)',
            model: 'SRPG35',
            condition: '9/10 (has a very small scratch)',
            price: '₱9,499'
        };
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            let locationText = orderData.meetupLocation;
            if (orderData.meetupLocation.includes('Courier')) {
                locationText = `${orderData.meetupLocation} to: ${orderData.address}`;
            }
            
            alert(`Thank you ${orderData.fullName}! Your order for the Seiko Black Field Watch has been received. We'll contact you shortly at ${orderData.email} to confirm payment details and arrange ${locationText.toLowerCase()}.`);
            
            e.target.reset();
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            console.log('Black Field Watch Order Data:', orderData);
        }, 2000);
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && checkoutModal && checkoutModal.style.display === 'block') {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
