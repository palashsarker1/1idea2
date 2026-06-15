import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Linkedin } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.seo_title || `${post.title} | 1Idea Blog`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get post and increment views
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post || (post.status !== 'published' && post.status !== 'archived')) {
    notFound();
  }

  // Increment views
  await supabase
    .from('posts')
    .update({ views: post.views + 1 })
    .eq('id', post.id);

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="py-4 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rainbow-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-rainbow-purple/10 text-rainbow-purple text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_at || post.created_at).toLocaleDateString(
                  'en-US',
                  { month: 'long', day: 'numeric', year: 'numeric' }
                )}
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                5 min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600">{post.excerpt}</p>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Key Answer for AEO */}
          <div className="glass-card rounded-2xl p-6 border border-gray-100 mb-8">
            <h2 className="font-semibold text-gray-900 mb-2">Key Takeaways</h2>
            <p className="text-gray-600">
              {post.excerpt} This article explores the topic in-depth with practical
              insights and actionable advice.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Affiliate Disclosure */}
          {post.affiliate_link && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">{post.disclosure}</p>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Share this article</span>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Structured Data for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.published_at,
            dateModified: post.updated_at,
            author: {
              '@type': 'Organization',
              name: '1Idea',
            },
            publisher: {
              '@type': 'Organization',
              name: '1Idea',
              logo: {
                '@type': 'ImageObject',
                url: 'https://1idea.ai/logo.png',
              },
            },
          }),
        }}
      />
    </div>
  );
}
