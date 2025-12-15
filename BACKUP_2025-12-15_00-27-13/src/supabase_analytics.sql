-- Analytics Tables Schema

-- 1. SESSIONS
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  session_end TIMESTAMP WITH TIME ZONE,
  device_info JSONB,
  geo_info JSONB,
  page_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PAGE VIEWS
CREATE TABLE IF NOT EXISTS public.analytics_page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  duration_ms INTEGER,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. EVENTS
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  category TEXT,
  label TEXT,
  value NUMERIC,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ERRORS
CREATE TABLE IF NOT EXISTS public.analytics_errors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  error_name TEXT NOT NULL,
  message TEXT,
  stack_trace TEXT,
  component_stack TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PERFORMANCE
CREATE TABLE IF NOT EXISTS public.analytics_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE SET NULL,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  rating TEXT, -- 'good', 'needs-improvement', 'poor'
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS POLICIES
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_performance ENABLE ROW LEVEL SECURITY;

-- Allow insert for everyone (anon included for tracking)
CREATE POLICY "Enable insert for all" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON public.analytics_page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON public.analytics_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON public.analytics_errors FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON public.analytics_performance FOR INSERT WITH CHECK (true);

-- Allow read only for admins (in a real app, strict rules apply)
CREATE POLICY "Admins can view analytics" ON public.analytics_events FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
);