
# Powalyze - Premium PMO & Data Consulting Platform

## Overview
Powalyze is a modern React application built for a high-end Swiss consulting firm specializing in Strategic PMO, IT Governance, and Data Analytics. The platform features a public marketing site, a secure client portal, and interactive Power BI demonstrations.

## Tech Stack
- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Animation:** Framer Motion
- **State Management:** Context API
- **Routing:** React Router v6
- **Backend/Auth:** Supabase (Auth, DB, Storage) & LocalStorage fallback
- **Analytics:** Google Analytics 4, Web Vitals

## Project Structure
- `/src/components`: Reusable UI components (Atomic design)
- `/src/pages`: Route components
- `/src/context`: Global state (Auth, Theme, Language)
- `/src/services`: API logic and business services
- `/src/utils`: Helper functions and formatters
- `/src/lib`: Configuration and constants

## Key Features
- **Multilingual Support:** FR/EN/DE
- **Performance Optimized:** Lazy loading, code splitting, image optimization
- **Accessible:** WCAG AA compliant, keyboard navigation, screen reader support
- **Secure:** AuthGuard, RLS simulation, secure headers
- **Interactive Demos:** Power BI embedded simulations

## Installation
1. Clone the repository
2. Install dependencies:
   