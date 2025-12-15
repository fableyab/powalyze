# Sample Implementation Guide

## Scenario
Setting up a "Hello World" embedded report for "Client A".

## Step 1: Power BI Desktop
1.  Import data. Create `Dim_Client` table with row `ID: 1, Name: Client A`.
2.  Manage Roles -> Create `Client_Viewer`.
3.  Add DAX filter on `Dim_Client`: `[Name] = USERNAME()`.
4.  Publish to Workspace.

## Step 2: Backend Config
1.  Set `.env`: