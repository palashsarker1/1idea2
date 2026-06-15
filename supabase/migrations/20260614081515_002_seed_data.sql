-- Seed initial tools
INSERT INTO public.tools (name, slug, description, category, icon, featured, rating, downloads) VALUES
('AI Code Generator', 'ai-code-generator', 'Generate production-ready code from natural language descriptions. Supports multiple programming languages and frameworks.', 'Development', '💻', true, 4.8, 15420),
('Content Writer Pro', 'content-writer-pro', 'Create compelling blog posts, marketing copy, and social media content with AI assistance.', 'Content', '✍️', true, 4.7, 12350),
('Image Creator', 'image-creator', 'Generate stunning images and graphics using state-of-the-art AI models. Perfect for marketing and design.', 'Design', '🎨', true, 4.9, 21350),
('Data Analyzer', 'data-analyzer', 'Analyze datasets and generate insights automatically. Upload CSV, Excel, or connect to databases.', 'Analytics', '📊', false, 4.5, 8920),
('Website Builder', 'website-builder', 'Build beautiful, responsive websites with AI assistance. No coding required.', 'Development', '🌐', false, 4.6, 16780),
('SEO Optimizer', 'seo-optimizer', 'Optimize your content for search engines with AI-powered suggestions and analysis.', 'Marketing', '🔍', false, 4.4, 7540),
('Email Writer', 'email-writer', 'Write professional emails in seconds. Perfect for business communication.', 'Content', '📧', false, 4.3, 5430),
('Logo Designer', 'logo-designer', 'Create unique logos for your brand using AI generation.', 'Design', '🎯', false, 4.5, 9320),
('Social Media Manager', 'social-media-manager', 'Plan, schedule, and generate social media content automatically.', 'Marketing', '📱', false, 4.2, 6890),
('Video Script Writer', 'video-script-writer', 'Generate engaging video scripts for YouTube, TikTok, and more.', 'Content', '🎬', false, 4.4, 4560),
('API Documentation', 'api-documentation', 'Auto-generate comprehensive API documentation from your code.', 'Development', '📚', false, 4.6, 3240),
('Pitch Deck Creator', 'pitch-deck-creator', 'Create stunning pitch decks for investors automatically.', 'Marketing', '📊', false, 4.3, 2180),
('Translation Tool', 'translation-tool', 'Translate content to 100+ languages with context-aware AI.', 'Content', '🌍', false, 4.5, 12870),
('Chart Generator', 'chart-generator', 'Create beautiful charts and visualizations from your data.', 'Analytics', '📈', false, 4.4, 7620),
('Chat Bot Builder', 'chat-bot-builder', 'Build intelligent chatbots for customer support and engagement.', 'Development', '🤖', false, 4.7, 18540),
('Research Assistant', 'research-assistant', 'AI-powered research tool that summarizes papers and finds relevant sources.', 'Content', '📚', false, 4.3, 4320),
('Ad Copy Generator', 'ad-copy-generator', 'Create high-converting ad copy for Google, Facebook, and more.', 'Marketing', '📢', false, 4.5, 8920),
('UI Designer', 'ui-designer', 'Generate UI mockups and design systems using AI.', 'Design', '🖼️', false, 4.4, 12350),
('SQL Query Builder', 'sql-query-builder', 'Convert natural language to SQL queries automatically.', 'Analytics', '🗄️', false, 4.6, 5640),
('Business Name Generator', 'business-name-generator', 'Generate unique and memorable business name ideas.', 'Marketing', '💡', false, 4.2, 15670);

-- Seed sample posts
INSERT INTO public.posts (title, slug, content, excerpt, category, tags, image, seo_title, seo_description, status, published_at, views) VALUES
('The Future of AI in Content Creation', 'future-of-ai-content-creation', '# The Future of AI in Content Creation\n\nAI is revolutionizing how we create and consume content. From automated writing assistants to image generation, the possibilities are endless.\n\n## Key Trends\n\n1. **Automated Writing**: AI can now write blog posts, emails, and even books.\n2. **Image Generation**: DALL-E and Midjourney are changing design workflows.\n3. **Video Creation**: AI-powered video tools are emerging rapidly.\n\n## What This Means for Creators\n\nCreators need to adapt and leverage AI tools to stay competitive. The key is using AI as an assistant, not a replacement.\n\n## Conclusion\n\nThe future is bright for AI-assisted content creation. Embrace the technology and experiment with new tools.', 'Explore how AI is revolutionizing the way we create and consume content, and what it means for creators.', 'AI', ARRAY['AI', 'content', 'future', 'technology'], 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', 'The Future of AI in Content Creation | 1Idea Blog', 'Discover how AI is transforming content creation and what it means for creators worldwide.', 'published', NOW() - INTERVAL '10 days', 1234),

('10 Tips for Scaling Your Startup with AI Tools', 'scaling-your-startup', '# 10 Tips for Scaling Your Startup\n\nScaling a startup is challenging, but AI tools can help accelerate growth.\n\n## 1. Automate Repetitive Tasks\n\nUse AI to handle routine tasks like email responses and data entry.\n\n## 2. Improve Customer Support\n\nAI chatbots can handle 80% of customer queries automatically.\n\n## 3. Optimize Marketing\n\nAI-powered analytics help you target the right audience.\n\n## 4. Streamline Development\n\nAI code generators speed up development cycles.\n\n## 5. Enhance Decision Making\n\nData-driven insights from AI help make better decisions.\n\n## 6-10. Read the full article for more tips.', 'Practical strategies for leveraging AI to accelerate growth and optimize operations at any stage.', 'Business', ARRAY['startup', 'AI', 'growth', 'business'], 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800', 'Scaling Your Startup with AI Tools | 1Idea', 'Learn 10 practical tips for using AI tools to scale your startup faster and more efficiently.', 'published', NOW() - INTERVAL '5 days', 892),

('Design Trends to Watch in 2024', 'design-trends-2024', '# Design Trends to Watch in 2024\n\nFrom glassmorphism to AI-generated graphics, discover the design trends shaping the digital landscape.\n\n## Glassmorphism 2.0\n\nThe frosted glass aesthetic continues to evolve with more sophisticated blur effects.\n\n## AI-Generated Graphics\n\nAI tools are now creating original artwork that rivals human designers.\n\n## 3D Elements\n\nThree-dimensional design elements are becoming mainstream in web design.\n\n## Bold Typography\n\nOversized, impactful typography is making a statement.\n\n## Gradient Revival\n\nMulti-color gradients are back and better than ever.', 'From glassmorphism to AI-generated graphics, discover the design trends shaping the digital landscape.', 'Design', ARRAY['design', 'trends', '2024', 'UI'], 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800', 'Design Trends 2024: What to Expect | 1Idea Blog', 'Explore the latest design trends for 2024 and how to incorporate them into your projects.', 'published', NOW() - INTERVAL '2 days', 567);

-- Seed analytics sample data
INSERT INTO public.analytics (page, event_type, metadata)
SELECT 
  (ARRAY['/', '/features', '/tools', '/blog', '/pricing', '/about', '/contact'])[1 + floor(random() * 7)::int],
  'page_view',
  '{"referrer": "google.com"}'::jsonb
FROM generate_series(1, 500);

-- Create an admin user trigger function
CREATE OR REPLACE FUNCTION set_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Set first user as admin
  IF (SELECT COUNT(*) FROM public.users) = 0 THEN
    NEW.role := 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_first_user_admin
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION set_admin_role();