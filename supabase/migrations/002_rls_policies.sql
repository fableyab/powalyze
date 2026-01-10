
-- Migration: 002_rls_policies.sql
-- Description: Enable RLS, Helper Functions, and define granular policies.

-- 1) ENABLE RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 2) HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.current_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_tenant_admin()
RETURNS BOOLEAN AS $$
  SELECT role IN ('admin', 'pmo') FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 3) SELECT POLICIES
CREATE POLICY "profiles_select_self" ON public.profiles FOR SELECT USING (id = auth.uid() OR is_tenant_admin());
CREATE POLICY "tenants_select_own" ON public.tenants FOR SELECT USING (id = public.current_tenant_id());
CREATE POLICY "projects_select_tenant" ON public.projects FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "workspaces_select_tenant" ON public.workspaces FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "workspace_projects_select_tenant" ON public.workspace_projects FOR SELECT USING (EXISTS (SELECT 1 FROM public.workspaces w WHERE w.id = workspace_projects.workspace_id AND w.tenant_id = public.current_tenant_id()));
CREATE POLICY "report_snapshots_select_tenant" ON public.report_snapshots FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "documents_select_tenant" ON public.documents FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "document_versions_select_tenant" ON public.document_versions FOR SELECT USING (EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_versions.document_id AND d.tenant_id = public.current_tenant_id()));
CREATE POLICY "connectors_select_tenant" ON public.connectors FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "data_imports_select_tenant" ON public.data_imports FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "ai_insights_select_tenant" ON public.ai_insights FOR SELECT USING (tenant_id = public.current_tenant_id());
CREATE POLICY "audit_logs_select_tenant" ON public.audit_logs FOR SELECT USING (tenant_id = public.current_tenant_id());

-- 4) INSERT POLICIES
CREATE POLICY "projects_insert_admin_pmo" ON public.projects FOR INSERT WITH CHECK (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "workspaces_insert_admin_pmo" ON public.workspaces FOR INSERT WITH CHECK (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "documents_insert_contributor" ON public.documents FOR INSERT WITH CHECK (
  public.current_role() IN ('admin', 'pmo', 'manager', 'contributor') AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "connectors_insert_admin" ON public.connectors FOR INSERT WITH CHECK (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "data_imports_insert_admin" ON public.data_imports FOR INSERT WITH CHECK (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "ai_insights_insert_admin" ON public.ai_insights FOR INSERT WITH CHECK (
  public.current_role() IN ('admin', 'pmo', 'manager') AND tenant_id = public.current_tenant_id()
);

-- 5) UPDATE POLICIES
CREATE POLICY "projects_update_admin_pmo_manager" ON public.projects FOR UPDATE USING (
  public.current_role() IN ('admin', 'pmo', 'manager') AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "workspaces_update_admin_pmo" ON public.workspaces FOR UPDATE USING (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "documents_update_owner_admin" ON public.documents FOR UPDATE USING (
  (uploaded_by = auth.uid() OR public.is_tenant_admin()) AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "connectors_update_admin" ON public.connectors FOR UPDATE USING (
  public.is_tenant_admin() AND tenant_id = public.current_tenant_id()
);

-- 6) DELETE POLICIES
CREATE POLICY "projects_delete_admin" ON public.projects FOR DELETE USING (
  public.current_role() = 'admin' AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "workspaces_delete_admin" ON public.workspaces FOR DELETE USING (
  public.current_role() = 'admin' AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "documents_delete_owner_admin" ON public.documents FOR DELETE USING (
  (uploaded_by = auth.uid() OR public.current_role() = 'admin') AND tenant_id = public.current_tenant_id()
);
CREATE POLICY "connectors_delete_admin" ON public.connectors FOR DELETE USING (
  public.current_role() = 'admin' AND tenant_id = public.current_tenant_id()
);
