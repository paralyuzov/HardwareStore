# HardwareStore

Softuni VueJS open course project.
A modern e-commerce platform offering high-performance hardware components with efficient search functionality, and seamless user experiences.

## Feature

    •	🔍 Advanced Search: Search by category and keyword with a responsive search bar.
    •	🛒 Dynamic Cart: Add, update, and remove products from your cart with real-time price updates.
    •	🖥️ Product Categories: CPUs, GPUs, Laptops, RAM, SSDs, Motherboards, Power Supplies, and more.
    •	✅ Secure Payments: Integrated with Stripe for safe transactions.
    •	📈 Admin Panel: Manage products and users effortlessly.

## Technologies Used:

    •	Frontend: Vue.js 3, Pinia, TailwindCSS
    •	Backend: Node.js, Express.js
    •	Database: MongoDB
    •	Payment: Stripe API

## Project Components

    1. Navbar Component
    •	Purpose: Provides site-wide navigation for users.
    •	Features:
    •	Includes a search bar, product dropdown, user profile menu, and cart link.
    •	Displays the user’s name and a cart item count dynamically.

    2. SearchBar Component
    •	Purpose: Enables users to search for products by category and keywords.
    •	Features:
    •	Dropdown for category selection and input for text search.
    •	Real-time validation for empty search fields.
    •	Redirects users to a results page displaying matching products.

    3. ProductCard Component
    •	Purpose: Displays individual product information in a grid or list view.
    •	Features:
    •	Shows product name, image, price, and type.
    •	Includes an “Add to Cart” button.

    4. Cart Component
    •	Purpose: Manages and displays the user’s selected products.
    •	Features:
    •	Allows quantity updates or removal of items.
    •	Shows the total price of the cart.
    •	Integrated with Stripe for secure payment processing.

    5. Product Detail Components (e.g., CpuDetails, LaptopDetails, etc.)
    •	Purpose: Displays detailed information about individual products.
    •	Features:
    •	Shows specs like model, price, performance details, and images.
    •	Includes an “Add to Cart” button with modal confirmation.

    6. Admin Panel
    •	Purpose: Allows administrators to manage the platform.
    •	Features:
    •	Add, update, or delete products.
    •	View and manage users.
    •	Secure access with admin role validation.

    7. Success and Payment Cancel Pages
    •	Purpose: Provides feedback on the outcome of payment actions.
    •	Features:
    •	Success page confirms successful payments with a thank-you message.
    •	Cancel page informs users of interrupted or failed payments.

    8. CategorySection Component
    •	Purpose: Highlights available product categories on the homepage.
    •	Features:
    •	Displays interactive category cards with icons or images.
    •	Links to respective category pages.

    9. API Routes
    •	Purpose: Handles backend requests for product data and user actions.
    •	Features:
    •	Search API supports category and keyword-based queries.
    •	Routes for user authentication, order management, and product CRUD operations.

## Installation

    Before installing the project, ensure you have the following tools installed:
    • Node.js (v16+ recommended)
    • npm or yarn (comes with Node.js)
    • MongoDB (running locally or a cloud database like MongoDB Atlas)

    1. Install Dependencies
    • Run the following command to install all required dependencies:
    • npm install

    2.Set Up Environment Variables
        • Create a .env file in the root of the project and configure the following variables:
        - MONGO_URI=mongodb://localhost:27017/hardware-store
        - JWT_SECRET=your-jwt-secret
        - NODE_ENV=development
        - PORT=3002
        - STRIPE_SECRET_KEY=your-stripe-secret-key
        • Create a .env file in the root of the hardware-store folder and configure the following variable:
        - VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key

    3.Start the Development Server
        • on /server folder 
        - node server.js
    4.Start the app
        • on /hardware-store folder 
        - npm run dev
    5. For data you can import all the necessary collections(json files) in MongoDB Compass from the provided "data" folder


## Testing Admin

- You can test admin role for the application using this profile : email: admin@gmail.com password: 123456

## Testing payment

- On card information field you can use card number : 4242 4242 4242 4242
- Use a valid future date, such as 12/34.
- Use any three-digit CVC,such as 343.
- For more information you can use this documentation: https://docs.stripe.com/testing
