export const powerQueryTemplates = {
  finance: `let
    // FINANCE / CORPORATE SCENARIO
    // Endpoint for live data retrieval
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/finance", [
        Headers=[
            Authorization="Bearer YOUR_TOKEN", 
            #"Content-Type"="application/json"
        ]
    ])),
    
    // Convert List to Table
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    
    // Expand Record Columns
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", 
        {"Date", "Region", "Entity", "BusinessUnit", "Product", "Metric1", "Metric2", "Metric3"}
    ),
    
    // Set Data Types
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1",{
        {"Date", type date}, 
        {"Region", type text}, 
        {"Entity", type text}, 
        {"BusinessUnit", type text}, 
        {"Product", type text}, 
        {"Metric1", type number}, 
        {"Metric2", type number}, 
        {"Metric3", type number}
    })
in
    #"Changed Type"`,

  banking: `let
    // BANKING & WEALTH MANAGEMENT SCENARIO
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/banking", [
        Headers=[Authorization="Bearer YOUR_TOKEN", #"Content-Type"="application/json"]
    ])),
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", 
        {"Date", "Region", "Desk", "ClientSegment", "Currency", "AUM", "NetNewMoney", "RiskWeightedAssets", "CostIncomeRatio"}
    ),
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1",{
        {"Date", type date}, 
        {"Region", type text}, 
        {"Desk", type text}, 
        {"ClientSegment", type text}, 
        {"Currency", type text}, 
        {"AUM", type number}, 
        {"NetNewMoney", type number}, 
        {"RiskWeightedAssets", type number}, 
        {"CostIncomeRatio", type number}
    })
in
    #"Changed Type"`,

  trading: `let
    // TRADING (MARKETS / COMMODITIES / FX) SCENARIO
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/trading", [
        Headers=[Authorization="Bearer YOUR_TOKEN", #"Content-Type"="application/json"]
    ])),
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", 
        {"Date", "Market", "Desk", "Instrument", "Currency", "PnL", "VaR", "Volume", "Exposure"}
    ),
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1",{
        {"Date", type date}, 
        {"Market", type text}, 
        {"Desk", type text}, 
        {"Instrument", type text}, 
        {"Currency", type text}, 
        {"PnL", type number}, 
        {"VaR", type number}, 
        {"Volume", type number}, 
        {"Exposure", type number}
    })
in
    #"Changed Type"`,

  industry: `let
    // INDUSTRY (PRODUCTION / SUPPLY CHAIN) SCENARIO
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/industry", [
        Headers=[Authorization="Bearer YOUR_TOKEN", #"Content-Type"="application/json"]
    ])),
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", 
        {"Date", "Region", "Plant", "Line", "Product", "OnTimeDelivery", "ProductionVolume", "ScrapRate", "CapacityUtilization"}
    ),
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1",{
        {"Date", type date}, 
        {"Region", type text}, 
        {"Plant", type text}, 
        {"Line", type text}, 
        {"Product", type text}, 
        {"OnTimeDelivery", type number}, 
        {"ProductionVolume", type number}, 
        {"ScrapRate", type number}, 
        {"CapacityUtilization", type number}
    })
in
    #"Changed Type"`,

  pharma: `let
    // PHARMA / LIFE SCIENCES SCENARIO
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/pharma", [
        Headers=[Authorization="Bearer YOUR_TOKEN", #"Content-Type"="application/json"]
    ])),
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", 
        {"Date", "Region", "Program", "Phase", "RDSpend", "TrialsCount", "TimeToMarket", "ComplianceIncidents"}
    ),
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1",{
        {"Date", type date}, 
        {"Region", type text}, 
        {"Program", type text}, 
        {"Phase", type text}, 
        {"RDSpend", type number}, 
        {"TrialsCount", type number}, 
        {"TimeToMarket", type number}, 
        {"ComplianceIncidents", type number}
    })
in
    #"Changed Type"`,

  it: `let
    // IT / TECHNOLOGY SCENARIO
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/it", [
        Headers=[Authorization="Bearer YOUR_TOKEN", #"Content-Type"="application/json"]
    ])),
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", 
        {"Date", "Region", "Service", "Team", "Project", "OpenIncidents", "SLACompliance", "PortfolioHealth", "CapacityVsDemand"}
    ),
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1",{
        {"Date", type date}, 
        {"Region", type text}, 
        {"Service", type text}, 
        {"Team", type text}, 
        {"Project", type text}, 
        {"OpenIncidents", type number}, 
        {"SLACompliance", type number}, 
        {"PortfolioHealth", type number}, 
        {"CapacityVsDemand", type number}
    })
in
    #"Changed Type"`,
  
  universal: `let
    // UNIVERSAL SCRIPT - PARAMETERIZED SCENARIO
    // Parameter: Scenario Name (e.g., "finance", "banking", "it")
    Scenario = "finance", 
    
    Source = Json.Document(Web.Contents("https://api.powalyze.com/v1/demo/" & Scenario, [
        Headers=[Authorization="Bearer YOUR_TOKEN", #"Content-Type"="application/json"]
    ])),
    
    #"Converted to Table" = Table.FromList(Source, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandRecordColumn(#"Converted to Table", "Column1", Record.FieldNames(#"Converted to Table"{0}[Column1])),
    
    // Auto-detect Types
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded Column1", 
        List.Transform(Table.ColumnNames(#"Expanded Column1"), each {_, type any})
    )
in
    #"Changed Type"`
};