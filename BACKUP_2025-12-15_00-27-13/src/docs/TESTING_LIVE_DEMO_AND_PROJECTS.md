# Testing Guide: Live Demo & Projects

## 1. Live Data Streaming
**Goal**: Verify real-time updates without page reload.
- [ ] Navigate to `/live-demo`.
- [ ] Observe "Live Data Stream" badge pulsing.
- [ ] Watch "Budget Spent" and "Revenue" cards. Values should change approx every 2 seconds.
- [ ] Switch tabs to "Projects". Verify progress bars fluctuate.

## 2. Client Space & Projects
**Goal**: Verify CRUD operations for projects.
- [ ] Login as a user.
- [ ] Click "Client Space" in Navbar.
- [ ] Click "New Project".
- [ ] Try submitting empty form (Should show validation errors).
- [ ] Fill form validly and submit.
- [ ] Verify redirection to list and presence of new project.
- [ ] Reload page. Project should persist (Local Storage).

## 3. Settings Persistence
- [ ] (Future implementation) Toggle settings in a settings panel and reload page to ensure persistence.

## 4. Performance
- [ ] Open Network tab in DevTools.
- [ ] Verify no excessive API calls are made; data should be generated client-side for the demo.
- [ ] Verify memory usage remains stable during long "Live Demo" sessions.