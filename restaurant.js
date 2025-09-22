// Restaurant-specific functionality

// DOM elements
let ordersSection, menuSectionRestaurant, analyticsSection;
let ordersList, menuItemsRestaurant;

// Initialize restaurant app
function initRestaurantApp() {
    // Get DOM elements
    ordersSection = document.getElementById('orders-section');
    menuSectionRestaurant = document.getElementById('menu-section-restaurant');
    analyticsSection = document.getElementById('restaurant-analytics-section');
    
    ordersList = document.getElementById('orders-list');
    menuItemsRestaurant = document.getElementById('menu-items-restaurant');
    
    // Set restaurant name
    document.getElementById('restaurant-account-name').textContent = currentUser.name;
    
    // Event listeners
    setupRestaurantEventListeners();
    
    // Load initial data
    loadRestaurantOrders();
    loadRestaurantMenu();
}

// Set up event listeners for restaurant dashboard
function setupRestaurantEventListeners() {
    // Navigation
    document.querySelectorAll('.restaurant-nav .nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showRestaurantSection(section);
        });
    });
    
    // Add menu item button
    document.getElementById('add-menu-item').addEventListener('click', showAddMenuItemForm);
}

// Show specific section in restaurant dashboard
function showRestaurantSection(section) {
    // Hide all sections
    document.querySelectorAll('#restaurant-dashboard .section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Update active nav button
    document.querySelectorAll('.restaurant-nav .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.add('active');
    document.querySelector(`.restaurant-nav .nav-btn[data-section="${section}"]`).classList.add('active');
}

// Load and display restaurant orders
function loadRestaurantOrders() {
    ordersList.innerHTML = '';
    
    // For demo, we'll show all orders for the first restaurant
    const restaurantOrders = mockData.orders.filter(order => order.restaurantId === 1);
    
    if (restaurantOrders.length === 0) {
        ordersList.innerHTML = '<p>No orders yet</p>';
        return;
    }
    
    // Sort by most recent first
    restaurantOrders.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
    
    restaurantOrders.forEach(order => {
        const customer = mockData.customers.find(c => c.id === order.customerId);
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';
        orderDiv.innerHTML = `
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-time">${new Date(order.orderTime).toLocaleString()}</span>
            </div>
            <div class="order-customer">
                <strong>Customer:</strong> ${customer.name} - ${customer.phone}
            </div>
            <div class="order-address">
                <strong>Delivery to:</strong> ${order.deliveryAddress}
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <strong>Total: $${order.total.toFixed(2)}</strong>
            </div>
            <div class="order-status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
            ${order.status === 'pending' ? `
                <div class="order-actions">
                    <button class="accept-btn" data-order="${order.id}">Accept Order</button>
                    <button class="decline-btn" data-order="${order.id}">Decline Order</button>
                </div>
            ` : ''}
            ${['accepted', 'preparing'].includes(order.status) ? `
                <div class="status-updates">
                    <button class="status-btn preparing" data-order="${order.id}" data-status="preparing">Mark as Preparing</button>
                    <button class="status-btn ready" data-order="${order.id}" data-status="ready">Mark as Ready</button>
                </div>
            ` : ''}
            ${order.status === 'ready' ? `
                <div class="status-updates">
                    <button class="status-btn completed" data-order="${order.id}" data-status="completed">Mark as Completed</button>
                </div>
            ` : ''}
        `;
        
        ordersList.appendChild(orderDiv);
    });
    
    // Add event listeners for order actions
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order'));
            updateOrderStatus(orderId, 'accepted');
        });
    });
    
    document.querySelectorAll('.decline-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order'));
            updateOrderStatus(orderId, 'declined');
        });
    });
    
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order'));
            const status = this.getAttribute('data-status');
            updateOrderStatus(orderId, status);
        });
    });
}

// Update order status
function updateOrderStatus(orderId, status) {
    const order = mockData.orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        
        // If marking as ready, assign a driver (for demo)
        if (status === 'ready') {
            const availableDriver = mockData.drivers.find(d => d.status === 'available');
            if (availableDriver) {
                order.driverId = availableDriver.id;
                availableDriver.status = 'busy';
                availableDriver.currentOrder = orderId;
            }
        }
        
        loadRestaurantOrders();
        alert(`Order status updated to ${status}`);
    }
}

// Load and display restaurant menu
function loadRestaurantMenu() {
    menuItemsRestaurant.innerHTML = '';
    
    // For demo, we'll use the first restaurant's menu
    const restaurant = mockData.restaurants[0];
    
    restaurant.menu.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item-management';
        menuItemDiv.innerHTML = `
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="menu-item-actions">
                <button class="edit-btn" data-item="${item.id}">Edit</button>
                <button class="delete-btn" data-item="${item.id}">Delete</button>
            </div>
        `;
        
        menuItemsRestaurant.appendChild(menuItemDiv);
    });
    
    // Add event listeners for menu actions
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item'));
            editMenuItem(itemId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-item'));
            deleteMenuItem(itemId);
        });
    });
}

// Show add menu item form
function showAddMenuItemForm() {
    // In a real app, this would show a form modal
    alert('Add menu item functionality would appear here');
}

// Edit menu item
function editMenuItem(itemId) {
    // In a real app, this would show an edit form
    alert(`Edit menu item ${itemId} functionality would appear here`);
}

// Delete menu item
function deleteMenuItem(itemId) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        // In a real app, this would make an API call
        alert(`Menu item ${itemId} would be deleted`);
        loadRestaurantMenu(); // Refresh the list
    }
}
