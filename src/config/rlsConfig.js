/**
 * RLS Configuration
 * Defines how frontend user identities map to Power BI RLS roles.
 * NOTE: This mapping logic should ideally happen backend-side for security.
 */

export const rlsConfig = {
  // Map application roles to Power BI RLS roles
  roleMapping: {
    "admin": ["Executive", "Admin"],
    "project_manager": ["ProjectManager"],
    "finance_manager": ["FinanceController"],
    "viewer": ["Viewer"]
  },

  // Define filter construction logic based on user attributes
  filters: {
    byClientId: (clientId) => ({
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Clients",
        column: "ClientID"
      },
      operator: "In",
      values: [clientId]
    }),
    
    byRegion: (region) => ({
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Sales",
        column: "Region"
      },
      operator: "In",
      values: [region]
    }),
    
    byDepartment: (dept) => ({
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Employees",
        column: "Department"
      },
      operator: "In",
      values: [dept]
    })
  }
};