export const mockDemoData = {
  finance: [
    { Date: "2024-01-15", Region: "EMEA", Entity: "HQ Swiss", BusinessUnit: "Finance", Product: "Advisory", Metric1: 150000, Metric2: 45000, Metric3: 0.30 },
    { Date: "2024-01-16", Region: "APAC", Entity: "Singapore Branch", BusinessUnit: "Ops", Product: "Software", Metric1: 89000, Metric2: 22000, Metric3: 0.25 },
    { Date: "2024-01-17", Region: "AMER", Entity: "NY Office", BusinessUnit: "Sales", Product: "Consulting", Metric1: 210000, Metric2: 85000, Metric3: 0.40 },
    { Date: "2024-01-18", Region: "EMEA", Entity: "London Branch", BusinessUnit: "Finance", Product: "Advisory", Metric1: 175000, Metric2: 52000, Metric3: 0.32 },
    { Date: "2024-01-19", Region: "EMEA", Entity: "Zurich HQ", BusinessUnit: "IT", Product: "Infrastructure", Metric1: 45000, Metric2: 12000, Metric3: 0.15 },
  ],
  banking: [
    { Date: "2024-02-01", Region: "Switzerland", Desk: "Private Banking", ClientSegment: "UHNWI", Currency: "CHF", AUM: 50000000, NetNewMoney: 1500000, RiskWeightedAssets: 12000000, CostIncomeRatio: 65.4 },
    { Date: "2024-02-02", Region: "Singapore", Desk: "External Asset Managers", ClientSegment: "HNWI", Currency: "SGD", AUM: 25000000, NetNewMoney: 500000, RiskWeightedAssets: 8000000, CostIncomeRatio: 58.2 },
    { Date: "2024-02-03", Region: "London", Desk: "Investment Banking", ClientSegment: "Corporate", Currency: "GBP", AUM: 120000000, NetNewMoney: -2000000, RiskWeightedAssets: 45000000, CostIncomeRatio: 72.1 },
    { Date: "2024-02-04", Region: "New York", Desk: "Wealth Management", ClientSegment: "UHNWI", Currency: "USD", AUM: 85000000, NetNewMoney: 3000000, RiskWeightedAssets: 22000000, CostIncomeRatio: 61.5 },
  ],
  trading: [
    { Date: "2024-03-10", Market: "Energy", Desk: "Oil & Gas", Instrument: "Brent Crude", Currency: "USD", PnL: 45000, VaR: 12000, Volume: 5000, Exposure: 150000 },
    { Date: "2024-03-11", Market: "Metals", Desk: "Precious", Instrument: "Gold Spot", Currency: "USD", PnL: -12500, VaR: 8000, Volume: 1200, Exposure: 85000 },
    { Date: "2024-03-12", Market: "FX", Desk: "G10", Instrument: "EUR/USD", Currency: "EUR", PnL: 22000, VaR: 5000, Volume: 10000000, Exposure: 500000 },
    { Date: "2024-03-13", Market: "Agri", Desk: "Grains", Instrument: "Wheat Futures", Currency: "USD", PnL: 8500, VaR: 3500, Volume: 800, Exposure: 45000 },
  ],
  industry: [
    { Date: "2024-04-05", Region: "Germany", Plant: "Berlin Factory", Line: "Assembly A", Product: "Engine Block V8", OnTimeDelivery: 98.5, ProductionVolume: 150, ScrapRate: 1.2, CapacityUtilization: 92 },
    { Date: "2024-04-06", Region: "France", Plant: "Lyon Plant", Line: "Paint Shop", Product: "Chassis", OnTimeDelivery: 95.0, ProductionVolume: 400, ScrapRate: 2.5, CapacityUtilization: 88 },
    { Date: "2024-04-07", Region: "China", Plant: "Shanghai Facility", Line: "Electronics", Product: "Control Unit", OnTimeDelivery: 99.2, ProductionVolume: 2500, ScrapRate: 0.5, CapacityUtilization: 96 },
  ],
  pharma: [
    { Date: "2024-05-15", Region: "Global", Program: "Oncology-X", Phase: "Phase III", RDSpend: 4500000, TrialsCount: 12, TimeToMarket: 24, ComplianceIncidents: 0 },
    { Date: "2024-05-16", Region: "USA", Program: "Cardio-Y", Phase: "Phase II", RDSpend: 2100000, TrialsCount: 5, TimeToMarket: 36, ComplianceIncidents: 1 },
    { Date: "2024-05-17", Region: "Europe", Program: "Neuro-Z", Phase: "Phase I", RDSpend: 1200000, TrialsCount: 2, TimeToMarket: 48, ComplianceIncidents: 0 },
  ],
  it: [
    { Date: "2024-06-20", Region: "EMEA", Service: "Cloud Infra", Team: "DevOps", Project: "Migration AWS", OpenIncidents: 5, SLACompliance: 99.9, PortfolioHealth: 95, CapacityVsDemand: 85 },
    { Date: "2024-06-21", Region: "Global", Service: "Security", Team: "InfoSec", Project: "Zero Trust", OpenIncidents: 12, SLACompliance: 98.5, PortfolioHealth: 88, CapacityVsDemand: 110 },
    { Date: "2024-06-22", Region: "APAC", Service: "End User", Team: "Support", Project: "Win11 Rollout", OpenIncidents: 45, SLACompliance: 92.0, PortfolioHealth: 90, CapacityVsDemand: 95 },
  ],
  universal: [
    { Date: "2024-01-01", Scenario: "Finance", MetricA: 100, MetricB: 200, Status: "OK" },
    { Date: "2024-01-01", Scenario: "IT", MetricA: 50, MetricB: 10, Status: "Warning" },
  ]
};