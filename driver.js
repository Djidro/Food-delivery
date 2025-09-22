// Driver-specific functionality

// DOM elements
let availableOrdersSection, currentDeliverySection, historySection;
let deliveryRequests, deliveryDetails, deliveryHistory;

// Initialize driver app
function initDriverApp() {
    // Get DOM elements
    availableOrdersSection = document.getElementById('available-orders-section');
    currentDeliverySection = document.getElementById('current-delivery-section');
    historySection = document.getElementById('driver-history-section');
    
    deliveryRequests = document.getElementById('delivery-requests');
    deliveryDetails = document.getElementById('delivery-details');
    deliveryHistory = document.getElementById('delivery-history');
    
    // Set driver name
    document.getElementById('driver-name').textContent = currentUser.name;
    
    // Event listeners
    setupDriverEventListeners();
    
    // Load initial data
    loadAvailableDeliveries();
    loadCurrentDelivery();
    loadDriverHistory();
}

// Set up event listeners for driver dashboard
function setupDriverEventListeners() {
    // Navigation
    document.querySelectorAll('.driver-nav .nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showDriverSection(section);
        });
    });
    
    // Delivery action buttons
    document.getElementById('picked-up-btn').addEventListener('click', markAsPickedUp);
    document.getElementById('delivered-btn').addEventListener('click', markAsDelivered);
}

// Show specific section in driver dashboard
function showDriverSection(section) {
    // Hide all sections
    document.querySelectorAll('#driver-dashboard .section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Update active nav button
    document.querySelectorAll('.driver-nav .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.add('active');
    document.querySelector(`.driver-nav .nav-btn[data-section="${section}"]`).classList.add('active');
}

// Load and display available delivery requests
function loadAvailableDeliveries() {
    deliveryRequests.innerHTML = '';
    
    // Find orders that are ready for pickup but not yet assigned
    const availableOrders = mockData.orders.filter(order => 
        order.status === 'ready' && order.driverId === null
    );
    
    if (availableOrders.length === 0) {
        deliveryRequests.innerHTML = '<p>No available delivery requests</p>';
        return;
    }
    
    availableOrders.forEach(order => {
        const restaurant = mockData.restaurants.find(r => r.id === order.restaurantId);
        const customer = mockData.customers.find(c => c.id === order.customerId);
        
        const deliveryDiv = document.createElement('div');
        deliveryDiv.className = 'delivery-request';
        deliveryDiv.innerHTML = `
            <h3>Order #${order.id}</h3>
            <div class="delivery-info">
                <div class="restaurant-location">
                    <h4>Pickup from:</h4>
                    <p>${restaurant.name}</p>
                    <p>${restaurant.address}</p>
                </div>
                <div class="customer-location">
                    <h4>Deliver to:</h4>
                    <p>${customer.name}</p>
                    <p>${order.deliveryAddress}</p>
                </div>
            </div>
            <div class="delivery-distance">
                Estimated distance: 2.5 miles
            </div>
            <div class="delivery-earnings">
                Earnings: $${(order.total * 0.15).toFixed(2)}
            </div>
            <div class="delivery-actions">
                <button class="accept-delivery-btn" data-order="${order.id}">Accept Delivery</button>
                <button class="decline-delivery-btn" data-order="${order.id}">Decline</button>
            </div>
        `;
        
        deliveryRequests.appendChild(deliveryDiv);
    });
    
    // Add event listeners for delivery actions
    document.querySelectorAll('.accept-delivery-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order'));
            acceptDelivery(orderId);
        });
    });
    
    document.querySelectorAll('.decline-delivery-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order'));
            declineDelivery(orderId);
        });
    });
}

// Accept a delivery request
function acceptDelivery(orderId) {
    const order = mockData.orders.find(o => o.id === orderId);
    if (order) {
        order.driverId = currentUser.id;
        order.status = 'picked-up';
        
        // Update driver status
        const driver = mockData.drivers.find(d => d.id === currentUser.id);
        if (driver) {
            driver.status = 'busy';
            driver.currentOrder = orderId;
        }
        
        alert('Delivery accepted!');
        loadAvailableDeliveries();
        loadCurrentDelivery();
        showDriverSection('current-delivery');
    }
}

// Decline a delivery request
function declineDelivery(orderId) {
    if (confirm('Are you sure you want to decline this delivery?')) {
        // In a real app, this would notify the system to assign another driver
        alert('Delivery declined');
        loadAvailableDeliveries();
    }
}

// Load and display current delivery
function loadCurrentDelivery() {
    deliveryDetails.innerHTML = '';
    
    // Find current delivery for this driver
    const currentOrder = mockData.orders.find(order => 
        order.driverId === currentUser.id && 
        ['picked-up', 'out-for-delivery'].includes(order.status)
    );
    
    if (!currentOrder) {
        deliveryDetails.innerHTML = '<p>No active delivery</p>';
        
        // Hide action buttons if no active delivery
        document.querySelector('.delivery-actions').style.display = 'none';
        return;
    }
    
    // Show action buttons
    document.querySelector('.delivery-actions').style.display = 'flex';
    
    const restaurant = mockData.restaurants.find(r => r.id === currentOrder.restaurantId);
    const customer = mockData.customers.find(c => c.id === currentOrder.customerId);
    
    deliveryDetails.innerHTML = `
        <h3>Order #${currentOrder.id}</h3>
        <div class="delivery-map">
            Delivery Map Would Appear Here
        </div>
        <div class="delivery-info">
            <div class="restaurant-location">
                <h4>Pickup from:</h4>
                <p>${restaurant.name}</p>
                <p>${restaurant.address}</p>
            </div>
            <div class="customer-location">
                <h4>Deliver to:</h4>
                <p>${customer.name}</p>
                <p>${currentOrder.deliveryAddress}</p>
            </div>
        </div>
        <div class="delivery-contacts">
            <div class="contact-card">
                <div class="contact-name">Restaurant</div>
                <div class="contact-phone">(555) 123-4567</div>
            </div>
            <div class="contact-card">
                <div class="contact-name">Customer</div>
                <div class="contact-phone">${customer.phone}</div>
            </div>
        </div>
        <div class="order-items">
            <h4>Order Items:</h4>
            ${currentOrder.items.map(item => `
                <div class="order-item">
                    <span>${item.quantity}x ${item.name}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Mark order as picked up
function markAsPickedUp() {
    const currentOrder = mockData.orders.find(order => 
        order.driverId === currentUser.id && 
        order.status === 'picked-up'
    );
    
    if (currentOrder) {
        currentOrder.status = 'out-for-delivery';
        alert('Order marked as picked up');
        loadCurrentDelivery();
    }
}

// Mark order as delivered
function markAsDelivered() {
    const currentOrder = mockData.orders.find(order => 
        order.driverId === currentUser.id && 
        order.status === 'out-for-delivery'
    );
    
    if (currentOrder) {
        currentOrder.status = 'delivered';
        
        // Update driver status
        const driver = mockData.drivers.find(d => d.id === currentUser.id);
        if (driver) {
            driver.status = 'available';
            driver.currentOrder = null;
            driver.completedOrders.push(currentOrder.id);
        }
        
        alert('Order marked as delivered');
        loadCurrentDelivery();
        loadDriverHistory();
        showDriverSection('available-orders');
    }
}

// Load driver delivery history
function loadDriverHistory() {
    deliveryHistory.innerHTML = '';
    
    // Find completed deliveries for this driver
    const completedDeliveries = mockData.orders.filter(order => 
        order.driverId === currentUser.id && 
        order.status === 'delivered'
    ).sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
    
    if (completedDeliveries.length === 0) {
        deliveryHistory.innerHTML = '<p>No delivery history</p>';
        return;
    }
    
    completedDeliveries.forEach(order => {
        const restaurant = mockData.restaurants.find(r => r.id === order.restaurantId);
        const deliveryDiv = document.createElement('div');
        deliveryDiv.className = 'delivery-history-item';
        deliveryDiv.innerHTML = `
            <div class="delivery-history-header">
                <span class="delivery-restaurant">${restaurant.name}</span>
                <span class="delivery-date">${new Date(order.orderTime).toLocaleDateString()}</span>
            </div>
            <div class="delivery-address">
                ${order.deliveryAddress}
            </div>
            <div class="delivery-earnings">
                Earnings: $${(order.total * 0.15).toFixed(2)}
            </div>
        `;
        
        deliveryHistory.appendChild(deliveryDiv);
    });
}
