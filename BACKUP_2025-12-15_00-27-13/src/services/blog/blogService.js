
import { blogData } from '@/data/blogData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
  getAllArticles: async () => {
    await delay(300);
    // Sort by date desc
    return [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getArticleBySlug: async (slug) => {
    await delay(200);
    return blogData.find(article => article.slug === slug);
  },

  getArticlesByCategory: async (category) => {
    await delay(200);
    if (category === 'All' || !category) return blogService.getAllArticles();
    return blogData.filter(article => article.category === category);
  },

  getArticlesByTag: async (tag) => {
    await delay(200);
    return blogData.filter(article => article.tags.includes(tag));
  },

  searchArticles: async (query, language = 'fr') => {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return blogData.filter(article => {
      const content = article.translations[language];
      if (!content) return false;
      return (
        content.title.toLowerCase().includes(lowerQuery) ||
        content.excerpt.toLowerCase().includes(lowerQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    });
  },

  getRelatedArticles: async (currentSlug, category) => {
    await delay(200);
    return blogData
      .filter(article => article.category === category && article.slug !== currentSlug)
      .slice(0, 3);
  },

  getFeaturedArticles: async () => {
    await delay(200);
    return blogData.slice(0, 3);
  }
};
