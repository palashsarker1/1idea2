-- ============================================
-- RLS POLICIES AND SECURITY
-- ============================================

-- Helper function to check admin/editor role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Helper function to check admin only
CREATE OR REPLACE FUNCTION is_admin_only()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop old policies (they reference 'users' table name)
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
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT
  TO public USING (true);

CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL
  TO authenticated USING (is_admin_only());

-- POSTS policies
CREATE POLICY "posts_published_public" ON public.posts FOR SELECT
  TO public USING (status = 'published');

CREATE POLICY "posts_authenticated_read" ON public.posts FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "posts_insert_authenticated" ON public.posts FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "posts_own_update" ON public.posts FOR UPDATE
  TO authenticated USING (author_id = auth.uid() OR is_admin());

CREATE POLICY "posts_admin_delete" ON public.posts FOR DELETE
  TO authenticated USING (is_admin());

-- TOOLS policies
CREATE POLICY "tools_active_public" ON public.tools FOR SELECT
  TO public USING (is_active = true OR is_active IS NULL);

CREATE POLICY "tools_authenticated_read" ON public.tools FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "tools_admin_all" ON public.tools FOR ALL
  TO authenticated USING (is_admin());

-- ANALYTICS policies  
CREATE POLICY "analytics_insert_authenticated" ON public.analytics FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "analytics_insert_anon" ON public.analytics FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "analytics_admin_read" ON public.analytics FOR SELECT
  TO authenticated USING (is_admin_only());

-- SETTINGS policies
CREATE POLICY "settings_public_read" ON public.settings FOR SELECT
  TO public USING (true);

CREATE POLICY "settings_admin_all" ON public.settings FOR ALL
  TO authenticated USING (is_admin_only());

-- CONTACTS policies
CREATE POLICY "contacts_insert_public" ON public.contacts FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "contacts_admin_all" ON public.contacts FOR ALL
  TO authenticated USING (is_admin_only());

-- SUBSCRIBERS policies
CREATE POLICY "subscribers_insert_public" ON public.subscribers FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "subscribers_admin_all" ON public.subscribers FOR ALL
  TO authenticated USING (is_admin_only());

-- SUBSCRIPTIONS policies
CREATE POLICY "subscriptions_own_read" ON public.subscriptions FOR SELECT
  TO authenticated USING (user_id = auth.uid());

CREATE POLICY "subscriptions_own_insert" ON public.subscriptions FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "subscriptions_own_update" ON public.subscriptions FOR UPDATE
  TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "subscriptions_admin_all" ON public.subscriptions FOR ALL
  TO authenticated USING (is_admin_only());

-- ACTIVITY_LOGS policies
CREATE POLICY "activity_logs_own_read" ON public.activity_logs FOR SELECT
  TO authenticated USING (user_id = auth.uid());

CREATE POLICY "activity_logs_admin_all" ON public.activity_logs FOR ALL
  TO authenticated USING (is_admin_only());

-- NOTIFICATIONS policies
CREATE POLICY "notifications_own_all" ON public.notifications FOR ALL
  TO authenticated USING (user_id = auth.uid());

-- FEATURE_REQUESTS policies
CREATE POLICY "feature_requests_public_read" ON public.feature_requests FOR SELECT
  TO public USING (true);

CREATE POLICY "feature_requests_authenticated_insert" ON public.feature_requests FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "feature_requests_admin_update" ON public.feature_requests FOR UPDATE
  TO authenticated USING (is_admin());

-- FEATURE_REQUEST_VOTES policies
CREATE POLICY "votes_public_read" ON public.feature_request_votes FOR SELECT
  TO public USING (true);

CREATE POLICY "votes_authenticated_insert" ON public.feature_request_votes FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "votes_own_delete" ON public.feature_request_votes FOR DELETE
  TO authenticated USING (user_id = auth.uid());