-- ============================================
-- 1IDEA - COMPLETE PRODUCTION SEED DATA
-- ============================================
-- Run this AFTER the production-schema-complete.sql
-- in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/rogattescsfclgwpqhdm/sql/new
-- ============================================

-- ============================================
-- AI TOOLS (40 Total)
-- ============================================

INSERT INTO public.tools (name, slug, description, category, icon, featured, rating, downloads, is_active) VALUES
-- Featured Tools
('AI Code Generator', 'ai-code-generator', 'Generate production-ready code from natural language descriptions. Supports multiple programming languages and frameworks.', 'Development', '💻', true, 4.8, 15420, true),
('Content Writer Pro', 'content-writer-pro', 'Create compelling blog posts, marketing copy, and social media content with AI assistance.', 'Content', '✍️', true, 4.7, 12350, true),
('Image Creator', 'image-creator', 'Generate stunning images and graphics using state-of-the-art AI models. Perfect for marketing and design.', 'Design', '🎨', true, 4.9, 21350, true),
('Product Description Writer', 'product-description-writer', 'Create compelling product descriptions for e-commerce and marketplaces.', 'Marketing', '🛍️', true, 4.8, 9870, true),
('Code Reviewer', 'code-reviewer', 'AI-powered code review tool that identifies bugs, security issues, and best practices.', 'Development', '🔍', true, 4.9, 12450, true),
('Newsletter Writer', 'newsletter-writer', 'Create engaging newsletter content that keeps subscribers hooked.', 'Marketing', '📬', true, 4.7, 7890, true),

-- Standard Tools
('Data Analyzer', 'data-analyzer', 'Analyze datasets and generate insights automatically. Upload CSV, Excel, or connect to databases.', 'Analytics', '📊', false, 4.5, 8920, true),
('Website Builder', 'website-builder', 'Build beautiful, responsive websites with AI assistance. No coding required.', 'Development', '🌐', false, 4.6, 16780, true),
('SEO Optimizer', 'seo-optimizer', 'Optimize your content for search engines with AI-powered suggestions and analysis.', 'Marketing', '🔍', false, 4.4, 7540, true),
('Email Writer', 'email-writer', 'Write professional emails in seconds. Perfect for business communication.', 'Content', '📧', false, 4.3, 5430, true),
('Logo Designer', 'logo-designer', 'Create unique logos for your brand using AI generation.', 'Design', '🎯', false, 4.5, 9320, true),
('Social Media Manager', 'social-media-manager', 'Plan, schedule, and generate social media content automatically.', 'Marketing', '📱', false, 4.2, 6890, true),
('Video Script Writer', 'video-script-writer', 'Generate engaging video scripts for YouTube, TikTok, and more.', 'Content', '🎬', false, 4.4, 4560, true),
('API Documentation', 'api-documentation', 'Auto-generate comprehensive API documentation from your code.', 'Development', '📚', false, 4.6, 3240, true),
('Pitch Deck Creator', 'pitch-deck-creator', 'Create stunning pitch decks for investors automatically.', 'Marketing', '📊', false, 4.3, 2180, true),
('Translation Tool', 'translation-tool', 'Translate content to 100+ languages with context-aware AI.', 'Content', '🌍', false, 4.5, 12870, true),
('Chart Generator', 'chart-generator', 'Create beautiful charts and visualizations from your data.', 'Analytics', '📈', false, 4.4, 7620, true),
('Chat Bot Builder', 'chat-bot-builder', 'Build intelligent chatbots for customer support and engagement.', 'Development', '🤖', false, 4.7, 18540, true),
('Research Assistant', 'research-assistant', 'AI-powered research tool that summarizes papers and finds relevant sources.', 'Content', '📚', false, 4.3, 4320, true),
('Ad Copy Generator', 'ad-copy-generator', 'Create high-converting ad copy for Google, Facebook, and more.', 'Marketing', '📢', false, 4.5, 8920, true),
('UI Designer', 'ui-designer', 'Generate UI mockups and design systems using AI.', 'Design', '🖼️', false, 4.4, 12350, true),
('SQL Query Builder', 'sql-query-builder', 'Convert natural language to SQL queries automatically.', 'Analytics', '🗄️', false, 4.6, 5640, true),
('Business Name Generator', 'business-name-generator', 'Generate unique and memorable business name ideas.', 'Marketing', '💡', false, 4.2, 15670, true),
('Text Summarizer', 'text-summarizer', 'Summarize long articles, documents, and text into concise summaries. Perfect for research and content curation.', 'Content', '📝', false, 4.6, 6730, true),
('Meeting Notes Generator', 'meeting-notes-generator', 'Transform meeting recordings or transcripts into organized, actionable notes.', 'Productivity', '🗓️', false, 4.4, 3210, true),
('Legal Document Generator', 'legal-document-generator', 'Generate contracts, agreements, and legal documents with AI assistance.', 'Business', '⚖️', false, 4.3, 1890, true),
('Grammar Checker', 'grammar-checker', 'Advanced grammar, spelling, and style checker for professional writing.', 'Content', '✏️', false, 4.7, 15620, true),
('Podcast Show Notes', 'podcast-show-notes', 'Generate detailed show notes and timestamps from podcast transcripts.', 'Content', '🎙️', false, 4.5, 2340, true),
('Press Release Writer', 'press-release-writer', 'Create professional press releases for announcements and events.', 'Marketing', '📰', false, 4.3, 1560, true),
('Invoice Generator', 'invoice-generator', 'Create professional invoices and billing documents automatically.', 'Business', '🧾', false, 4.5, 4230, true),
('Job Description Creator', 'job-description-creator', 'Write compelling job descriptions that attract top talent.', 'Business', '👥', false, 4.4, 2890, true),
('Recipe Generator', 'recipe-generator', 'Generate creative recipes based on ingredients you have available.', 'Lifestyle', '🍳', false, 4.6, 8970, true),
('Cold Email Writer', 'cold-email-writer', 'Write personalized cold emails that get responses.', 'Marketing', '📧', false, 4.4, 5670, true),
('Testimonial Writer', 'testimonial-writer', 'Generate authentic testimonials and reviews for products and services.', 'Marketing', '⭐', false, 4.2, 1230, true),
('Book Summary Generator', 'book-summary-generator', 'Create comprehensive summaries of books and publications.', 'Content', '📚', false, 4.5, 4120, true),
('Real Estate Listing', 'real-estate-listing', 'Generate compelling property listings and descriptions.', 'Business', '🏠', false, 4.3, 2340, true),
('User Story Generator', 'user-story-generator', 'Create user stories and acceptance criteria for agile development.', 'Development', '📋', false, 4.6, 3450, true),
('Privacy Policy Generator', 'privacy-policy-generator', 'Generate GDPR-compliant privacy policies for your website.', 'Business', '🔒', false, 4.4, 8760, true),
('Meta Tag Generator', 'meta-tag-generator', 'Generate optimized meta tags for better SEO rankings.', 'Marketing', '🏷️', false, 4.5, 6230, true),
('Interview Questions', 'interview-questions', 'Generate relevant interview questions for any role or position.', 'Business', '❓', false, 4.5, 5890, true)
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  icon = EXCLUDED.icon,
  featured = EXCLUDED.featured,
  rating = EXCLUDED.rating,
  downloads = EXCLUDED.downloads,
  is_active = EXCLUDED.is_active;

-- ============================================
-- BLOG POSTS (10 Total)
-- ============================================

INSERT INTO public.posts (title, slug, content, excerpt, category, tags, image, seo_title, seo_description, status, published_at, views) VALUES
('The Future of AI in Content Creation', 'future-of-ai-content-creation',
'# The Future of AI in Content Creation

AI is revolutionizing how we create and consume content. From automated writing assistants to image generation, the possibilities are endless.

## Key Trends

1. **Automated Writing**: AI can now write blog posts, emails, and even books.
2. **Image Generation**: DALL-E and Midjourney are changing design workflows.
3. **Video Creation**: AI-powered video tools are emerging rapidly.

## What This Means for Creators

Creators need to adapt and leverage AI tools to stay competitive. The key is using AI as an assistant, not a replacement.

## Conclusion

The future is bright for AI-assisted content creation. Embrace the technology and experiment with new tools.',
'Explore how AI is revolutionizing the way we create and consume content, and what it means for creators.',
'AI', ARRAY['AI', 'content', 'future', 'technology'],
'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
'The Future of AI in Content Creation | 1Idea Blog',
'Discover how AI is transforming content creation and what it means for creators worldwide.',
'published', NOW() - INTERVAL '10 days', 1234),

('10 Tips for Scaling Your Startup with AI Tools', 'scaling-your-startup',
'# 10 Tips for Scaling Your Startup

Scaling a startup is challenging, but AI tools can help accelerate growth.

## 1. Automate Repetitive Tasks
Use AI to handle routine tasks like email responses and data entry.

## 2. Improve Customer Support
AI chatbots can handle 80% of customer queries automatically.

## 3. Optimize Marketing
AI-powered analytics help you target the right audience.

## 4. Streamline Development
AI code generators speed up development cycles.

## 5. Enhance Decision Making
Data-driven insights from AI help make better decisions.',
'Practical strategies for leveraging AI to accelerate growth and optimize operations at any stage.',
'Business', ARRAY['startup', 'AI', 'growth', 'business'],
'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
'Scaling Your Startup with AI Tools | 1Idea',
'Learn 10 practical tips for using AI tools to scale your startup faster and more efficiently.',
'published', NOW() - INTERVAL '5 days', 892),

('Design Trends to Watch in 2024', 'design-trends-2024',
'# Design Trends to Watch in 2024

From glassmorphism to AI-generated graphics, discover the design trends shaping the digital landscape.

## Glassmorphism 2.0
The frosted glass aesthetic continues to evolve with more sophisticated blur effects.

## AI-Generated Graphics
AI tools are now creating original artwork that rivals human designers.

## 3D Elements
Three-dimensional design elements are becoming mainstream in web design.',
'From glassmorphism to AI-generated graphics, discover the design trends shaping the digital landscape.',
'Design', ARRAY['design', 'trends', '2024', 'UI'],
'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
'Design Trends 2024: What to Expect | 1Idea Blog',
'Explore the latest design trends for 2024 and how to incorporate them into your projects.',
'published', NOW() - INTERVAL '2 days', 567),

('How AI is Transforming Small Business Operations', 'ai-transforming-small-business',
'# How AI is Transforming Small Business Operations

Small businesses are increasingly adopting AI tools to streamline operations, reduce costs, and compete with larger enterprises.

## Key Benefits

1. **Automation**: AI automates repetitive tasks like data entry and scheduling
2. **Customer Service**: Chatbots provide 24/7 support
3. **Analytics**: Better insights into customer behavior
4. **Marketing**: Personalized campaigns at scale

## Getting Started

The key is to start small. Pick one area of your business where AI can make an immediate impact.',
'Discover how small businesses are leveraging AI tools to compete with larger enterprises and automate operations.',
'Business', ARRAY['AI', 'small business', 'automation', 'operations'],
'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
'How AI is Transforming Small Business | 1Idea',
'Learn how AI tools are helping small businesses automate operations and compete effectively.',
'published', NOW() - INTERVAL '3 days', 456),

('The Complete Guide to Prompt Engineering', 'guide-to-prompt-engineering',
'# The Complete Guide to Prompt Engineering

Prompt engineering is the art and science of crafting effective prompts to get the best results from AI models.

## What is Prompt Engineering?

Prompt engineering involves carefully structuring your requests to AI systems to produce optimal outputs.

## Best Practices

1. **Be Specific**: Vague prompts produce vague results
2. **Provide Context**: Give the AI relevant background information
3. **Use Examples**: Show the AI what you want
4. **Iterate**: Refine your prompts based on results',
'Master the art of prompt engineering to get better results from AI tools.',
'AI', ARRAY['AI', 'prompts', 'prompt engineering', 'tutorial'],
'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
'Prompt Engineering Guide | 1Idea',
'Complete guide to writing effective AI prompts for better results.',
'published', NOW() - INTERVAL '7 days', 789),

('Building Your First AI Application', 'building-first-ai-app',
'# Building Your First AI Application

Creating an AI-powered application is easier than ever with modern tools and APIs.

## Prerequisites
- Basic programming knowledge
- Understanding of APIs
- Idea for your application

## Step 1: Define Your Use Case
What problem will your AI app solve? Common use cases include content generation, image analysis, customer support automation, and data analysis.',
'A beginner-friendly guide to building AI-powered applications.',
'Development', ARRAY['AI', 'development', 'programming', 'APIs'],
'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
'Build Your First AI App | 1Idea',
'Step-by-step guide to creating AI applications for beginners.',
'published', NOW() - INTERVAL '1 day', 234),

('The Rise of Generative AI in Creative Industries', 'generative-ai-creative-industries',
'# The Rise of Generative AI in Creative Industries

Generative AI is revolutionizing creative fields from graphic design to music production.

## Impact on Different Industries

### Graphic Design
AI tools can now generate logos, illustrations, and marketing materials.

### Music Production
AI assists with composition, mixing, and mastering.',
'Explore how generative AI is transforming creative industries.',
'Design', ARRAY['AI', 'creativity', 'design', 'art'],
'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
'AI in Creative Industries | 1Idea',
'How generative AI is helping creative professionals work more efficiently.',
'published', NOW() - INTERVAL '14 days', 567),

('Marketing Automation with AI: A 2024 Overview', 'marketing-automation-ai-2024',
'# Marketing Automation with AI: A 2024 Overview

AI-powered marketing automation is transforming how businesses reach and engage customers.

## Key capabilities
- Email personalization
- Social media scheduling
- Customer segmentation
- Predictive analytics
- Chatbot support',
'Comprehensive overview of AI marketing automation trends and tools for 2024.',
'Marketing', ARRAY['AI', 'marketing', 'automation', '2024'],
'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
'AI Marketing Automation 2024 | 1Idea',
'How AI is transforming marketing automation for better ROI.',
'published', NOW() - INTERVAL '21 days', 345),

('Cybersecurity Best Practices for AI Applications', 'cybersecurity-ai-applications',
'# Cybersecurity Best Practices for AI Applications

As AI adoption grows, security considerations become increasingly important.

## Key Security Concerns
- Data privacy
- Model integrity
- API security
- Access control',
'Essential security practices for building secure AI applications.',
'Development', ARRAY['security', 'AI', 'cybersecurity', 'compliance'],
'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
'AI Cybersecurity Guide | 1Idea',
'Best practices for securing your AI applications and data.',
'published', NOW() - INTERVAL '30 days', 278),

('The Psychology of AI: How Humans Interact with Intelligent Machines', 'psychology-ai-human-interaction',
'# The Psychology of AI: How Humans Interact with Intelligent Machines

Understanding human-AI interaction is key to designing effective AI systems.

## Key Concepts
- Trust in AI systems
- Anthropomorphizing machines
- Cognitive load reduction
- Emotional responses to AI',
'Understanding the psychological aspects of human-AI interaction.',
'AI', ARRAY['AI', 'psychology', 'UX', 'design'],
'https://images.pexels.com/photos/3735436/pexels-photo-3735436.jpeg?auto=compress&cs=tinysrgb&w=800',
'Psychology of AI | 1Idea',
'How human psychology affects AI adoption and interaction patterns.',
'published', NOW() - INTERVAL '45 days', 198)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image = EXCLUDED.image,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at;

-- ============================================
-- FEATURE REQUESTS (8 Total)
-- ============================================

INSERT INTO public.feature_requests (title, description, status, votes) VALUES
('Dark Mode Support', 'Add a dark mode option for users who prefer a darker interface.', 'planned', 45),
('API Access for Pro Users', 'Allow Pro users to access tools via REST API.', 'in_progress', 89),
('Team Collaboration', 'Enable team accounts with shared tool usage and analytics.', 'planned', 56),
('Custom Tool Creation', 'Allow users to create and save their own custom AI tool configurations.', 'pending', 34),
('Export Reports', 'Add ability to export analytics reports as PDF or CSV.', 'completed', 23),
('Mobile App', 'Create native mobile applications for iOS and Android.', 'planned', 112),
('Webhook Integrations', 'Send webhook notifications when AI tasks complete.', 'pending', 28),
('Bulk Processing', 'Process multiple files or requests simultaneously.', 'in_progress', 67)
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE ANALYTICS DATA (500 events)
-- ============================================

INSERT INTO public.analytics (page_path, event_type, metadata)
SELECT
  (ARRAY['/', '/features', '/tools', '/blog', '/pricing', '/about', '/contact', '/signup', '/login'])[1 + floor(random() * 9)::int],
  'page_view',
  jsonb_build_object('referrer', (ARRAY['google.com', 'twitter.com', 'linkedin.com', 'direct', 'facebook.com'])[1 + floor(random() * 5)::int])
FROM generate_series(1, 500);

-- ============================================
-- COMPLETE! Your 1Idea database is now seeded.
-- ============================================
