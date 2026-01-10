-- ============================================
-- MIGRATION: Ajouter colonnes pour gestion utilisateurs PRO
-- ============================================
-- Date: 2026-01-06
-- Description: Ajout de role, status, last_login, modules_access, powerbi_access
-- Pour la page Admin avec système de permissions avancé

-- 1. Ajouter colonne 'role' avec les nouveaux rôles suisses
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='role_new') THEN
        ALTER TABLE public.profiles ADD COLUMN role_new TEXT DEFAULT 'Collaborateur';
    END IF;
END $$;

-- 2. Ajouter colonne 'status' (active/inactive)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='status') THEN
        ALTER TABLE public.profiles ADD COLUMN status TEXT DEFAULT 'active';
    END IF;
END $$;

-- 3. Ajouter colonne 'last_login' pour suivi connexions
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='last_login') THEN
        ALTER TABLE public.profiles ADD COLUMN last_login TIMESTAMPTZ;
    END IF;
END $$;

-- 4. Ajouter colonnes prénom/nom séparés
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='first_name') THEN
        ALTER TABLE public.profiles ADD COLUMN first_name TEXT;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='last_name') THEN
        ALTER TABLE public.profiles ADD COLUMN last_name TEXT;
    END IF;
END $$;

-- 5. Ajouter colonne 'modules_access' (JSONB pour flexibilité)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='modules_access') THEN
        ALTER TABLE public.profiles ADD COLUMN modules_access JSONB DEFAULT '{"pmo": false, "finance": false, "risks": false, "reports": true}'::jsonb;
    END IF;
END $$;

-- 6. Ajouter colonne 'powerbi_access'
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='powerbi_access') THEN
        ALTER TABLE public.profiles ADD COLUMN powerbi_access BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 7. Ajouter colonne 'user_id' (référence auth.users)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='user_id') THEN
        ALTER TABLE public.profiles ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 8. Créer table 'user_invitations' pour suivi des invitations
CREATE TABLE IF NOT EXISTS public.user_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id),
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'Collaborateur',
    invited_by UUID REFERENCES public.profiles(id),
    invitation_token TEXT UNIQUE,
    expires_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    status TEXT DEFAULT 'pending', -- pending, accepted, expired, cancelled
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.user_invitations IS 'Suivi des invitations utilisateurs envoyées par email';

-- 9. Créer index pour performances
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role_new);
CREATE INDEX IF NOT EXISTS idx_profiles_last_login ON public.profiles(last_login);
CREATE INDEX IF NOT EXISTS idx_profiles_tenant ON public.profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.user_invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.user_invitations(invitation_token);

-- 10. Mettre à jour les contraintes
ALTER TABLE public.profiles 
    ADD CONSTRAINT check_status CHECK (status IN ('active', 'inactive', 'suspended'));

ALTER TABLE public.profiles 
    ADD CONSTRAINT check_role CHECK (role_new IN ('Admin', 'Manager', 'Collaborateur', 'Lecture seule'));

-- 11. Fonction pour mettre à jour last_login automatiquement
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles 
    SET last_login = NOW() 
    WHERE user_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Trigger sur auth.users pour mettre à jour last_login
DROP TRIGGER IF EXISTS trigger_update_last_login ON auth.users;
CREATE TRIGGER trigger_update_last_login
    AFTER UPDATE OF last_sign_in_at ON auth.users
    FOR EACH ROW
    WHEN (NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at)
    EXECUTE FUNCTION update_last_login();

-- 13. Fonction pour générer token d'invitation
CREATE OR REPLACE FUNCTION generate_invitation_token()
RETURNS TEXT AS $$
BEGIN
    RETURN encode(gen_random_bytes(32), 'base64');
END;
$$ LANGUAGE plpgsql;

-- 14. Vue pour statistiques utilisateurs
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    tenant_id,
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE status = 'active') as active_users,
    COUNT(*) FILTER (WHERE status = 'inactive') as inactive_users,
    COUNT(*) FILTER (WHERE role_new = 'Admin') as admins,
    COUNT(*) FILTER (WHERE role_new = 'Manager') as managers,
    COUNT(*) FILTER (WHERE role_new = 'Collaborateur') as collaborateurs,
    COUNT(*) FILTER (WHERE role_new = 'Lecture seule') as viewers,
    COUNT(*) FILTER (WHERE last_login >= NOW() - INTERVAL '24 hours') as logins_24h,
    COUNT(*) FILTER (WHERE last_login >= NOW() - INTERVAL '7 days') as logins_7d
FROM public.profiles
GROUP BY tenant_id;

COMMENT ON VIEW user_statistics IS 'Statistiques en temps réel pour la page Admin';

-- 15. Politique RLS pour user_invitations
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins peuvent gérer toutes les invitations"
ON public.user_invitations
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.user_id = auth.uid()
        AND profiles.role_new = 'Admin'
        AND profiles.tenant_id = user_invitations.tenant_id
    )
);

-- 16. Politique RLS pour profiles (lecture)
CREATE POLICY "Utilisateurs peuvent voir les profils de leur tenant"
ON public.profiles
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.user_id = auth.uid()
        AND p.tenant_id = profiles.tenant_id
    )
);

-- 17. Politique RLS pour profiles (modification - Admin only)
CREATE POLICY "Admins peuvent modifier les profils"
ON public.profiles
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.user_id = auth.uid()
        AND p.role_new = 'Admin'
        AND p.tenant_id = profiles.tenant_id
    )
);

-- 18. Politique RLS pour profiles (suppression - Admin only)
CREATE POLICY "Admins peuvent supprimer les profils"
ON public.profiles
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.user_id = auth.uid()
        AND p.role_new = 'Admin'
        AND p.tenant_id = profiles.tenant_id
    )
);

-- 19. Fonction pour nettoyer les invitations expirées
CREATE OR REPLACE FUNCTION cleanup_expired_invitations()
RETURNS void AS $$
BEGIN
    UPDATE public.user_invitations
    SET status = 'expired'
    WHERE status = 'pending'
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 20. Créer un job cron pour nettoyer les invitations (nécessite pg_cron)
-- À exécuter manuellement ou via un cron job externe :
-- SELECT cleanup_expired_invitations();

-- ============================================
-- DONNÉES DE TEST (optionnel)
-- ============================================

-- Créer un tenant de test si pas déjà existant
INSERT INTO public.tenants (id, name, slug, industry, country)
VALUES (
    'c0000000-0000-0000-0000-000000000001'::uuid,
    'Powalyze Demo',
    'powalyze-demo',
    'Technology',
    'Switzerland'
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- COMMANDES UTILES
-- ============================================

-- Voir tous les utilisateurs avec leurs rôles :
-- SELECT user_id, email, first_name, last_name, role_new, status, last_login 
-- FROM public.profiles 
-- ORDER BY created_at DESC;

-- Voir les statistiques :
-- SELECT * FROM user_statistics;

-- Voir les invitations en attente :
-- SELECT * FROM public.user_invitations WHERE status = 'pending';

-- Activer un utilisateur :
-- UPDATE public.profiles SET status = 'active' WHERE user_id = 'xxx';

-- Changer le rôle d'un utilisateur :
-- UPDATE public.profiles SET role_new = 'Admin' WHERE user_id = 'xxx';

-- Donner accès à Power BI :
-- UPDATE public.profiles SET powerbi_access = true WHERE user_id = 'xxx';

-- Configurer les modules d'un utilisateur :
-- UPDATE public.profiles 
-- SET modules_access = '{"pmo": true, "finance": true, "risks": true, "reports": true}'::jsonb 
-- WHERE user_id = 'xxx';
