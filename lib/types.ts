export interface Profile {
  id: string;
  email: string;
  name: string | null;
  full_name: string | null;
  role: 'user' | 'admin' | 'editor';
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  company: string | null;
  subscription_plan: 'free' | 'pro' | 'enterprise';
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

// Alias for backward compatibility
export type User = Profile;

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  image: string | null;
  category: string;
  tags: string[];
  affiliate_link: string | null;
  disclosure: string;
  seo_title: string | null;
  seo_description: string | null;
  status: 'draft' | 'published' | 'archived';
  author_id: string | null;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  component_code: string | null;
  icon: string | null;
  category: string;
  seo_meta: Record<string, unknown>;
  seo_title: string | null;
  seo_description: string | null;
  featured: boolean;
  is_active: boolean;
  downloads: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  page_path: string;
  event_type: string;
  user_id: string | null;
  session_id: string | null;
  referrer: string | null;
  user_agent: string | null;
  device: string | null;
  country: string | null;
  browser: string | null;
  os: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  type: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface FeatureRequest {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  status: 'pending' | 'planned' | 'in_progress' | 'completed' | 'declined';
  votes: number;
  created_at: string;
  updated_at: string;
}

export interface FeatureRequestVote {
  id: string;
  feature_request_id: string;
  user_id: string;
  created_at: string;
}

export interface Settings {
  id: string;
  brand_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  theme_config: Record<string, unknown>;
  seo_defaults: Record<string, unknown>;
  social_links: Record<string, unknown>;
  contact_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
  image?: string;
  affiliate_link?: string;
  disclosure?: string;
  seo_title?: string;
  seo_description?: string;
  author?: string;
}
