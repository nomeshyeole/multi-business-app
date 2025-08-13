# Multi Business Corporation

A modern, full-stack web platform designed to empower local businesses and communities with professional services and digital solutions. Built with React, TypeScript, Express, and Tailwind CSS, the platform offers a seamless experience for users to explore and engage with a variety of business services, including retail, hospitality, technology, and event management.

## Features

- **Responsive, professional UI** with a glamorized navbar and dropdown menus
- **Multi-page navigation** (Home, Services, About, Contact) using Wouter routing
- **Modern design** with gradients, shadows, and smooth transitions
- **Reusable components** powered by Radix UI and Tailwind CSS
- **Service showcase** for sports turf, fruit shop, swimming pool, and more
- **Accessible and mobile-friendly** layout for all devices
- **Easy to extend** with a clean, component-based architecture

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Radix UI, Lucide Icons, TanStack Query
- **Backend:** Express, Drizzle ORM
- **Routing:** Wouter
- **Styling:** Tailwind CSS

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
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utility functions
│   │   ├── App.tsx       # Main app component with routing
│   │   └── index.tsx     # Entry point
│   └── index.css         # Global styles
├── server/               # Backend Express server
│   ├── index.ts          # Server entry point
│   └── routes.ts         # API routes
└── shared/               # Shared code between client and server
    └── schema.ts         # Database schema definitions
```

## Development Workflow

- **Frontend Development:** Edit components and pages in the `client/src` directory
- **Backend Development:** Modify API endpoints in the `server/routes.ts` file
- **Database Changes:** Update schemas in `shared/schema.ts` and run migrations
- **Styling:** Use Tailwind CSS classes directly in components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Multi Business Corporation** is dedicated to providing excellence in business services, with a mission to deliver modern solutions and a customer-first approach.
