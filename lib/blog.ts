import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  featured: boolean;
  status: string;
  content: string;
  contentHtml: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

function calculateReadingTime(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

function parseFrontmatter(fileContents: string, slug: string): BlogPost {
  const { data, content } = matter(fileContents);

  // Calculate reading time if not provided
  const calculatedReadingTime = data.readingTime || calculateReadingTime(content);

  // Parse keywords - handle both array and string formats
  let keywords: string[] = [];
  if (Array.isArray(data.keywords)) {
    keywords = data.keywords;
  } else if (typeof data.keywords === 'string') {
    keywords = data.keywords.split(',').map((k: string) => k.trim()).filter(Boolean);
  }

  // Parse tags - handle both array and string formats
  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags;
  } else if (typeof data.tags === 'string') {
    tags = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
  }

  return {
    slug: data.slug || slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    author: data.author || '1Idea Team',
    category: data.category || 'General',
    tags: tags,
    publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: data.updatedAt || new Date().toISOString().split('T')[0],
    readingTime: calculatedReadingTime,
    seoTitle: data.seoTitle || data.title || '',
    seoDescription: data.seoDescription || data.excerpt || '',
    keywords: keywords,
    featured: data.featured || false,
    status: data.status || 'draft',
    content: content,
    contentHtml: '', // Will be populated by markdown conversion
  };
}

async function convertMarkdownToHtml(content: string): Promise<string> {
  try {
    const result = await remark().use(html).process(content);
    return result.toString();
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return content;
  }
}

export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return [];
    }
    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

export function getAllPosts(): BlogPostSummary[] {
  const slugs = getAllPostSlugs();

  const posts = slugs
    .map((slug) => {
      try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const post = parseFrontmatter(fileContents, slug);

        // Only return published posts
        if (post.status !== 'published') return null;

        return {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          author: post.author,
          category: post.category,
          tags: post.tags,
          publishedAt: post.publishedAt,
          readingTime: post.readingTime,
          featured: post.featured,
        };
      } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPostSummary => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Try exact slug first
    let fullPath = path.join(contentDirectory, `${slug}.md`);

    // If not found, try to find by partial match
    if (!fs.existsSync(fullPath)) {
      const slugs = getAllPostSlugs();
      const matchingSlug = slugs.find((s) => s.includes(slug) || slug.includes(s));
      if (matchingSlug) {
        fullPath = path.join(contentDirectory, `${matchingSlug}.md`);
      } else {
        return null;
      }
    }

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const post = parseFrontmatter(fileContents, slug);
    post.contentHtml = await convertMarkdownToHtml(post.content);

    return post;
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export function getFeaturedPosts(): BlogPostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.featured).slice(0, 5);
}

export function getPostsByCategory(category: string): BlogPostSummary[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchPosts(query: string): BlogPostSummary[] {
  const allPosts = getAllPosts();
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

  if (searchTerms.length === 0) return allPosts;

  return allPosts.filter((post) => {
    const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(' ')}`.toLowerCase();
    return searchTerms.every((term) => searchText.includes(term));
  });
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 4): BlogPostSummary[] {
  const allPosts = getAllPosts();

  const related = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      // Same category is highly relevant
      if (post.category.toLowerCase() === currentPost.category.toLowerCase()) {
        score += 3;
      }

      // Shared tags increase relevance
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
      score += sharedTags.length;

      // Keyword overlap
      const sharedKeywords = post.title.toLowerCase().split(' ').filter((word) =>
        currentPost.title.toLowerCase().includes(word) && word.length > 3
      );
      score += sharedKeywords.length * 0.5;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set(allPosts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export function getPaginatedPosts(page: number = 1, postsPerPage: number = 9): {
  posts: BlogPostSummary[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
} {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

  return {
    posts,
    totalPages,
    currentPage,
    totalPosts,
  };
}

export function getPostsByYearMonth(): Record<string, BlogPostSummary[]> {
  const allPosts = getAllPosts();

  return allPosts.reduce((acc, post) => {
    const date = new Date(post.publishedAt);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(post);

    return acc;
  }, {} as Record<string, BlogPostSummary[]>);
}

export function getRecentPosts(limit: number = 5): BlogPostSummary[] {
  return getAllPosts().slice(0, limit);
}

export function getPostCount(): number {
  return getAllPostSlugs().filter((slug) => {
    try {
      const fullPath = path.join(contentDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const post = parseFrontmatter(fileContents, slug);
      return post.status === 'published';
    } catch {
      return false;
    }
  }).length;
}

// For static generation
export async function getAllPostsForStaticPaths(): Promise<{ params: { slug: string } }[]> {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    params: { slug },
  }));
}
