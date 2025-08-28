# Multi Business Hub

A modern, full-stack web platform designed to empower local businesses and communities with professional services and digital solutions. Built with React, TypeScript, Express, and Tailwind CSS, the platform offers a seamless experience for users to explore and engage with a variety of business services, including retail, hospitality, technology, and event management.

## Features

- **Smart Mall Complex** with integrated shopping and service experiences
- **Advanced E-commerce functionality** with product listings, shopping cart, and checkout
- **Booking System** for sports facilities, swimming pools, and other services with time slot selection
- **Payment Processing** supporting both online (UPI with QR code) and cash payment methods
- **User Profiles** with service history and account management
- **Responsive, professional UI** with a modern navbar and dropdown menus
- **Multi-page navigation** using Wouter routing with persistent state management
- **Modern design** with gradients, shadows, and smooth transitions
- **Reusable components** powered by Radix UI and Tailwind CSS
- **Service showcase** for various businesses including footwear, clothing, electronics, and more
- **Accessible and mobile-friendly** layout for all devices
- **Easy to extend** with a clean, component-based architecture

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Radix UI, Lucide Icons, TanStack Query
- **Backend:** Express, Drizzle ORM, SQLite
- **State Management:** React Context API for authentication and shopping cart
- **Routing:** Wouter
- **Styling:** Tailwind CSS with custom components
- **UI Components:** shadcn/ui component library
- **Form Handling:** React Hook Form with Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```
5. Start production server:
   ```
   npm start
   ```

## Project Structure

```
.
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   └── ui/       # shadcn/ui component library
│   │   ├── contexts/     # React Context providers (auth, cart)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components for each route
│   │   │   └── services/ # Service-specific pages
│   │   ├── lib/          # Utility functions and API clients
│   │   ├── App.tsx       # Main app component with routing
│   │   └── index.tsx     # Entry point
│   └── index.css         # Global styles
├── server/               # Backend Express server
│   ├── index.ts          # Standard server entry point
│   ├── enhanced-index.ts # Enhanced server with additional features
│   ├── auth.ts           # Authentication logic
│   ├── booking-routes.ts # Booking system routes
│   ├── storage.ts        # File storage handling
│   ├── db.ts             # Database connection setup
│   ├── scheduler.ts      # Scheduling logic for bookings
│   └── routes.ts         # API routes
├── migrations/           # Database migration files
│   └── meta/             # Migration metadata
└── shared/               # Shared code between client and server
    └── schema.ts         # Database schema definitions with Drizzle ORM
```

## Development Workflow

- **Frontend Development:** Edit components and pages in the `client/src` directory
- **Backend Development:** Modify API endpoints in the `server/routes.ts` file
- **Database Changes:** Update schemas in `shared/schema.ts` and run migrations with `npm run db:migrate`
- **Styling:** Use Tailwind CSS classes directly in components
- **Running the Application:**
  - Start the backend server: `npm run dev` or `npm run dev:enhanced`
  - Start the frontend client: `npm run dev:client`
  - Start both simultaneously: `npm run dev:all`

## Key Features Explained

### Smart Mall Complex
The Smart Mall Complex integrates multiple business services into a unified shopping experience. Users can browse different stores, view products, add items to cart, and make purchases all within a seamless interface.

### E-commerce Features
- **Product Listings:** Categorized displays for clothing, footwear, electronics, and more
- **Shopping Cart:** Persistent cart management with React Context API
- **Product Details:** Size selection, color options, and quantity management
- **Quick Purchase:** Add-to-cart functionality from product listings and detail views

### Booking System
- **Service Reservation:** Book sports facilities, swimming pools, and other services
- **Time Slot Selection:** Choose available time slots for services
- **Recurring Bookings:** Option to book services on a recurring basis
- **Booking Management:** View, modify, and cancel existing bookings

### User Management
- **Authentication:** Login/register functionality with secure sessions
- **User Profiles:** Personal information, booking history, and preferences
- **Role-based Access:** Different capabilities for regular users and business owners

## Database Schema
The application uses SQLite with Drizzle ORM, featuring tables for:
- Users and authentication
- Businesses and services
- Product inventory and categories
- Bookings and availability
- Reviews and ratings
- Payment processing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Multi Business Hub** is dedicated to providing excellence in business services, with a mission to deliver modern solutions and a customer-first approach.
