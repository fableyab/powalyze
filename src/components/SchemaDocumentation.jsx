import React from 'react';
import { Database, Shield, FileText, Lock } from 'lucide-react';

const SchemaDocumentation = () => {
  return (
    <div className="space-y-8 p-8 bg-[#0F0F0F] text-white">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-[#D4A574]">Supabase Architecture Documentation</h1>
        <p className="text-slate-400 mt-2">Comprehensive guide to Powalyze OS Data Layer (v1.0)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-[#141414] p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Database className="text-blue-500" /> Core Schema Design
          </h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><strong className="text-white">Tenants:</strong> Root isolation unit. All data is scoped by <code>tenant_id</code>.</li>
            <li><strong className="text-white">Profiles:</strong> Extends Supabase Auth. Stores roles (Admin, PMO, Viewer) and locale.</li>
            <li><strong className="text-white">Projects:</strong> Central entity. Tracks status (Enum), budget (Numeric), and risk.</li>
            <li><strong className="text-white">Audit Logs:</strong> Immutable append-only log of all critical actions.</li>
          </ul>
        </section>

        <section className="bg-[#141414] p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Shield className="text-emerald-500" /> RLS Security Policies
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <span className="text-[#D4A574]">SELECT</span>
              <p>Strictly scoped to <code>current_tenant_id()</code>.</p>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <span className="text-blue-400">INSERT/UPDATE</span>
              <p>Role-based. Admins/PMOs have full write access. Contributors limited to specific tables.</p>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <span className="text-red-400">DELETE</span>
              <p>Restricted to Admins only. Soft-delete recommended for most entities.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#141414] p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Lock className="text-amber-500" /> Compliance & Audit
          </h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><strong>FINMA Ready:</strong> All changes to Projects and Documents trigger automatic audit log entries via PL/pgSQL triggers.</li>
            <li><strong>Data Retention:</strong> Audit logs kept for 7 years. Snapshots for 3 years.</li>
            <li><strong>Encryption:</strong> Sensitive connector configs (API keys) stored using pgcrypto (planned).</li>
          </ul>
        </section>

        <section className="bg-[#141414] p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FileText className="text-purple-500" /> Deployment
            </h2>
            <div className="text-sm text-slate-300 space-y-2">
                <p>Migration strategy follows a 4-step process:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Schema DDL (Tables & Types)</li>
                    <li>RLS Policies Enablement</li>
                    <li>Trigger Creation</li>
                    <li>Helper Functions & Views</li>
                </ol>
                <p className="mt-4 text-xs text-slate-500">Run the provided `schema.sql` in Supabase SQL Editor to initialize.</p>
            </div>
        </section>
      </div>
    </div>
  );
};

export default SchemaDocumentation;