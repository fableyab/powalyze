
/**
 * Mock service to simulate OpenAI calls for the demo.
 * In production, this would call a Supabase Edge Function that proxies to OpenAI.
 */

export const generateExecutiveSummary = async (contextData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    summary: `Based on the analysis of ${contextData.projectCount || 15} active projects, the portfolio is currently performing well with a total efficiency score of 94/100. However, there is a projected budget deviation in the "Cloud Migration" sector (+12%) due to unexpected Azure consumption rates.`,
    risks: [
      "Supply chain delay probability increased to 65% for Hardware Refresh.",
      "Compliance risk detected in new data ingestion pipeline (GDPR).",
      "Resource bottleneck identified for Q4: Senior Architects."
    ],
    recommendations: [
      "Initiate immediate review of Azure auto-scaling policies.",
      "Reallocate 2 senior resources from Maintenance to Strategic Ops.",
      "Schedule steering committee review for Risk mitigation approval."
    ],
    confidence: 0.89,
    source: "Analyzed 1,402 data points from Jira, SAP, and Azure DevOps."
  };
};

export const predictScenarios = async (variables) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        bestCase: { label: "Optimistic", outcome: "15% Cost Savings", probability: "20%" },
        expectedCase: { label: "Realistic", outcome: "2% Budget Overrun", probability: "60%" },
        worstCase: { label: "Pessimistic", outcome: "18% Delay / 10% Overrun", probability: "20%" }
    };
};
