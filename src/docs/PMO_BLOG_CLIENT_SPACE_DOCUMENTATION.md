# PMO 360, Blog & Client Space Documentation

## 1. PMO 360 Demo Suite
The PMO 360 solution includes a comprehensive demo environment accessible via `/pmo-360-demo`.

### Structure
- **Main Page**: `src/pages/PMO360DemoPage.jsx` - Overview, Features, Pricing.
- **Sub-pages**:
  - `src/pages/PMO360/FinancialOverviewPage.jsx`: Budget and forecast analysis.
  - `src/pages/PMO360/SalesPerformancePage.jsx`: Sales pipeline tracking.
  - `src/pages/PMO360/PMOReportPage.jsx`: Executive summary.

## 2. Blog System (Updated)

### Architecture
The blog system has been refactored to use a centralized data file with template literals for rich HTML content rendering. This ensures scalability and ease of maintenance.

- **Data Source**: `src/lib/blogData.js`
  - Contains an exported array `blogArticles`.
  - Content is stored as HTML strings within template literals (backticks).
  - Standardized structure: `id`, `slug`, `title`, `author`, `date`, `readingTime`, `category`, `image`, `introduction`, `content` (HTML), `conclusion`.

- **Service Layer**: `src/services/blog/blogService.js`
  - `getBlogPosts()`: Returns all posts (simulated async).
  - `getBlogPost(slug)`: Finds a specific post by slug.
  - `searchBlogPosts(query)`: Client-side search implementation.
  - `getBlogPostsByCategory(category)`: Filter logic.

- **Context API**: `src/context/BlogContext.jsx`
  - Provides global state for posts, loading status, and error handling.
  - Wraps the application to allow access to blog data from any component if needed (e.g., for "Recent Posts" widgets).

- **Pages**:
  - **Listing**: `src/pages/BlogPage.jsx` - Features responsive grid layout, search, category filtering, and loading states.
  - **Reader**: `src/pages/Blog/BlogPostReader.jsx` - Renders HTML content safely using `dangerouslySetInnerHTML`, includes comments section, author bio, and navigation.

### Best Practices
- **HTML Content**: Always use `dangerouslySetInnerHTML` cautiously. The content in `blogData.js` is trusted static content.
- **Images**: Use Unsplash URLs for consistent, high-quality placeholders.
- **Styling**: Uses Tailwind CSS prose classes (`prose prose-invert`) to automatically style the HTML content injected from the data file.

## 3. Client Space
- **Dashboard**: `src/pages/ClientSpace/ClientSpacePage.jsx` - The main hub for logged-in clients.
- **Functionality**:
  - View active projects.
  - Create new projects (Mock).
  - View embedded Power BI reports (Mock component).
  - Search and filter projects.

## 4. User Account
- **Profile**: `src/pages/MyAccountDashboard.jsx` handles user profile, security (2FA, Password), and activity logs.
- **Authentication**: Powered by `AuthContext`. Supports Mock login and Azure AD integration preparation.

## 5. Technical Implementation
- **Routing**: Centralized in `src/App.jsx` with Lazy Loading for performance.
- **Styling**: Tailwind CSS with custom color palette (Gold `#BFA76A`, Dark Backgrounds).
- **Icons**: Lucide React.
- **Charts**: Recharts for data visualization.