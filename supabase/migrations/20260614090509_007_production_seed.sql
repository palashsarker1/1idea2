-- ============================================
-- PRODUCTION SEED DATA
-- ============================================

-- Add more AI tools (30+ total tools)
INSERT INTO public.tools (name, slug, description, category, icon, featured, rating, downloads, is_active) VALUES
('Text Summarizer', 'text-summarizer', 'Summarize long articles, documents, and text into concise summaries. Perfect for research and content curation.', 'Content', '📝', false, 4.6, 6730, true),
('Meeting Notes Generator', 'meeting-notes-generator', 'Transform meeting recordings or transcripts into organized, actionable notes.', 'Productivity', '🗓️', false, 4.4, 3210, true),
('Legal Document Generator', 'legal-document-generator', 'Generate contracts, agreements, and legal documents with AI assistance.', 'Business', '⚖️', false, 4.3, 1890, true),
('Grammar Checker', 'grammar-checker', 'Advanced grammar, spelling, and style checker for professional writing.', 'Content', '✏️', false, 4.7, 15620, true),
('Product Description Writer', 'product-description-writer', 'Create compelling product descriptions for e-commerce and marketplaces.', 'Marketing', '🛍️', true, 4.8, 9870, true),
('Podcast Show Notes', 'podcast-show-notes', 'Generate detailed show notes and timestamps from podcast transcripts.', 'Content', '🎙️', false, 4.5, 2340, true),
('Press Release Writer', 'press-release-writer', 'Create professional press releases for announcements and events.', 'Marketing', '📰', false, 4.3, 1560, true),
('Code Reviewer', 'code-reviewer', 'AI-powered code review tool that identifies bugs, security issues, and best practices.', 'Development', '🔍', true, 4.9, 12450, true),
('Invoice Generator', 'invoice-generator', 'Create professional invoices and billing documents automatically.', 'Business', '🧾', false, 4.5, 4230, true),
('Job Description Creator', 'job-description-creator', 'Write compelling job descriptions that attract top talent.', 'Business', '👥', false, 4.4, 2890, true),
('Recipe Generator', 'recipe-generator', 'Generate creative recipes based on ingredients you have available.', 'Lifestyle', '🍳', false, 4.6, 8970, true),
('Cold Email Writer', 'cold-email-writer', 'Write personalized cold emails that get responses.', 'Marketing', '📧', false, 4.4, 5670, true),
('Testimonial Writer', 'testimonial-writer', 'Generate authentic testimonials and reviews for products and services.', 'Marketing', '⭐', false, 4.2, 1230, true),
('Book Summary Generator', 'book-summary-generator', 'Create comprehensive summaries of books and publications.', 'Content', '📚', false, 4.5, 4120, true),
('Newsletter Writer', 'newsletter-writer', 'Create engaging newsletter content that keeps subscribers hooked.', 'Marketing', '📬', true, 4.7, 7890, true),
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

-- Add more blog posts
INSERT INTO public.posts (title, slug, content, excerpt, category, tags, image, seo_title, seo_description, status, published_at, views) VALUES
('How AI is Transforming Small Business Operations', 'ai-transforming-small-business', '# How AI is Transforming Small Business Operations\n\nSmall businesses are increasingly adopting AI tools to streamline operations, reduce costs, and compete with larger enterprises.\n\n## Key Benefits\n\n1. **Automation**: AI automates repetitive tasks like data entry and scheduling\n2. **Customer Service**: Chatbots provide 24/7 support\n3. **Analytics**: Better insights into customer behavior\n4. **Marketing**: Personalized campaigns at scale\n\n## Getting Started\n\nThe key is to start small. Pick one area of your business where AI can make an immediate impact, such as customer support or social media management.\n\n## Conclusion\n\nAI is no longer just for big tech companies. Small businesses that embrace these tools will gain a significant competitive advantage.', 'Discover how small businesses are leveraging AI tools to compete with larger enterprises and automate operations.', 'Business', ARRAY['AI', 'small business', 'automation', 'operations'], 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', 'How AI is Transforming Small Business | 1Idea', 'Learn how AI tools are helping small businesses automate operations and compete effectively.', 'published', NOW() - INTERVAL '3 days', 456),

('The Complete Guide to Prompt Engineering', 'guide-to-prompt-engineering', '# The Complete Guide to Prompt Engineering\n\nPrompt engineering is the art and science of crafting effective prompts to get the best results from AI models.\n\n## What is Prompt Engineering?\n\nPrompt engineering involves carefully structuring your requests to AI systems to produce optimal outputs.\n\n## Best Practices\n\n1. **Be Specific**: Vague prompts produce vague results\n2. **Provide Context**: Give the AI relevant background information\n3. **Use Examples**: Show the AI what you want\n4. **Iterate**: Refine your prompts based on results\n\n## Advanced Techniques\n\n- Chain-of-thought prompting\n- Few-shot learning\n- Role-playing prompts\n- Structured output requests\n\n## Conclusion\n\nMastering prompt engineering will dramatically improve your AI outputs.', 'Master the art of prompt engineering to get better results from AI tools.', 'AI', ARRAY['AI', 'prompts', 'prompt engineering', 'tutorial'], 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', 'Prompt Engineering Guide | 1Idea', 'Complete guide to writing effective AI prompts for better results.', 'published', NOW() - INTERVAL '7 days', 789),

('Building Your First AI Application', 'building-first-ai-app', '# Building Your First AI Application\n\nCreating an AI-powered application is easier than ever with modern tools and APIs.\n\n## Prerequisites\n\n- Basic programming knowledge\n- Understanding of APIs\n- Idea for your application\n\n## Step 1: Define Your Use Case\n\nWhat problem will your AI app solve? Common use cases include:\n- Content generation\n- Image analysis\n- Customer support automation\n- Data analysis\n\n## Step 2: Choose Your AI Service\n\nConsider factors like:\n- API capabilities\n- Pricing\n- Documentation quality\n- Community support\n\n## Step 3: Build and Test\n\nStart with a prototype, gather feedback, and iterate.\n\n## Conclusion\n\nBuilding with AI is accessible to developers of all skill levels.', 'A beginner-friendly guide to building AI-powered applications.', 'Development', ARRAY['AI', 'development', 'programming', 'APIs'], 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800', 'Build Your First AI App | 1Idea', 'Step-by-step guide to creating AI applications for beginners.', 'published', NOW() - INTERVAL '1 day', 234),

('The Rise of Generative AI in Creative Industries', 'generative-ai-creative-industries', '# The Rise of Generative AI in Creative Industries\n\nGenerative AI is revolutionizing creative fields from graphic design to music production.\n\n## Impact on Different Industries\n\n### Graphic Design\nAI tools can now generate logos, illustrations, and marketing materials.\n\n### Music Production\nAI assists with composition, mixing, and mastering.\n\n### Writing\nContent generation tools help writers draft articles, stories, and scripts.\n\n### Film Production\nAI assists with storyboarding, visual effects, and editing.\n\n## The Human Element\n\nWhile AI can assist with creation, human creativity and judgment remain essential.\n\n## Conclusion\n\nAI is augmenting rather than replacing human creativity.', 'Explore how generative AI is transforming creative industries.', 'Design', ARRAY['AI', 'creativity', 'design', 'art'], 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800', 'AI in Creative Industries | 1Idea', 'How generative AI is helping creative professionals work more efficiently.', 'published', NOW() - INTERVAL '14 days', 567),

('Marketing Automation with AI: A 2024 Overview', 'marketing-automation-ai-2024', '# Marketing Automation with AI: A 2024 Overview\n\nAI-powered marketing automation is transforming how businesses reach and engage customers.\n\n## Key capabilities\n\n- Email personalization\n- Social media scheduling\n- Customer segmentation\n- Predictive analytics\n- Chatbot support\n\n## Top Tools\n\n1. **Email Marketing**: AI optimizes send times and content\n2. **Social Media**: Auto-generate posts and schedule optimally\n3. **Advertising**: AI optimizes bidding and targeting\n\n## ROI Impact\n\nBusinesses report 30-50% improvement in key metrics after implementing AI marketing tools.\n\n## Conclusion\n\nMarketing automation with AI is essential for modern businesses.', 'Comprehensive overview of AI marketing automation trends and tools for 2024.', 'Marketing', ARRAY['AI', 'marketing', 'automation', '2024'], 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800', 'AI Marketing Automation 2024 | 1Idea', 'How AI is transforming marketing automation for better ROI.', 'published', NOW() - INTERVAL '21 days', 345),

('Cybersecurity Best Practices for AI Applications', 'cybersecurity-ai-applications', '# Cybersecurity Best Practices for AI Applications\n\nAs AI adoption grows, security considerations become increasingly important.\n\n## Key Security Concerns\n\n- Data privacy\n- Model integrity\n- API security\n- Access control\n\n## Best Practices\n\n1. Encrypt sensitive data\n2. Use secure APIs\n3. Implement rate limiting\n4. Regular security audits\n5. Monitor for anomalies\n\n## Compliance\n\nEnsure your AI applications comply with GDPR, CCPA, and other regulations.\n\n## Conclusion\n\nSecurity should be built into AI applications from the start.', 'Essential security practices for building secure AI applications.', 'Development', ARRAY['security', 'AI', 'cybersecurity', 'compliance'], 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800', 'AI Cybersecurity Guide | 1Idea', 'Best practices for securing your AI applications and data.', 'published', NOW() - INTERVAL '30 days', 278),

('The Psychology of AI: How Humans Interact with Intelligent Machines', 'psychology-ai-human-interaction', '# The Psychology of AI: How Humans Interact with Intelligent Machines\n\nUnderstanding human-AI interaction is key to designing effective AI systems.\n\n## Key Concepts\n\n- Trust in AI systems\n- Anthropomorphizing machines\n- Cognitive load reduction\n- Emotional responses to AI\n\n## Design Implications\n\n- Clear communication of AI capabilities\n- Transparent decision-making\n- User control and override options\n\n## Research Findings\n\nStudies show users prefer AI systems that explain their reasoning.\n\n## Conclusion\n\nGood AI design considers both technical capability and human psychology.', 'Understanding the psychological aspects of human-AI interaction.', 'AI', ARRAY['AI', 'psychology', 'UX', 'design'], 'https://images.pexels.com/photos/3735436/pexels-photo-3735436.jpeg?auto=compress&cs=tinysrgb&w=800', 'Psychology of AI | 1Idea', 'How human psychology affects AI adoption and interaction patterns.', 'published', NOW() - INTERVAL '45 days', 198)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  excerpt = EXCLUDED.excerpt,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image = EXCLUDED.image,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at;

-- Add sample feature requests
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