// Customer-specific functionality

// DOM elements
let restaurantsSection, menuSection, cartSection, checkoutSection, trackingSection, historySection;
let restaurantsList, menuItems, cartItems, activeOrdersList, orderHistory;
let restaurantSearch, cuisineFilter, sortBy;
let cartCount, subtotal, total;

// Current state
let currentRestaurant = null;
let currentMenuItem = null;

// Initialize customer app
function initCustomerApp() {
    // Get DOM elements
    restaurantsSection = document.getElementById('restaurants-section');
    menuSection = document.getElementById('menu-section');
    cartSection = document.getElementById('cart-section');
    checkoutSection = document.getElementById('checkout-section');
    trackingSection = document.getElementById('tracking-section');
    historySection = document.getElementById('history-section');
    
    restaurantsList = document.getElementById('restaurants-list');
    menuItems = document.getElementById('menu-items');
    cartItems = document.getElementById('cart-items');
    activeOrdersList = document.getElementById('active-orders');
    orderHistory = document.getElementById('order-history');
    
    restaurantSearch = document.getElementById('restaurant-search');
    cuisineFilter = document.getElementById('cuisine-filter');
    sortBy = document.getElementById('sort-by');
    
    cartCount = document.getElementById('cart-count');
    subtotal = document.getElementById('subtotal');
    total = document.getElementById('total');
    
    // Set customer name
    document.getElementById('customer-name').textContent = currentUser.name;
    
    // Set delivery address
    document.getElementById('delivery-address').value = currentUser.address;
    
    // Event listeners
    setupCustomerEventListeners();
    
    // Load initial data
    loadRestaurants();
    loadCart();
    loadActiveOrders();
    loadOrderHistory();
}

// Set up event listeners for customer dashboard
function setupCustomerEventListeners() {
    // Navigation
    document.querySelectorAll('.customer-nav .nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showCustomerSection(section);
        });
    });
    
    // Restaurant search and filters
    restaurantSearch.addEventListener('input', filterRestaurants);
    cuisineFilter.addEventListener('change', filterRestaurants);
    sortBy.addEventListener('change', filterRestaurants);
    
    // Back to restaurants button
    document.getElementById('back-to-restaurants').addEventListener('click', function() {
        showCustomerSection('restaurants');
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        showCustomerSection('checkout');
    });
    
    // Checkout form
    document.getElementById('checkout-form').addEventListener('submit', placeOrder);
    
    // Modal close buttons
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Show specific section in customer dashboard
function showCustomerSection(section) {
    // Hide all sections
    document.querySelectorAll('#customer-dashboard .section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Update active nav button
    document.querySelectorAll('.customer-nav .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.add('active');
    document.querySelector(`.customer-nav .nav-btn[data-section="${section}"]`).classList.add('active');
    
    // Load section-specific data
    if (section === 'restaurants') {
        loadRestaurants();
    } else if (section === 'cart') {
        loadCart();
    } else if (section === 'tracking') {
        loadActiveOrders();
    } else if (section === 'history') {
        loadOrderHistory();
    }
}

// Load and display restaurants
function loadRestaurants() {
    restaurantsList.innerHTML = '';
    
    mockData.restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'card restaurant-card';
        restaurantCard.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p class="cuisine">${restaurant.cuisine} cuisine</p>
            <div class="restaurant-rating">
                <span class="rating-stars">${'★'.repeat(Math.floor(restaurant.rating))}${'☆'.repeat(5-Math.floor(restaurant.rating))}</span>
                <span>${restaurant.rating}</span>
            </div>
            <p class="delivery-time">${restaurant.deliveryTime}</p>
            <p class="restaurant-distance">${restaurant.distance}</p>
        `;
        
        restaurantCard.addEventListener('click', function() {
            showRestaurantMenu(restaurant);
        });
        
        restaurantsList.appendChild(restaurantCard);
    });
}

// Filter restaurants based on search and filters
function filterRestaurants() {
    const searchTerm = restaurantSearch.value.toLowerCase();
    const cuisine = cuisineFilter.value;
    const sort = sortBy.value;
    
    let filtered = mockData.restaurants.filter(restaurant => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm) || 
                             restaurant.cuisine.toLowerCase().includes(searchTerm);
        const matchesCuisine = !cuisine || restaurant.cuisine.toLowerCase() === cuisine;
        
        return matchesSearch && matchesCuisine;
    });
    
    // Sort results
    if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'distance') {
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (sort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Update display
    restaurantsList.innerHTML = '';
    filtered.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'card restaurant-card';
        restaurantCard.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p class="cuisine">${restaurant.cuisine} cuisine</p>
            <div class="restaurant-rating">
                <span class="rating-stars">${'★'.repeat(Math.floor(restaurant.rating))}${'☆'.repeat(5-Math.floor(restaurant.rating))}</span>
                <span>${restaurant.rating}</span>
            </div>
            <p class="delivery-time">${restaurant.deliveryTime}</p>
            <p class="restaurant-distance">${restaurant.distance}</p>
        `;
        
        restaurantCard.addEventListener('click', function() {
            showRestaurantMenu(restaurant);
        });
        
        restaurantsList.appendChild(restaurantCard);
    });
}

// Show menu for a specific restaurant
function showRestaurantMenu(restaurant) {
    currentRestaurant = restaurant;
    
    // Update restaurant details
    document.getElementById('restaurant-name').textContent = restaurant.name;
    document.getElementById('restaurant-info').textContent = 
        `${restaurant.cuisine} cuisine • ${restaurant.deliveryTime} • ${restaurant.distance}`;
    
    // Load menu items
    menuItems.innerHTML = '';
    restaurant.menu.forEach(item => {
        const menuItemCard = document.createElement('div');
        menuItemCard.className = 'card menu-item-card';
        menuItemCard.innerHTML = `
            <div class="menu-item-image" style="background-color: #e9ecef; display: flex; align-items: center; justify-content: center; color: #666;">
                Image
            </div>
            <div class="menu-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="menu-item-price">$${item.price.toFixed(2)}</p>
            </div>
        `;
        
        menuItemCard.addEventListener('click', function() {
            showItemCustomization(item);
        });
        
        menuItems.appendChild(menuItemCard);
    });
    
    // Show menu section
    showCustomerSection('menu');
}

// Show item customization modal
function showItemCustomization(item) {
    currentMenuItem = item;
    
    const modal = document.getElementById('item-customization-modal');
    const optionsContainer = document.getElementById('customization-options');
    
    optionsContainer.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
    `;
    
    if (item.customization) {
        item.customization.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'customization-option';
            optionDiv.innerHTML = `<h4>${option.name}${option.required ? ' *' : ''}</h4>`;
            
            option.options.forEach(choice => {
                const choiceDiv = document.createElement('div');
                choiceDiv.className = 'option-choice';
                
                if (option.required && option.options.length > 1) {
                    choiceDiv.innerHTML = `
                        <input type="radio" name="${option.name}" value="${choice}" ${option.options[0] === choice ? 'checked' : ''}>
                        <label>${choice}</label>
                    `;
                } else if (!option.required) {
                    choiceDiv.innerHTML = `
                        <input type="checkbox" name="${option.name}" value="${choice}">
                        <label>${choice}</label>
                    `;
                } else {
                    // If required but only one option, just show it
                    choiceDiv.innerHTML = `<label>${choice}</label>`;
                }
                
                optionDiv.appendChild(choiceDiv);
            });
            
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    // Add special instructions
    const instructionsDiv = document.createElement('div');
    instructionsDiv.className = 'customization-option';
    instructionsDiv.innerHTML = `
        <h4>Special Instructions</h4>
        <textarea class="special-instructions" placeholder="Any special requests?"></textarea>
    `;
    optionsContainer.appendChild(instructionsDiv);
    
    // Update add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.onclick = addToCart;
    
    modal.style.display = 'block';
}

// Add item to cart
function addToCart() {
    if (!currentMenuItem || !currentRestaurant) return;
    
    // Check if we're adding to a cart from a different restaurant
    if (cart.restaurantId && cart.restaurantId !== currentRestaurant.id) {
        if (!confirm('Your cart contains items from another restaurant. Adding this item will clear your current cart. Continue?')) {
            return;
        }
        cart.items = [];
        cart.restaurantId = currentRestaurant.id;
    } else if (!cart.restaurantId) {
        cart.restaurantId = currentRestaurant.id;
    }
    
    // Get customization options
    const customization = {};
    const specialInstructions = document.querySelector('.special-instructions').value;
    
    if (currentMenuItem.customization) {
        currentMenuItem.customization.forEach(option => {
            if (option.required && option.options.length > 1) {
                const selected = document.querySelector(`input[name="${option.name}"]:checked`);
                if (selected) {
                    customization[option.name] = selected.value;
                }
            } else if (!option.required) {
                const selected = document.querySelectorAll(`input[name="${option.name}"]:checked`);
                if (selected.length > 0) {
                    customization[option.name] = Array.from(selected).map(input => input.value);
                }
            } else if (option.required && option.options.length === 1) {
                customization[option.name] = option.options[0];
            }
        });
    }
    
    // Add item to cart
    const cartItem = {
        menuItemId: currentMenuItem.id,
        name: currentMenuItem.name,
        price: currentMenuItem.price,
        quantity: 1,
        customization: customization,
        specialInstructions: specialInstructions
    };
    
    cart.items.push(cartItem);
    updateCart();
    
    // Close modal
    document.getElementById('item-customization-modal').style.display = 'none';
    
    // Show confirmation
    alert(`${currentMenuItem.name} added to cart!`);
}

// Update cart display and totals
function updateCart() {
    // Calculate totals
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.total = cart.subtotal + cart.deliveryFee;
    
    // Update UI
    cartCount.textContent = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    subtotal.textContent = cart.subtotal.toFixed(2);
    total.textContent = cart.total.toFixed(2);
    
    // Enable/disable checkout button
    document.getElementById('checkout-btn').disabled = cart.items.length === 0;
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    // Display cart items
    cartItems.innerHTML = '';
    
    if (cart.items.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cart.items.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                ${item.specialInstructions ? `<p><em>Special instructions: ${item.specialInstructions}</em></p>` : ''}
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItemDiv);
    });
    
    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (cart.items[index].quantity > 1) {
                cart.items[index].quantity--;
            } else {
                cart.items.splice(index, 1);
            }
            updateCart();
            loadCart(); // Refresh display
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.items[index].quantity++;
            updateCart();
            loadCart(); // Refresh display
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.items.splice(index, 1);
            updateCart();
            loadCart(); // Refresh display
        });
    });
}

// Place order
function placeOrder(e) {
    e.preventDefault();
    
    if (cart.items.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // Create new order
    const newOrder = {
        id: Math.max(...mockData.orders.map(o => o.id)) + 1,
        customerId: currentUser.id,
        restaurantId: cart.restaurantId,
        driverId: null,
        items: cart.items,
        total: cart.total,
        status: 'pending',
        orderTime: new Date().toISOString(),
        deliveryAddress: document.getElementById('delivery-address').value
    };
    
    // Add to orders
    mockData.orders.push(newOrder);
    
    // Add to customer's orders
    currentUser.orders.push(newOrder.id);
    
    // Add to active orders for tracking
    activeOrders.push(newOrder.id);
    
    // Clear cart
    cart = {
        restaurantId: null,
        items: [],
        subtotal: 0,
        deliveryFee: 2.99,
        total: 0
    };
    updateCart();
    localStorage.removeItem('cart');
    
    // Show confirmation
    alert('Order placed successfully! You can track your order in the Order Tracking section.');
    
    // Go to tracking section
    showCustomerSection('tracking');
}

// Load active orders for tracking
function loadActiveOrders() {
    activeOrdersList.innerHTML = '';
    
    const userActiveOrders = mockData.orders.filter(order => 
        order.customerId === currentUser.id && 
        order.status !== 'delivered' && 
        order.status !== 'cancelled'
    );
    
    if (userActiveOrders.length === 0) {
        activeOrdersList.innerHTML = '<p>No active orders</p>';
        return;
    }
    
    userActiveOrders.forEach(order => {
        const restaurant = mockData.restaurants.find(r => r.id === order.restaurantId);
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-status';
        orderDiv.innerHTML = `
            <h3>Order #${order.id} - ${restaurant.name}</h3>
            <p>Status: <strong>${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</strong></p>
            <p>Total: $${order.total.toFixed(2)}</p>
            <p>Ordered: ${new Date(order.orderTime).toLocaleString()}</p>
            
            <div class="tracking-map">
                Order Tracking Map Would Appear Here
            </div>
            
            <div class="status-timeline">
                <div class="status-step ${['pending', 'accepted', 'preparing', 'ready', 'picked-up', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}">
                    <div class="status-dot">1</div>
                    <span>Order Placed</span>
                </div>
                <div class="status-step ${['accepted', 'preparing', 'ready', 'picked-up', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}">
                    <div class="status-dot">2</div>
                    <span>Preparing</span>
                </div>
                <div class="status-step ${['ready', 'picked-up', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}">
                    <div class="status-dot">3</div>
                    <span>Ready</span>
                </div>
                <div class="status-step ${['picked-up', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}">
                    <div class="status-dot">4</div>
                    <span>Picked Up</span>
                </div>
                <div class="status-step ${order.status === 'delivered' ? 'active' : ''}">
                    <div class="status-dot">5</div>
                    <span>Delivered</span>
                </div>
            </div>
        `;
        
        activeOrdersList.appendChild(orderDiv);
    });
}

// Load order history
function loadOrderHistory() {
    orderHistory.innerHTML = '';
    
    const userOrders = mockData.orders.filter(order => 
        order.customerId === currentUser.id && 
        (order.status === 'delivered' || order.status === 'cancelled')
    ).sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
    
    if (userOrders.length === 0) {
        orderHistory.innerHTML = '<p>No order history</p>';
        return;
    }
    
    userOrders.forEach(order => {
        const restaurant = mockData.restaurants.find(r => r.id === order.restaurantId);
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-history-item';
        orderDiv.innerHTML = `
            <div class="order-history-header">
                <span class="order-history-restaurant">${restaurant.name}</span>
                <span class="order-history-date">${new Date(order.orderTime).toLocaleDateString()}</span>
            </div>
            <div class="order-history-items">
                ${order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
            </div>
            <div class="order-history-total">$${order.total.toFixed(2)}</div>
            <div class="order-status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
            ${order.status === 'delivered' ? `<button class="reorder-btn" data-order="${order.id}">Reorder</button>` : ''}
        `;
        
        orderHistory.appendChild(orderDiv);
    });
    
    // Add reorder event listeners
    document.querySelectorAll('.reorder-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order'));
            reorder(orderId);
        });
    });
}

// Reorder a previous order
function reorder(orderId) {
    const order = mockData.orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Check if we're adding to a cart from a different restaurant
    if (cart.restaurantId && cart.restaurantId !== order.restaurantId) {
        if (!confirm('Your cart contains items from another restaurant. Adding this order will clear your current cart. Continue?')) {
            return;
        }
        cart.items = [];
        cart.restaurantId = order.restaurantId;
    } else if (!cart.restaurantId) {
        cart.restaurantId = order.restaurantId;
    }
    
    // Add items to cart
    order.items.forEach(item => {
        cart.items.push({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            customization: item.customization || {},
            specialInstructions: item.specialInstructions || ''
        });
    });
    
    updateCart();
    alert('Order added to cart!');
    showCustomerSection('cart');
}
