// Main application controller

// DOM elements
const loginScreen = document.getElementById('login-screen');
const customerDashboard = document.getElementById('customer-dashboard');
const restaurantDashboard = document.getElementById('restaurant-dashboard');
const driverDashboard = document.getElementById('driver-dashboard');
const adminDashboard = document.getElementById('admin-dashboard');

const userTypeButtons = document.querySelectorAll('.user-type-btn');
const loginForms = document.querySelectorAll('.login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

const loginForm = document.getElementById('login-form');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // User type selection
    userTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userType = this.getAttribute('data-type');
            
            // Update active button
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding login form
            loginForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${userType}-login`).classList.add('active');
        });
    });
    
    // Show registration form
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });
    
    // Show login form
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Registration form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });
    
    // Logout buttons
    document.getElementById('customer-logout').addEventListener('click', logout);
    document.getElementById('restaurant-logout').addEventListener('click', logout);
    document.getElementById('driver-logout').addEventListener('click', logout);
    document.getElementById('admin-logout').addEventListener('click', logout);
    
    // Initialize the app
    initApp();
});

// Initialize the application
function initApp() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    const savedUserType = localStorage.getItem('currentUserType');
    
    if (savedUser && savedUserType) {
        currentUser = JSON.parse(savedUser);
        currentUserType = savedUserType;
        showDashboard(currentUserType);
    } else {
        showLoginScreen();
    }
}

// Handle login
function handleLogin() {
    const activeLoginForm = document.querySelector('.login-form.active');
    const email = activeLoginForm.querySelector('input[type="email"]').value;
    const password = activeLoginForm.querySelector('input[type="password"]').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // Determine user type
    const userType = document.querySelector('.user-type-btn.active').getAttribute('data-type');
    
    // Mock authentication - in a real app, this would be an API call
    if (authenticateUser(email, password, userType)) {
        currentUserType = userType;
        showDashboard(userType);
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('currentUserType', currentUserType);
    } else {
        alert('Invalid email or password');
    }
}

// Handle registration
function handleRegistration() {
    const name = registerForm.querySelector('input[type="text"]').value;
    const phone = registerForm.querySelector('input[type="tel"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const address = registerForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !phone || !email || !password || !address) {
        alert('Please fill in all fields');
        return;
    }
    
    // Mock registration - in a real app, this would be an API call
    const newCustomer = {
        id: mockData.customers.length + 1,
        name: name,
        email: email,
        phone: phone,
        address: address,
        orders: []
    };
    
    mockData.customers.push(newCustomer);
    currentUser = newCustomer;
    currentUserType = 'customer';
    
    showDashboard('customer');
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('currentUserType', currentUserType);
    
    alert('Registration successful! You are now logged in.');
}

// Mock authentication function
function authenticateUser(email, password, userType) {
    // In a real app, this would be an API call to verify credentials
    // For this demo, we'll use simple mock authentication
    
    if (userType === 'customer') {
        const customer = mockData.customers.find(c => c.email === email);
        if (customer) {
            currentUser = customer;
            return true;
        }
    } else if (userType === 'restaurant') {
        // For demo purposes, any restaurant login will work
        currentUser = {
            id: 1,
            name: "Pizza Palace",
            email: email
        };
        return true;
    } else if (userType === 'driver') {
        // For demo purposes, any driver login will work
        currentUser = {
            id: 1,
            name: "Mike Driver",
            email: email
        };
        return true;
    } else if (userType === 'admin') {
        // For demo purposes, any admin login will work
        currentUser = {
            id: 1,
            name: "Admin User",
            email: email
        };
        return true;
    }
    
    return false;
}

// Show the appropriate dashboard based on user type
function showDashboard(userType) {
    hideAllScreens();
    
    if (userType === 'customer') {
        customerDashboard.classList.add('active');
        initCustomerDashboard();
    } else if (userType === 'restaurant') {
        restaurantDashboard.classList.add('active');
        initRestaurantDashboard();
    } else if (userType === 'driver') {
        driverDashboard.classList.add('active');
        initDriverDashboard();
    } else if (userType === 'admin') {
        adminDashboard.classList.add('active');
        initAdminDashboard();
    }
}

// Show login screen
function showLoginScreen() {
    hideAllScreens();
    loginScreen.classList.add('active');
}

// Hide all screens
function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

// Logout function
function logout() {
    currentUser = null;
    currentUserType = null;
    cart = {
        restaurantId: null,
        items: [],
        subtotal: 0,
        deliveryFee: 2.99,
        total: 0
    };
    
    // Clear localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType');
    
    showLoginScreen();
}

// Initialize customer dashboard
function initCustomerDashboard() {
    // This will be implemented in customer.js
    if (typeof initCustomerApp === 'function') {
        initCustomerApp();
    }
}

// Initialize restaurant dashboard
function initRestaurantDashboard() {
    // This will be implemented in restaurant.js
    if (typeof initRestaurantApp === 'function') {
        initRestaurantApp();
    }
}

// Initialize driver dashboard
function initDriverDashboard() {
    // This will be implemented in driver.js
    if (typeof initDriverApp === 'function') {
        initDriverApp();
    }
}

// Initialize admin dashboard
function initAdminDashboard() {
    // This will be implemented in admin.js
    if (typeof initAdminApp === 'function') {
        initAdminApp();
    }
}
