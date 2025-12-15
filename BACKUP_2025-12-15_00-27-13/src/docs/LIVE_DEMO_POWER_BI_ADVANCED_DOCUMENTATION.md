# Live Demo & Power BI Advanced Documentation

## Overview

This documentation details the implementation of the `LiveDemoPage` and `PowerBIAdvancedPage` components, designed to showcase the platform's capabilities to potential clients.

## 1. Live Demo Page (`/live-demo`)

**Purpose:**
A high-converting landing page that funnels users into the interactive dashboard experience. It highlights key features and use cases before presenting the actual demo interface.

**Key Components:**
- **Hero Section:** Engaging headline and CTA to jump to the demo.
- **Feature Grid:** Cards detailing Advanced Visualization, Real-time Integration, Performance, and Predictive Analytics.
- **Interactive Dashboard:** Embeds the `LiveDashboard` component, simulating a real-time Power BI report environment.
- **Pricing:** Clear tier breakdown (Starter, Professional, Enterprise).

**Implementation Details:**
- Uses `framer-motion` for entrance animations.
- `LiveDashboard` is directly embedded to provide an immediate "wow" factor without navigation.
- Responsive design adapts the dashboard container for mobile views.

## 2. Power BI Advanced Page (`/power-bi-advanced`)

**Purpose:**
A feature-deep-dive page focusing on data connectivity, security, and custom data processing capabilities.

**Key Features:**
- **Data Connector Showcase:** Displays supported integrations (SQL, SharePoint, Salesforce, Excel).
- **Interactive File Upload:**
  - **Functionality:** Allows users to parse `.xlsx` and `.csv` files entirely client-side using `xlsx` library.
  - **Security:** Upload is protected by `useAuth()`. Non-authenticated users see a lock screen or sample data.
  - **Visualization:** Automatically generates a Bar Chart preview of the uploaded data using `recharts`.
- **Configuration Modals:** Simulation of connector configuration for enterprise sources.

**Technical Implementation:**
- **File Parsing:** Uses `FileReader` and `XLSX.read` to convert binary input into JSON.
- **State Management:** Handles `isProcessing`, `progress`, and `uploadedData` states to provide feedback.
- **Validation:** Checks file size (<10MB) and type before processing.

## 3. PremiumChart Component (`src/components/PremiumVisuals/PremiumChart.jsx`)

**Updates:**
- **Undefined Error Fix:** Implemented rigorous checks for `data` and `series` props.
- **Safe Defaults:** Uses `useMemo` to ensure `data` is always an array, preventing `.map` errors.
- **Loading/Error States:** Added dedicated UI for loading spinners and error messages.
- **Empty State:** Visual feedback when valid data array is empty.

## 4. Navigation Updates

- **Navbar:** Removed "Blog" from top links to declutter. Added "Live Demo" and "Power BI Advanced".
- **Footer:** Added "Blog" link to the Resources section.
- **Routes:** Updated `App.jsx` with lazy-loaded routes for new pages.

## Best Practices

- **Lazy Loading:** All heavy dashboard pages are lazy-loaded to improve initial TTI (Time to Interactive).
- **Client-Side Processing:** File uploads for the demo are handled client-side to avoid server costs and latency during the sales process.
- **Authentication Guards:** Sensitive actions (like uploading own data) trigger authentication requirements, driving user signup.