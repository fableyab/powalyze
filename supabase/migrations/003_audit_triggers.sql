
-- Migration: 003_audit_triggers.sql
-- Description: Audit logging functions and triggers for strict compliance.

-- 1) GENERIC AUDIT LOG FUNCTION
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  v_tenant_id UUID;
  v_user_id UUID;
  v_entity_type TEXT;
  v_entity_id UUID;
  v_action TEXT;
  v_metadata JSONB;
BEGIN
  v_user_id := auth.uid();
  v_entity_type := TG_TABLE_NAME;
  v_action := TG_OP;

  -- Determine Tenant ID and Entity ID based on operation
  IF TG_OP = 'DELETE' THEN
    v_tenant_id := OLD.tenant_id;
    v_entity_id := OLD.id;
    v_metadata := jsonb_build_object('old_data', row_to_json(OLD));
  ELSIF TG_OP = 'UPDATE' THEN
    v_tenant_id := NEW.tenant_id;
    v_entity_id := NEW.id;
    v_metadata := jsonb_build_object('old_data', row_to_json(OLD), 'new_data', row_to_json(NEW));
  ELSE -- INSERT
    v_tenant_id := NEW.tenant_id;
    v_entity_id := NEW.id;
    v_metadata := jsonb_build_object('new_data', row_to_json(NEW));
  END IF;

  INSERT INTO public.audit_logs (tenant_id, user_id, action, entity_type, entity_id, severity, metadata)
  VALUES (v_tenant_id, v_user_id, v_action, v_entity_type, v_entity_id, 'info', v_metadata);

  RETURN NULL; -- Result is ignored for AFTER triggers
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2) SPECIFIC TRIGGERS
-- Projects
CREATE TRIGGER trg_audit_projects_insert AFTER INSERT ON public.projects FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_projects_update AFTER UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_projects_delete AFTER DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Workspaces
CREATE TRIGGER trg_audit_workspaces_insert AFTER INSERT ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_workspaces_update AFTER UPDATE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_workspaces_delete AFTER DELETE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Documents
CREATE TRIGGER trg_audit_documents_insert AFTER INSERT ON public.documents FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_documents_update AFTER UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_documents_delete AFTER DELETE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Connectors
CREATE TRIGGER trg_audit_connectors_insert AFTER INSERT ON public.connectors FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_connectors_update AFTER UPDATE ON public.connectors FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_connectors_delete AFTER DELETE ON public.connectors FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Data Imports
CREATE TRIGGER trg_audit_data_imports_insert AFTER INSERT ON public.data_imports FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
CREATE TRIGGER trg_audit_data_imports_update AFTER UPDATE ON public.data_imports FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- AI Insights
CREATE TRIGGER trg_audit_ai_insights_insert AFTER INSERT ON public.ai_insights FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
