-- ============================================
-- 1IDEA - COMPLETE PRODUCTION SQL SCHEMA
-- ============================================
-- Run this entire script in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/rogattescsfclgwpqhdm/sql/new
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STEP 1: CREATE OR UPGRADE USERS TO PROFILES
-- ============================================

-- Create profiles table (handles new installations)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'editor')),
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  company TEXT,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise')),
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If migrating from 'users' table, rename it (ignore error if already done)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
      ALTER TABLE public.users RENAME TO profiles;
    END IF;
  END IF;
END $$;

-- Add missing columns if they don't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active';

-- ============================================
-- STEP 2: POSTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  image TEXT,
  category TEXT DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  affiliate_link TEXT,
  disclosure TEXT DEFAULT 'This post may contain affiliate links.',
  seo_title TEXT,
  seo_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- ============================================
-- STEP 3: TOOLS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.tools (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  component_code TEXT,
  icon TEXT,
  category TEXT DEFAULT 'General',
  seo_meta JSONB DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT true,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- ============================================
-- STEP 4: ANALYTICS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  page_path TEXT NOT NULL,
  event_type TEXT DEFAULT 'page_view',
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  device TEXT,
  country TEXT,
  browser TEXT,
  os TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rename column if needed
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'page' AND table_schema = 'public') THEN
    ALTER TABLE public.analytics RENAME COLUMN page TO page_path;
  END IF;
END $$;

ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS device TEXT;
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS browser TEXT;
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS os TEXT;

-- ============================================
-- STEP 5: SETTINGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.settings (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  brand_name TEXT DEFAULT '1Idea',
  logo_url TEXT,
  favicon_url TEXT,
  theme_config JSONB DEFAULT '{}',
  seo_defaults JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  contact_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 6: CONTACTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 7: SUBSCRIBERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ============================================
-- STEP 8: SUBSCRIPTIONS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 9: ACTIVITY LOGS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 10: NOTIFICATIONS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 11: FEATURE REQUESTS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.feature_requests (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'planned', 'in_progress', 'completed', 'declined')),
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 12: FEATURE REQUEST VOTES TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.feature_request_votes (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  feature_request_id UUID REFERENCES public.feature_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(feature_request_id, user_id)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_request_votes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS FOR RLS
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_admin_only()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================
-- DROP OLD POLICIES AND CREATE NEW ONES
-- ============================================

DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- PROFILES policies
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT TO public USING (true);
CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated USING (is_admin_only());

-- POSTS policies
CREATE POLICY "posts_published_public" ON public.posts FOR SELECT TO public USING (status = 'published');
CREATE POLICY "posts_authenticated_read" ON public.posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "posts_insert_authenticated" ON public.posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "posts_own_update" ON public.posts FOR UPDATE TO authenticated USING (author_id = auth.uid() OR is_admin());
CREATE POLICY "posts_admin_delete" ON public.posts FOR DELETE TO authenticated USING (is_admin());

-- TOOLS policies
CREATE POLICY "tools_active_public" ON public.tools FOR SELECT TO public USING (is_active = true OR is_active IS NULL);
CREATE POLICY "tools_authenticated_read" ON public.tools FOR SELECT TO authenticated USING (true);
CREATE POLICY "tools_admin_all" ON public.tools FOR ALL TO authenticated USING (is_admin());

-- ANALYTICS policies
CREATE POLICY "analytics_insert_authenticated" ON public.analytics FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "analytics_insert_anon" ON public.analytics FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "analytics_admin_read" ON public.analytics FOR SELECT TO authenticated USING (is_admin_only());

-- SETTINGS policies
CREATE POLICY "settings_public_read" ON public.settings FOR SELECT TO public USING (true);
CREATE POLICY "settings_admin_all" ON public.settings FOR ALL TO authenticated USING (is_admin_only());

-- CONTACTS policies
CREATE POLICY "contacts_insert_public" ON public.contacts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "contacts_admin_all" ON public.contacts FOR ALL TO authenticated USING (is_admin_only());

-- SUBSCRIBERS policies
CREATE POLICY "subscribers_insert_public" ON public.subscribers FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "subscribers_admin_all" ON public.subscribers FOR ALL TO authenticated USING (is_admin_only());

-- SUBSCRIPTIONS policies
CREATE POLICY "subscriptions_own_read" ON public.subscriptions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "subscriptions_own_insert" ON public.subscriptions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "subscriptions_own_update" ON public.subscriptions FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "subscriptions_admin_all" ON public.subscriptions FOR ALL TO authenticated USING (is_admin_only());

-- ACTIVITY_LOGS policies
CREATE POLICY "activity_logs_own_read" ON public.activity_logs FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "activity_logs_admin_all" ON public.activity_logs FOR ALL TO authenticated USING (is_admin_only());

-- NOTIFICATIONS policies
CREATE POLICY "notifications_own_all" ON public.notifications FOR ALL TO authenticated USING (user_id = auth.uid());

-- FEATURE_REQUESTS policies
CREATE POLICY "feature_requests_public_read" ON public.feature_requests FOR SELECT TO public USING (true);
CREATE POLICY "feature_requests_authenticated_insert" ON public.feature_requests FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "feature_requests_admin_update" ON public.feature_requests FOR UPDATE TO authenticated USING (is_admin());

-- FEATURE_REQUEST_VOTES policies
CREATE POLICY "votes_public_read" ON public.feature_request_votes FOR SELECT TO public USING (true);
CREATE POLICY "votes_authenticated_insert" ON public.feature_request_votes FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "votes_own_delete" ON public.feature_request_votes FOR DELETE TO authenticated USING (user_id = auth.uid());

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_is_active ON public.tools(is_active);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON public.tools(featured);

CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON public.analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics(event_type);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);

CREATE INDEX IF NOT EXISTS idx_feature_requests_status ON public.feature_requests(status);
CREATE INDEX IF NOT EXISTS idx_feature_requests_votes ON public.feature_requests(votes DESC);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_feature_requests_updated_at ON public.feature_requests;
CREATE TRIGGER update_feature_requests_updated_at BEFORE UPDATE ON public.feature_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- USER SIGNUP TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- AUTO-CREATE FREE SUBSCRIPTION
-- ============================================

CREATE OR REPLACE FUNCTION create_free_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_subscription ON public.profiles;
CREATE TRIGGER on_profile_created_subscription AFTER INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION create_free_subscription();

-- ============================================
-- VOTE COUNT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_feature_request_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.feature_requests SET votes = votes + 1 WHERE id = NEW.feature_request_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.feature_requests SET votes = votes - 1 WHERE id = OLD.feature_request_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_vote_change ON public.feature_request_votes;
CREATE TRIGGER on_vote_change AFTER INSERT OR DELETE ON public.feature_request_votes FOR EACH ROW EXECUTE FUNCTION update_feature_request_votes();

-- ============================================
-- INSERT DEFAULT SETTINGS
-- ============================================

INSERT INTO public.settings (brand_name, seo_defaults, social_links)
VALUES (
  '1Idea',
  '{"title": "1Idea - Turn Ideas Into Reality", "description": "AI-powered platform for turning your ideas into reality with cutting-edge tools and resources."}',
  '{"twitter": "https://twitter.com/1idea", "linkedin": "https://linkedin.com/company/1idea"}'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- COMPLETE!
-- ============================================
-- Your 1Idea database is now production-ready.
