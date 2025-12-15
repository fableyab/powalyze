import { isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * AI Service
 * Handles communication with AI providers (simulated for now, can be connected to OpenAI/Claude)
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock responses to simulate AI behavior without API keys
const MOCK_INSIGHTS = [
  "Project 'Cloud Migration' is trending 15% over budget due to unexpected licensing costs.",
  "Resource utilization in the 'IT Dept' has dropped by 10% in the last month.",
  "Based on current velocity, the 'ERP Upgrade' project is likely to be delayed by 2 weeks."
];

const MOCK_RECOMMENDATIONS = [
  "Reallocate 2 senior developers to the 'Cloud Migration' project to mitigate risk.",
  "Review software licensing agreements to optimize costs.",
  "Schedule a risk assessment workshop for the 'ERP Upgrade' project."
];

export const aiService = {
  /**
   * Generate insights from provided data
   */
  generateInsights: async (data) => {
    await delay(1500); // Simulate processing
    
    // In a real app, we would send 'data' to OpenAI API here
    return {
      insights: MOCK_INSIGHTS,
      confidence: 0.85,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Generate actionable recommendations
   */
  generateRecommendations: async (data) => {
    await delay(1200);
    return {
      recommendations: MOCK_RECOMMENDATIONS,
      priority: "High",
      impact_score: 8.5
    };
  },

  /**
   * Analyze raw data for patterns
   */
  analyzeData: async (data) => {
    await delay(2000);
    return {
      summary: "Data indicates a strong correlation between team size and delivery velocity, but diminishing returns after 8 members.",
      patterns: ["Cyclical spending", "End-of-quarter crunch"],
      anomalies: ["Spike in Q3 costs"]
    };
  },

  /**
   * Predict future trends
   */
  predictTrends: async (historicalData) => {
    await delay(1000);
    return {
      trend: "upward",
      forecast: [
        { period: "Next Month", value: 120 },
        { period: "Month 2", value: 135 },
        { period: "Month 3", value: 142 }
      ],
      confidence_interval: "90%"
    };
  },

  /**
   * Generate a natural language report
   */
  generateReport: async (data) => {
    await delay(2500);
    return {
      title: "Executive AI Summary",
      content: "Overall portfolio health is stable. However, cost overruns in the Cloud sector require immediate attention. Recommended actions include auditing cloud resources and freezing non-essential hiring.",
      generated_at: new Date().toISOString()
    };
  },

  /**
   * Send a message to the AI Chat
   */
  chat: async (message, history = []) => {
    await delay(1000 + Math.random() * 1000);
    
    // Simple keyword matching for demo purposes
    const lowerMsg = message.toLowerCase();
    let response = "I'm analyzing your request. Could you provide more specific data points?";

    if (lowerMsg.includes('budget') || lowerMsg.includes('cost')) {
      response = "Based on the financial data, the Q3 budget is currently 12% utilized. The 'Marketing' category is the highest spender.";
    } else if (lowerMsg.includes('risk') || lowerMsg.includes('delay')) {
      response = "I've identified 3 high-risk projects. The primary risk factor is resource availability in the Engineering department.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      response = "Hello! I am your Powalyze AI assistant. How can I help you optimize your project portfolio today?";
    } else if (lowerMsg.includes('recommend')) {
      response = "I recommend focusing on the 'Alpha' project's critical path. Redistributing tasks from the backlog could improve velocity by 15%.";
    }

    return {
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };
  }
};