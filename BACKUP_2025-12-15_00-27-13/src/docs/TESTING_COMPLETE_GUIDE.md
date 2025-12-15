# Testing Guide

## Manual Testing Checklist

### 1. Navigation & Layout
- [ ] **Navbar**: Verify "Power BI Advanced" and "Voir la Démo PMO" links are present.
- [ ] **Footer**: Verify "Blog" link exists in Resources column.
- [ ] **Responsiveness**: Check Navbar collapse on mobile screens.

### 2. PMO Demo Page (/pmo-360-demo)
- [ ] **Tabs**: Switch between "Project Tracking", "Financial Overview", "Sales", and "PMO Report".
- [ ] **Visuals**: Verify charts render with animation. Hover over charts to check tooltips.
- [ ] **Download**: Click "Download Sample Data". Verify `Powalyze_Complete_Demo_Data.xlsx` is downloaded.

### 3. Power BI Embedding (/powerbi-advanced or /powerbi-embed)
- [ ] **Load**: Report should load (simulated).
- [ ] **Settings**: Click settings gear. Toggle "Navigation Pane". Verify console log or UI update.
- [ ] **Export**: Click Export -> CSV. Verify file download.

### 4. Contact Form (/contact)
- [ ] **Form**: Fill out Name, Email, Date, Time.
- [ ] **Submission**: Click Schedule. Verify success toast and form reset.

### 5. Data Upload (/upload-excel)
- [ ] **Drag & Drop**: Simulate file drop.
- [ ] **Auth Check**: If not logged in, ensure prompt appears.
- [ ] **Processing**: Verify progress bar and final success message.

### 6. Authentication
- [ ] **Protected Routes**: Try accessing `/dashboard`. Should redirect to `/login`.
- [ ] **Login**: Use mock credentials. Verify redirect back to intended page.