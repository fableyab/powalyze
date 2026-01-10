
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, ShieldAlert, Code2, Database } from 'lucide-react';

const CodeBlock = ({ title, code, language = 'javascript' }) => (
  <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 my-4">
    <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
      <span className="text-xs font-mono text-slate-400 uppercase">{title}</span>
      <Code2 className="h-4 w-4 text-slate-500" />
    </div>
    <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

const QueryPatterns = () => {
  return (
    <div className="space-y-8 p-6 bg-[#0F0F0F] text-slate-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-[#D4A574]">Supabase Query Patterns</h1>
        <p className="text-slate-400 mt-2">Security-first development guidelines for Powalyze OS</p>
      </div>

      <Tabs defaultValue="safe" className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="safe" className="data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-400">Safe Patterns</TabsTrigger>
          <TabsTrigger value="anti" className="data-[state=active]:bg-red-900/50 data-[state=active]:text-red-400">Anti-Patterns</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="safe" className="space-y-6 mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" /> Pattern 1: Tenant Isolation
              </CardTitle>
              <CardDescription className="text-slate-400">
                Although RLS enforces this, ALWAYS explicitly filter by tenant_id in your queries for redundancy and clarity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                title="React Query + Supabase Select" 
                code={`
// Good: Explicit tenant filtering (Double Safety)
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('tenant_id', currentTenantId) // <-- CRITICAL
  .order('created_at', { ascending: false });
                `} 
              />
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" /> Pattern 2: Audit-Ready Mutations
              </CardTitle>
              <CardDescription className="text-slate-400">
                Trust the database triggers to handle the logging, but handle the UI feedback properly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                title="Update with Toast Feedback" 
                code={`
const updateProject = async (id, updates) => {
  // 1. Perform Update
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select(); // Return data to confirm validity

  if (error) throw error;

  // 2. Triggers automatically log to 'audit_logs' table
  // 3. UI Notification
  toast.success("Project updated successfully");
};
                `} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anti" className="space-y-6 mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <XCircle className="h-5 w-5" /> Anti-Pattern: Client-Side Security
              </CardTitle>
              <CardDescription className="text-slate-400">
                NEVER rely on frontend checks for security. RLS is the only source of truth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                title="DANGEROUS CODE" 
                code={`
// BAD: Checking role in JS before sending request
if (user.role === 'admin') {
  // Attackers can bypass this JS check easily!
  await supabase.from('projects').delete().eq('id', 123);
}

// GOOD: Just send the request. RLS Policy "projects_delete_admin"
// will reject it at the database level if the user isn't an admin.
await supabase.from('projects').delete().eq('id', 123);
                `} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-6">
            <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-blue-400">Indexing Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        <li><strong>Primary Key:</strong> UUID v4 (Default)</li>
                        <li><strong>Foreign Keys:</strong> Always indexed (<code>tenant_id</code>, <code>project_id</code>)</li>
                        <li><strong>Filter Columns:</strong> <code>status</code>, <code>created_at</code>, <code>risk</code></li>
                        <li><strong>JSONB:</strong> Use GIN indexes if querying inside JSON blobs (e.g., <code>metadata</code>)</li>
                    </ul>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6 mt-6">
             <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-amber-400">GDPR & FINMA Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                    <CodeBlock 
                        title="Calling GDPR Export Function" 
                        code={`
// Export all user data (Profile + Logs + Docs)
const { data, error } = await supabase
  .rpc('fn_gdpr_export_user_data', { 
    target_user_id: userId 
  });

if (data) {
  downloadJSON(data, 'user_export_gdpr.json');
}
                        `} 
                    />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QueryPatterns;
