
# Powalyze.ch Architecture Document - Phase 0

## 1. Executive Summary
**Project Scope**: Creation of a high-performance, secure, and scalable digital platform for Powalyze, a Swiss premium consulting firm.
**Objectives**:
- Deliver a "Swiss-grade" user experience (speed, precision, security).
- Establish a robust lead generation engine via dynamic content and interactive demos.
- Ensure strict compliance with Swiss data residency (nFADP/LPD) and financial regulations (FINMA).
**Timeline**: Phase 0 (Prep) -> Phase 1 (Infra/MVP) -> Phase 2 (Content) -> Phase 3 (Scale).

## 2. Technical Stack (Target Architecture)
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- **Backend**: NestJS (Microservices) + TypeORM.
- **Database**: PostgreSQL 16 (Managed Service).
- **CMS**: Strapi (Headless) for multilingual content management.
- **Infrastructure**: Exoscale (Geneva/Zurich) or Azure Switzerland North.
- **CDN**: Cloudflare Enterprise (WAF + Global CDN).
- **Analytics**: Matomo (Self-hosted in Switzerland).

## 3. Infrastructure Design
### High Availability & Sovereignty
- **Multi-Zone Deployment**: Application nodes distributed across Exoscale GVA-2 and ZRH-1 zones.
- **Load Balancing**: HAProxy / Azure App Gateway for traffic distribution.
- **Disaster Recovery**: RPO < 15min, RTO < 1h. Automated encrypted backups to S3-compatible storage (Swiss-based).

## 4. Security Architecture
- **Transport Security**: TLS 1.3 enforced, HSTS preload list.
- **WAF Rules**: OWASP Top 10 mitigation, rate limiting (100 req/min/IP), geo-blocking (allow-list focus).
- **Data Protection**: AES-256 encryption at rest, column-level encryption for sensitive PII.
- **Identity**: Azure AD B2C or Custom JWT with rotation.

## 5. Multilingual Strategy
- **Structure**: Sub-path routing (`/fr`, `/en`, `/de`).
- **SEO**: Automatic `hreflang` generation, `x-default` handling.
- **Content**: 1:1 mirroring of content structure enforced by CMS.

## 6. Power BI Integration
- **Security**: "App Owns Data" scenario. Server-side token generation via Service Principal.
- **Isolation**: Row-Level Security (RLS) dynamic mapping based on logged-in user's Tenant ID.
