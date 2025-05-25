// TimeHaven Product Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Product card hover effects and animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Add subtle animation on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Price filtering functionality
    function createPriceFilter() {
        const heroSection = document.querySelector('.hero');
        const filterContainer = document.createElement('div');
        filterContainer.className = 'price-filter';
        filterContainer.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <label for="price-range" style="color: #d69b40; font-weight: bold; margin-right: 10px;">Filter by Price Range:</label>
                <select id="price-range" style="padding: 8px; border-radius: 5px; border: 2px solid #d69b40;">
                    <option value="all">All Prices</option>
                    <option value="under-10k">Under ₱10,000</option>
                    <option value="10k-15k">₱10,000 - ₱15,000</option>
                    <option value="above-15k">Above ₱15,000</option>
                </select>
            </div>
        `;
        heroSection.appendChild(filterContainer);

        // Filter functionality
        const priceSelect = document.getElementById('price-range');
        priceSelect.addEventListener('change', function() {
            const selectedRange = this.value;
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const priceText = product.querySelector('p').textContent;
                const price = parseInt(priceText.replace(/[₱,]/g, ''));
                let showProduct = true;

                switch(selectedRange) {
                    case 'under-10k':
                        showProduct = price < 10000;
                        break;
                    case '10k-15k':
                        showProduct = price >= 10000 && price <= 15000;
                        break;
                    case 'above-15k':
                        showProduct = price > 15000;
                        break;
                    case 'all':
                    default:
                        showProduct = true;
                        break;
                }

                if (showProduct) {
                    product.style.display = 'block';
                    product.style.animation = 'fadeIn 0.5s ease';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // Table sorting functionality
    function addTableSorting() {
        const table = document.querySelector('.comparison-table');
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            if (index === 0) return; // Skip model name column
            
            header.style.cursor = 'pointer';
            header.style.userSelect = 'none';
            header.title = 'Click to sort';
            
            // Add sorting indicator
            header.innerHTML += ' <span class="sort-indicator">↕</span>';
            
            header.addEventListener('click', function() {
                sortTable(table, index);
                
                // Update sort indicators
                headers.forEach(h => {
                    const indicator = h.querySelector('.sort-indicator');
                    if (indicator) indicator.textContent = '↕';
                });
                
                const currentIndicator = this.querySelector('.sort-indicator');
                currentIndicator.textContent = this.dataset.sortDirection === 'asc' ? '↑' : '↓';
            });
        });
    }

    function sortTable(table, columnIndex) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const header = table.querySelectorAll('th')[columnIndex];
        
        // Determine sort direction
        const isAsc = header.dataset.sortDirection !== 'asc';
        header.dataset.sortDirection = isAsc ? 'asc' : 'desc';
        
        // Sort rows
        rows.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim();
            const bText = b.cells[columnIndex].textContent.trim();
            
            // Handle price column (contains ₱)
            if (aText.includes('₱')) {
                const aPrice = parseFloat(aText.replace(/[₱,]/g, ''));
                const bPrice = parseFloat(bText.replace(/[₱,]/g, ''));
                return isAsc ? aPrice - bPrice : bPrice - aPrice;
            }
            
            // Handle numeric values (like diameter)
            const aNum = parseFloat(aText);
            const bNum = parseFloat(bText);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return isAsc ? aNum - bNum : bNum - aNum;
            }
            
            // Handle text
            return isAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        
        // Re-append sorted rows
        rows.forEach(row => tbody.appendChild(row));
        
        // Add animation
        rows.forEach((row, index) => {
            row.style.animation = `slideIn 0.3s ease ${index * 0.05}s both`;
        });
    }

    // Search functionality
    function createSearchFeature() {
        const heroSection = document.querySelector('.hero');
        const searchContainer = document.createElement('div');
        searchContainer.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <input type="text" id="watch-search" placeholder="Search watches..." 
                       style="padding: 10px; border-radius: 5px; border: 2px solid #d69b40; width: 300px; max-width: 90%;">
            </div>
        `;
        heroSection.appendChild(searchContainer);

        const searchInput = document.getElementById('watch-search');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const isMatch = title.includes(searchTerm);
                
                if (isMatch || searchTerm === '') {
                    product.style.display = 'block';
                    product.style.animation = 'fadeIn 0.3s ease';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // Add CSS animations
    function addAnimationStyles() {
        if (!document.getElementById('dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .product-card {
                    transition: all 0.3s ease;
                }
                
                .comparison-table th:hover {
                    background-color: #a05d02;
                    transition: background-color 0.3s ease;
                }
                
                .sort-indicator {
                    font-size: 12px;
                    margin-left: 5px;
                }
                
                .price-filter select:focus,
                #watch-search:focus {
                    outline: none;
                    box-shadow: 0 0 10px rgba(214, 155, 64, 0.5);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mobile menu toggle (if needed for responsive design)
    function addMobileMenuToggle() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #d69b40;
            font-size: 24px;
            cursor: pointer;
        `;
        
        navContainer.appendChild(mobileMenuBtn);
        
        // Add mobile styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: #2b1d0e;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                
                .nav-links.active {
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        // Toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize all features
    addAnimationStyles();
    createSearchFeature();
    createPriceFilter();
    addTableSorting();
    addMobileMenuToggle();

    // Add scroll-to-top functionality
    function addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #d69b40;
            color: #2b1d0e;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        // Scroll to top functionality
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    addScrollToTop();

    // Page load animation for product cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeIn 0.6s ease ${index * 0.1}s both`;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    });

    productCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    console.log('TimeHaven Product Page JavaScript loaded successfully!');
});