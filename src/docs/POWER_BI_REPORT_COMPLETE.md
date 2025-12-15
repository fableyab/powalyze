# Powalyze PMO 360 - Complete Power BI Report Specification

## Overview
This document outlines the complete structure of the "Powalyze PMO 360" Power BI report. This report is designed to be embedded into the Powalyze SaaS application using an "App-Owns-Data" architecture with Multi-Tenant Row-Level Security (RLS).

## Report Structure (6 Pages)

| Page # | Name | Audience | Key Purpose |
|--------|------|----------|-------------|
| **1** | **Executive Dashboard** | C-Level / Directors | High-level portfolio health, budget overview, and critical alerts. |
| **2** | **Portfolio PMO** | PMO / Project Managers | Operational tracking, status updates, timelines, and prioritization. |
| **3** | **Data Analysis** | Analysts / Finance | Deep dive into costs, delays, resource allocation, and root cause analysis. |
| **4** | **Risks & Governance** | Risk Managers | Risk matrix, compliance tracking, and mitigation plans. |
| **5** | **What-If Scenarios** | Strategy Team | Interactive simulation of budget cuts, delays, or capacity changes. |
| **6** | **SaaS Teaser** | Demo Users | Showcase of the Powalyze platform capabilities and embedding features. |

## General Design Principles (UX Premium)
- **Theme:** Dark/Light hybrid (or specific Corporate Theme: White/Black/Gold).
- **Navigation:** Custom page navigation bar (hidden native tabs).
- **Interactivity:** Drill-through enabled on all summary charts.
- **Tooltips:** Custom report page tooltips for granular details on hover.
- **RLS:** All pages utilize `Dim_Client[ClientId]` for data isolation.

---
*See individual page specifications for detailed implementation requirements.*