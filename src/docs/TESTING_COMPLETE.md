# Comprehensive Testing Guide

## 1. Overview
This document outlines the testing strategy for the Powalyze application, covering unit tests, integration tests, and end-to-end (E2E) testing scenarios.

## 2. Test Scenarios

### Authentication
- [ ] Login with valid credentials redirects to Dashboard
- [ ] Login with invalid credentials shows error toast
- [ ] Signup creates new user and redirects
- [ ] Protected routes redirect unauthenticated users to Login

### Data Analysis
- [ ] Uploading valid Excel file parses data correctly
- [ ] Uploading invalid file shows error
- [ ] "Generate Dashboard" button creates visual elements
- [ ] Export button downloads correct file format

### Power BI Embedding
- [ ] Component loads without crashing
- [ ] Invalid token shows error state
- [ ] Settings panel toggles navigation/filter panes
- [ ] Export button triggers file download

### Forms
- [ ] Contact form validates required fields
- [ ] Schedule consultation sends email (mock)
- [ ] Success message appears after submission

## 3. Manual Testing Steps
1. Navigate to `/login` and sign in as `demo@powalyze.ch`.
2. Go to `/powerbi-advanced` and try uploading a `.xlsx` file.
3. Verify charts update based on the uploaded data.
4. Go to `/pmo-demo` and switch between tabs.
5. Verify all KPIs and charts render.
6. Click "Export" on any report and verify download.

## 4. Automated Testing (Future Implementation)
- **Unit Tests**: Jest + React Testing Library for components.
- **E2E Tests**: Cypress or Playwright for user flows.