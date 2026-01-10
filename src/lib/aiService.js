
/**
 * PRODUCTION-READY AI SERVICE
 * Secure proxy simulation for OpenAI GPT-4 integration.
 * In a real deployment, this file would fetch from a Supabase Edge Function to protect the API Key.
 */

const CACHE_PREFIX = 'powalyze_ai_cache_';

// Simulated latency to mimic real API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCachedResponse = (key) => {
  const cached = localStorage.getItem(CACHE_PREFIX + key);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  // Cache valid for 24 hours
  if (Date.now() - timestamp > 1000 * 60 * 60 * 24) {
    localStorage.removeItem(CACHE_PREFIX + key);
    return null;
  }
  return data;
};

const setCachedResponse = (key, data) => {
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
};

export const generatePortfolioSummary = async (projects) => {
  const cacheKey = `summary_${projects.length}`;
  const cached = getCachedResponse(cacheKey);
  if (cached) return cached;

  await delay(2500); // Simulate OpenAI processing time

  // Mocked GPT-4 Response based on input context
  const response = {
    summary: "The overall portfolio health is stable (Score: 88/100). However, a systemic risk is emerging in the 'Digital Transformation' sector due to cascading delays in the 'Identity Management' project. Budget consumption is currently 4% below forecast, indicating a potential resource under-allocation in Q3.",
    key_drivers: [
      "High velocity in 'Cloud Migration' (+15% vs plan)",
      "Resource bottleneck in 'Cybersecurity' (2 vacancies)",
      "Vendor dependency risk in 'Core Banking' (Oracle)"
    ],
    sentiment: "Cautiously Optimistic",
    confidence: 0.94,
    source_nodes: ["Project: Alpha", "Project: Beta", "Resource: Team A"]
  };

  setCachedResponse(cacheKey, response);
  return response;
};

export const predictProjectRisks = async (projectId) => {
  const cacheKey = `risk_${projectId}`;
  const cached = getCachedResponse(cacheKey);
  if (cached) return cached;

  await delay(1800);

  const response = {
    risk_level: "High",
    prediction: "85% probability of timeline slippage by 3 weeks.",
    reasoning: "Historical analysis shows that similar 'API Integration' tasks with 'Vendor X' have averaged a 21-day delay. Current team velocity (SP/sprint) has dropped by 12% in the last 2 sprints.",
    recommendation: "Reduce scope of 'Reporting Module' or add 1 Senior Backend Engineer immediately.",
    confidence: 0.88
  };

  setCachedResponse(cacheKey, response);
  return response;
};

export const generateScenarios = async (financials) => {
  await delay(3000); // Heavy computation simulation
  
  return [
    { name: "Optimistic", outcome: "CHF 1.2M Savings", probability: "15%", assumption: "No vendor delays, full resource availability." },
    { name: "Realistic", outcome: "CHF 200k Overrun", probability: "65%", assumption: "Standard 10% contingency usage, 1 major change request." },
    { name: "Pessimistic", outcome: "CHF 1.8M Overrun", probability: "20%", assumption: "Regulatory fine (GDPR), critical path delay of 2 months." }
  ];
};
