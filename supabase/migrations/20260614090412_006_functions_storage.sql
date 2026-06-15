-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Function to get user role
CREATE OR REPLACE FUNCTION get_user_role(check_user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = check_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.posts 
  SET views = views + 1 
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get analytics summary
CREATE OR REPLACE FUNCTION get_analytics_summary(days_interval INTEGER DEFAULT 30)
RETURNS TABLE (
  date DATE,
  total_views BIGINT,
  unique_visitors BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_views,
    COUNT(DISTINCT session_id) as unique_visitors
  FROM public.analytics
  WHERE created_at >= NOW() - (days_interval || ' days')::INTERVAL
  GROUP BY DATE(created_at)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get top pages
CREATE OR REPLACE FUNCTION get_top_pages(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  page_path TEXT,
  views BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.page_path,
    COUNT(*) as views
  FROM public.analytics a
  GROUP BY a.page_path
  ORDER BY views DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT DEFAULT NULL,
  p_resource_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
) RETURNS void AS $$
BEGIN
  INSERT INTO public.activity_logs (user_id, action, resource_type, resource_id, metadata)
  VALUES (p_user_id, p_action, p_resource_type, p_resource_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT DEFAULT NULL,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STORAGE BUCKETS SETUP
-- ============================================

-- Create storage buckets (using API approach since SQL storage is limited)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('post-images', 'post-images', true),
  ('tool-icons', 'tool-icons', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars bucket
CREATE POLICY "avatars_public_read" ON storage.objects FOR SELECT
  TO public USING (bucket_id = 'avatars');

CREATE POLICY "avatars_authenticated_upload" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "avatars_own_update" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'avatars');

CREATE POLICY "avatars_own_delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'avatars');

-- Storage policies for post-images bucket
CREATE POLICY "post_images_public_read" ON storage.objects FOR SELECT
  TO public USING (bucket_id = 'post-images');

CREATE POLICY "post_images_authenticated_upload" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'post-images');

CREATE POLICY "post_images_admin_manage" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'post-images' AND is_admin());

CREATE POLICY "post_images_admin_delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'post-images' AND is_admin());

-- Storage policies for tool-icons bucket  
CREATE POLICY "tool_icons_public_read" ON storage.objects FOR SELECT
  TO public USING (bucket_id = 'tool-icons');

CREATE POLICY "tool_icons_admin_upload" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'tool-icons' AND is_admin());

CREATE POLICY "tool_icons_admin_manage" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'tool-icons' AND is_admin());

CREATE POLICY "tool_icons_admin_delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'tool-icons' AND is_admin());