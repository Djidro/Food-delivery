// Admin-specific functionality

// DOM elements
let userManagementSection, orderOverviewSection, analyticsSection, supportSection, settingsSection;
let customersList, restaurantsListAdmin, driversList, allOrders, supportTickets;

// Initialize admin app
function initAdminApp() {
    // Get DOM elements
    userManagementSection = document.getElementById('user-management-section');
    orderOverviewSection = document.getElementById('order-overview-section');
    analyticsSection = document.getElementById('analytics-section');
    supportSection = document.getElementById('support-section');
    settingsSection = document.getElementById('settings-section');
    
    customersList = document.getElementById('customers-list');
    restaurantsListAdmin = document.getElementById('restaurants-list-admin');
    driversList = document.getElementById('drivers-list');
    allOrders = document.getElementById('all-orders');
    supportTickets = document.getElementById('support-tickets');
    
    // Event listeners
    setupAdminEventListeners();
    
    // Load initial data
    loadUserManagement();
    loadOrderOverview();
    loadSupportTickets();
}

// Set up event listeners for admin dashboard
function setupAdminEventListeners() {
    // Navigation
    document.querySelectorAll('.admin-nav .nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showAdminSection(section);
        });
    });
    
    // User management tabs
    document.querySelectorAll('.user-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const userType = this.getAttribute('data-user-type');
            showUserType(userType);
        });
    });
    
    // System settings form
    document.getElementById('system-settings').addEventListener('submit', saveSystemSettings);
}

// Show specific section in admin dashboard
function showAdminSection(section) {
    // Hide all sections
    document.querySelectorAll('#admin-dashboard .section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Update active nav button
    document.querySelectorAll('.admin-nav .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.add('active');
    document.querySelector(`.admin-nav .nav-btn[data-section="${section}"]`).classList.add('active');
}

// Show specific user type in user management
function showUserType(userType) {
    // Hide all user lists
    document.querySelectorAll('.user-list').forEach(list => {
        list.classList.add('hidden');
    });
    
    // Update active tab
    document.querySelectorAll('.user-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected user type
    document.getElementById(`${userType}-list`).classList.remove('hidden');
    document.querySelector(`.user-tab[data-user-type="${userType}"]`).classList.add('active');
}

// Load and display user management data
function loadUserManagement() {
    // Load customers
    customersList.innerHTML = '';
    mockData.customers.forEach(customer => {
        const customerDiv = document.createElement('div');
        customerDiv.className = 'user-item';
        customerDiv.innerHTML = `
            <div class="user-info">
                <div class="user-name">${customer.name}</div>
                <div class="user-email">${customer.email}</div>
                <div class="user-phone">${customer.phone}</div>
            </div>
            <div class="user-actions">
                <button class="view-btn">View</button>
                <button class="suspend-btn">Suspend</button>
            </div>
        `;
        customersList.appendChild(customerDiv);
    });
    
    // Load restaurants
    restaurantsListAdmin.innerHTML = '';
    mockData.restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.className = 'user-item';
        restaurantDiv.innerHTML = `
            <div class="user-info">
                <div class="user-name">${restaurant.name}</div>
                <div class="user-email">${restaurant.cuisine} cuisine</div>
                <div class="user-phone">${restaurant.address}</div>
            </div>
            <div class="user-actions">
                <button class="view-btn">View</button>
                <button class="approve-btn">Approve</button>
                <button class="suspend-btn">Suspend</button>
            </div>
        `;
        restaurantsListAdmin.appendChild(restaurantDiv);
    });
    
    // Load drivers
    driversList.innerHTML = '';
    mockData.drivers.forEach(driver => {
        const driverDiv = document.createElement('div');
        driverDiv.className = 'user-item';
        driverDiv.innerHTML = `
            <div class="user-info">
                <div class="user-name">${driver.name}</div>
                <div class="user-email">${driver.email}</div>
                <div class="user-phone">${driver.vehicle} - ${driver.license}</div>
            </div>
            <div class="user-actions">
                <button class="view-btn">View</button>
                <button class="approve-btn">Approve</button>
                <button class="suspend-btn">Suspend</button>
            </div>
        `;
        driversList.appendChild(driverDiv);
    });
}

// Load and display order overview
function loadOrderOverview() {
    allOrders.innerHTML = '';
    
    // Sort orders by most recent first
    const sortedOrders = [...mockData.orders].sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
    
    sortedOrders.forEach(order => {
        const restaurant = mockData.restaurants.find(r => r.id === order.restaurantId);
        const customer = mockData.customers.find(c => c.id === order.customerId);
        const driver = order.driverId ? mockData.drivers.find(d => d.id === order.driverId) : null;
        
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item-admin';
        orderDiv.innerHTML = `
            <div class="order-header-admin">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-time">${new Date(order.orderTime).toLocaleString()}</span>
            </div>
            <div class="order-details">
                <p><strong>Restaurant:</strong> ${restaurant.name}</p>
                <p><strong>Customer:</strong> ${customer.name}</p>
                ${driver ? `<p><strong>Driver:</strong> ${driver.name}</p>` : ''}
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            </div>
            <div class="order-status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
        `;
        
        allOrders.appendChild(orderDiv);
    });
}

// Load and display support tickets
function loadSupportTickets() {
    supportTickets.innerHTML = '';
    
    mockData.supportTickets.forEach(ticket => {
        const customer = mockData.customers.find(c => c.id === ticket.customerId);
        
        const ticketDiv = document.createElement('div');
        ticketDiv.className = 'support-ticket';
        ticketDiv.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-id">Ticket #${ticket.id}</span>
                <span class="ticket-status status-${ticket.status}">${ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</span>
            </div>
            <div class="ticket-customer">
                <strong>Customer:</strong> ${customer.name}
            </div>
            <div class="ticket-subject">
                <strong>Subject:</strong> ${ticket.subject}
            </div>
            <div class="ticket-description">
                ${ticket.description}
            </div>
            <div class="ticket-info">
                <strong>Created:</strong> ${new Date(ticket.createdAt).toLocaleString()}
                ${ticket.assignedTo ? ` • <strong>Assigned to:</strong> ${ticket.assignedTo}` : ''}
            </div>
            <div class="ticket-actions">
                <button class="assign-btn">Assign to Me</button>
                <button class="resolve-btn">Mark as Resolved</button>
            </div>
        `;
        
        supportTickets.appendChild(ticketDiv);
    });
}

// Save system settings
function saveSystemSettings(e) {
    e.preventDefault();
    
    const deliveryFee = document.getElementById('delivery-fee-setting').value;
    const serviceFee = document.getElementById('service-fee').value;
    const taxRate = document.getElementById('tax-rate').value;
    
    // In a real app, this would save to a database
    alert('System settings saved successfully!');
}
