import { useState, useCallback } from 'react';
import { aiService } from '@/services/ai/aiService';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInsights = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      return await aiService.generateInsights(data);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRecommendations = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      return await aiService.generateRecommendations(data);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeData = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      return await aiService.analyzeData(data);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const chat = useCallback(async (message, history) => {
    setLoading(true);
    setError(null);
    try {
      return await aiService.chat(message, history);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    generateInsights,
    generateRecommendations,
    analyzeData,
    chat
  };
};