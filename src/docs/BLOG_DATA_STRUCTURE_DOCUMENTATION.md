# Blog Data Structure & Documentation

This document outlines the data structure used for the Powalyze blog system, managed via a static file (`src/lib/blogData.js`) to ensure performance and ease of maintenance.

## Data Source Location
- **Path**: `src/lib/blogData.js`
- **Format**: ES Module export (default array)

## Data Schema

Each blog post in the `blogArticles` array adheres to the following structure:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier for the post. |
| `slug` | `string` | URL-friendly unique identifier used for routing (e.g., `/blog/my-post`). |
| `title` | `string` | Main headline of the article. |
| `author` | `string` | Full name of the author. |
| `date` | `string` | Publication date in ISO format (YYYY-MM-DD). |
| `readingTime` | `string` | Estimated reading time (e.g., "12 min"). |
| `category` | `string` | Primary category for filtering (e.g., "PMO", "Data Analytics"). |
| `featuredImage` | `string` | URL to the main cover image (Unsplash or hosted asset). |
| `introduction` | `string` | Brief abstract displayed on the blog listing page and at the top of the article. |
| `content` | `HTML string` | The full body content of the article, stored in a template literal using backticks. Supports semantic HTML tags (`<h2>`, `<p>`, `<ul>`, etc.) and Tailwind classes for styling. |
| `conclusion` | `string` | A concise wrap-up paragraph. |
| `relatedPosts` | `array<string>` | Array of `slug`s pointing to related articles. Used to populate the "Articles Similaires" section. |
| `tags` | `array<string>` | Array of keywords for searching and context. |

### Example Object