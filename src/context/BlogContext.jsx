
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { blogService } from '@/services/blog/blogService';
import { useToast } from '@/components/ui/use-toast';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await blogService.getAllArticles();
      setArticles(data);
      const featured = await blogService.getFeaturedArticles();
      setFeaturedArticles(featured);
    } catch (err) {
      setError(err.message);
      toast({ 
        variant: "destructive", 
        title: "Erreur", 
        description: "Impossible de charger les articles." 
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getArticle = useCallback(async (slug) => {
    setLoading(true);
    try {
      const article = await blogService.getArticleBySlug(slug);
      setCurrentArticle(article);
      return article;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const search = async (query, lang) => {
    setLoading(true);
    try {
      const results = await blogService.searchArticles(query, lang);
      setArticles(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    setLoading(true);
    try {
      const results = await blogService.getArticlesByCategory(category);
      setArticles(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <BlogContext.Provider value={{
      articles,
      featuredArticles,
      currentArticle,
      loading,
      error,
      loadArticles,
      getArticle,
      search,
      filterByCategory
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
