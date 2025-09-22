// Mock data for the food delivery app

const mockData = {
    // Customer data
    customers: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1-555-0101",
            address: "123 Main St, Anytown, USA",
            orders: [101, 102, 105]
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1-555-0102",
            address: "456 Oak Ave, Somewhere, USA",
            orders: [103, 104]
        }
    ],
    
    // Restaurants data
    restaurants: [
        {
            id: 1,
            name: "Pizza Palace",
            cuisine: "Italian",
            rating: 4.5,
            deliveryTime: "25-35 min",
            distance: "0.8 mi",
            address: "789 Pizza St, Foodville, USA",
            menu: [
                {
                    id: 1,
                    name: "Margherita Pizza",
                    description: "Classic pizza with tomato sauce, mozzarella, and basil",
                    price: 12.99,
                    category: "Pizza",
                    customization: [
                        {
                            name: "Size",
                            options: ["Small", "Medium", "Large"],
                            required: true
                        },
                        {
                            name: "Crust",
                            options: ["Thin", "Thick", "Stuffed"],
                            required: true
                        },
                        {
                            name: "Extra Toppings",
                            options: ["Extra Cheese", "Pepperoni", "Mushrooms", "Olives"],
                            required: false
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Pepperoni Pizza",
                    description: "Pizza with tomato sauce, mozzarella, and pepperoni",
                    price: 14.99,
                    category: "Pizza",
                    customization: [
                        {
                            name: "Size",
                            options: ["Small", "Medium", "Large"],
                            required: true
                        },
                        {
                            name: "Crust",
                            options: ["Thin", "Thick", "Stuffed"],
                            required: true
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Caesar Salad",
                    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
                    price: 8.99,
                    category: "Salads",
                    customization: [
                        {
                            name: "Dressing",
                            options: ["Regular", "Light", "Extra"],
                            required: true
                        },
                        {
                            name: "Add-ons",
                            options: ["Grilled Chicken", "Shrimp", "Extra Croutons"],
                            required: false
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Taco Fiesta",
            cuisine: "Mexican",
            rating: 4.2,
            deliveryTime: "20-30 min",
            distance: "1.2 mi",
            address: "321 Taco Lane, Spicetown, USA",
            menu: [
                {
                    id: 4,
                    name: "Beef Tacos",
                    description: "Three soft tacos with seasoned beef, lettuce, and cheese",
                    price: 9.99,
                    category: "Tacos",
                    customization: [
                        {
                            name: "Spice Level",
                            options: ["Mild", "Medium", "Hot", "Extra Hot"],
                            required: true
                        },
                        {
                            name: "Toppings",
                            options: ["Guacamole", "Sour Cream", "Extra Cheese"],
                            required: false
                        }
                    ]
                },
                {
                    id: 5,
                    name: "Chicken Burrito",
                    description: "Large burrito with grilled chicken, rice, beans, and cheese",
                    price: 10.99,
                    category: "Burritos",
                    customization: [
                        {
                            name: "Spice Level",
                            options: ["Mild", "Medium", "Hot"],
                            required: true
                        },
                        {
                            name: "Add-ons",
                            options: ["Guacamole", "Sour Cream", "Extra Cheese"],
                            required: false
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Dragon Wok",
            cuisine: "Chinese",
            rating: 4.7,
            deliveryTime: "30-40 min",
            distance: "2.1 mi",
            address: "654 Noodle Rd, Chinatown, USA",
            menu: [
                {
                    id: 6,
                    name: "Kung Pao Chicken",
                    description: "Stir-fried chicken with peanuts, vegetables, and chili peppers",
                    price: 13.99,
                    category: "Main Courses",
                    customization: [
                        {
                            name: "Spice Level",
                            options: ["Mild", "Medium", "Hot", "Szechuan Hot"],
                            required: true
                        },
                        {
                            name: "Rice",
                            options: ["White Rice", "Brown Rice", "Fried Rice"],
                            required: true
                        }
                    ]
                },
                {
                    id: 7,
                    name: "Vegetable Spring Rolls",
                    description: "Crispy spring rolls with mixed vegetables",
                    price: 5.99,
                    category: "Appetizers"
                }
            ]
        }
    ],
    
    // Drivers data
    drivers: [
        {
            id: 1,
            name: "Mike Driver",
            email: "mike@example.com",
            phone: "+1-555-0201",
            vehicle: "Honda Civic",
            license: "DL123456",
            status: "available",
            currentOrder: null,
            completedOrders: [101, 103]
        },
        {
            id: 2,
            name: "Sarah Wheeler",
            email: "sarah@example.com",
            phone: "+1-555-0202",
            vehicle: "Toyota Corolla",
            license: "DL654321",
            status: "available",
            currentOrder: null,
            completedOrders: [102, 104]
        }
    ],
    
    // Orders data
    orders: [
        {
            id: 101,
            customerId: 1,
            restaurantId: 1,
            driverId: 1,
            items: [
                {
                    menuItemId: 1,
                    name: "Margherita Pizza",
                    quantity: 1,
                    price: 12.99,
                    customization: {
                        "Size": "Medium",
                        "Crust": "Thin",
                        "Extra Toppings": ["Extra Cheese"]
                    }
                },
                {
                    menuItemId: 3,
                    name: "Caesar Salad",
                    quantity: 1,
                    price: 8.99,
                    customization: {
                        "Dressing": "Regular",
                        "Add-ons": ["Grilled Chicken"]
                    }
                }
            ],
            total: 24.97,
            status: "delivered",
            orderTime: "2023-04-15T18:30:00",
            deliveryAddress: "123 Main St, Anytown, USA",
            rating: 5,
            review: "Great food and fast delivery!"
        },
        {
            id: 102,
            customerId: 1,
            restaurantId: 2,
            driverId: 2,
            items: [
                {
                    menuItemId: 4,
                    name: "Beef Tacos",
                    quantity: 2,
                    price: 9.99,
                    customization: {
                        "Spice Level": "Medium",
                        "Toppings": ["Guacamole", "Sour Cream"]
                    }
                }
            ],
            total: 21.97,
            status: "delivered",
            orderTime: "2023-04-20T19:15:00",
            deliveryAddress: "123 Main St, Anytown, USA",
            rating: 4,
            review: "Tacos were delicious but delivery was a bit late"
        },
        {
            id: 103,
            customerId: 2,
            restaurantId: 1,
            driverId: 1,
            items: [
                {
                    menuItemId: 2,
                    name: "Pepperoni Pizza",
                    quantity: 1,
                    price: 14.99,
                    customization: {
                        "Size": "Large",
                        "Crust": "Thick"
                    }
                }
            ],
            total: 17.98,
            status: "delivered",
            orderTime: "2023-04-22T20:00:00",
            deliveryAddress: "456 Oak Ave, Somewhere, USA"
        },
        {
            id: 104,
            customerId: 2,
            restaurantId: 3,
            driverId: 2,
            items: [
                {
                    menuItemId: 6,
                    name: "Kung Pao Chicken",
                    quantity: 1,
                    price: 13.99,
                    customization: {
                        "Spice Level": "Hot",
                        "Rice": "Fried Rice"
                    }
                },
                {
                    menuItemId: 7,
                    name: "Vegetable Spring Rolls",
                    quantity: 1,
                    price: 5.99
                }
            ],
            total: 22.97,
            status: "delivered",
            orderTime: "2023-04-25T19:30:00",
            deliveryAddress: "456 Oak Ave, Somewhere, USA",
            rating: 5
        },
        {
            id: 105,
            customerId: 1,
            restaurantId: 3,
            driverId: null,
            items: [
                {
                    menuItemId: 6,
                    name: "Kung Pao Chicken",
                    quantity: 1,
                    price: 13.99,
                    customization: {
                        "Spice Level": "Medium",
                        "Rice": "White Rice"
                    }
                }
            ],
            total: 16.98,
            status: "preparing",
            orderTime: "2023-04-28T18:45:00",
            deliveryAddress: "123 Main St, Anytown, USA"
        }
    ],
    
    // Support tickets
    supportTickets: [
        {
            id: 1,
            customerId: 1,
            subject: "Missing item from my order",
            description: "I ordered a pizza but the drink was missing from my delivery",
            status: "resolved",
            assignedTo: "Admin",
            createdAt: "2023-04-16T10:30:00"
        },
        {
            id: 2,
            customerId: 2,
            subject: "Late delivery",
            description: "My order was 30 minutes late and the food was cold",
            status: "in-progress",
            assignedTo: "Support Agent",
            createdAt: "2023-04-23T21:15:00"
        }
    ]
};

// Current user session
let currentUser = null;
let currentUserType = null;

// Shopping cart
let cart = {
    restaurantId: null,
    items: [],
    subtotal: 0,
    deliveryFee: 2.99,
    total: 0
};

// Active orders for tracking
let activeOrders = [];

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockData, currentUser, currentUserType, cart, activeOrders };
}
