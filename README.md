# ✈️ Google Flights Clone

A simple and responsive clone of Google Flights built with React. This project allows users to search for flights by selecting origin, destination, and travel dates. It integrates with the Amadeus API for flight queries.

## 🔧 Tech Stack

- **React 19** – Frontend library
- **Vite** – Build tool
- **TypeScript** – Static type checking
- **MUI (Material UI)** – Component library for UI elements
- **MUI Date Picker** – For selecting travel dates
- **Styled-Components** – CSS-in-JS for component styling
- **Recharts** – For data visualization (Price Graph)
- **React Hook Form** – For form state management
- **Zod** – For schema validation
- **Axios** – For API requests
- **React Query** – For data fetching and caching
- **Date-fns** – Date utility library
- **Lucide React** – Icon library

## 🚀 Features

- **Flight Search**: Search by origin, destination, travel dates, and travel class.
- **Advanced Filtering**: Filter by price range, stops, airlines, and amenities.
- **Real-time Price Graph**: Visual representation of flight prices over time.
- **Analytics Dashboard**: View quick stats like cheapest flight, average price, and fastest route.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Modern UI**: Clean interface using Material UI and custom styled-components.
- **Form Validation**: Robust validation using Zod and React Hook Form.

## 📦 Installation

```bash
yarn install
```

## Start the development server

```bash
yarn dev
```

## 🌐 API Configuration

This project uses the Amadeus API for flight searches. Create a `.env` file in the root directory and add your Amadeus client ID and secret. Refer to `.env.example` file. You can get credentials from the Amadeus Developer Portal.

## 📁 Project Structure

```txt
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── atoms/       # Basic building blocks (Buttons, Inputs)
│   ├── molecules/   # Simple groups of atoms (Cards, FormFields)
│   ├── organisms/   # Complex UI sections (Navbar, Filters)
│   └── shared/      # Shared styled components
├── constants/       # App constants and configuration
├── hooks/           # Custom React hooks
├── interfaces/      # Type definitions (Interfaces)
├── Layout/          # Layout wrappers
├── pages/           # Route-level page components
├── providers/       # Context providers (Theme, QueryClient)
├── routes/          # Application routing configuration
├── schemas/         # Zod validation schemas
├── services/        # API services and axios setup
├── styles/          # Global styles and theme setup
├── types/           # Type definitions (Types)
├── utils/           # Helper utility functions
└── main.tsx         # Application entry point
```
