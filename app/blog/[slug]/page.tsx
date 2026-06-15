import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | 1Idea Blog',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : '',
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

// JSON-LD structured data for SEO
function generateArticleSchema(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://1idea.io',
    },
    publisher: {
      '@type': 'Organization',
      name: '1Idea',
      logo: {
        '@type': 'ImageObject',
        url: 'https://1idea.io/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://1idea.io/blog/${post.slug}`,
    },
    keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : '',
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const articleSchema = generateArticleSchema(post);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-20">
        {/* Hero Section */}
        <header className="relative">
          {/* Cover Image */}
          <div className="h-[40vh] lg:h-[50vh] relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" />
          </div>

          {/* Article Header */}
          <div className="relative -mt-32 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-8">
            <div className="glass-card-rainbow rounded-3xl p-6 lg:p-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-gray-900 transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-gray-400 truncate">{post.category}</span>
              </nav>

              {/* Category & Reading Time */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-rainbow-purple/10 text-rainbow-purple hover:bg-rainbow-purple/20">
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.updatedAt !== post.publishedAt && (
                  <span className="text-gray-400">
                    Updated: {formatDate(post.updatedAt)}
                  </span>
                )}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-6">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-rainbow-purple/10 hover:text-rainbow-purple transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8">
                <Link href="/blog">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    All Articles
                  </Button>
                </Link>
                <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://1idea.io/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </Link>
                <Button variant="ghost" className="gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-rainbow-purple prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-code:text-rainbow-purple prose-pre:bg-gray-900"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-12 lg:py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="glass-card border-0 overflow-hidden card-3d hover:shadow-lg transition-all h-full">
                      <div className="aspect-[16/10] bg-gray-100">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-5">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-rainbow-purple transition-colors">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(relatedPost.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedPost.readingTime} min
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 hero-bg">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Ideas?
            </h2>
            <p className="text-gray-600 mb-8">
              Start using AI-powered tools to turn your ideas into reality. Join thousands of creators and entrepreneurs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools">
                <Button className="rainbow-button-solid px-8">
                  Explore AI Tools
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour
