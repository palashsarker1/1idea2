import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownPost {
  slug: string;
  content: string;
  frontmatter: {
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
  };
}

export function getAllPosts(): MarkdownPost[] {
  const postsDirectory = path.join(contentDirectory, 'posts');

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const posts = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = file.replace(/\.mdx?$/, '');

      return {
        slug,
        content,
        frontmatter: {
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          category: data.category,
          tags: data.tags,
          image: data.image,
          affiliate_link: data.affiliate_link,
          disclosure: data.disclosure,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          author: data.author,
        },
      };
    });

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): MarkdownPost | null {
  const postsDirectory = path.join(contentDirectory, 'posts');
  const extensions = ['.md', '.mdx'];

  for (const ext of extensions) {
    const filePath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        frontmatter: {
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          category: data.category,
          tags: data.tags,
          image: data.image,
          affiliate_link: data.affiliate_link,
          disclosure: data.disclosure,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          author: data.author,
        },
      };
    }
  }

  return null;
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.frontmatter.category).filter(Boolean));
  return Array.from(categories) as string[];
}

export function getPostsByCategory(category: string): MarkdownPost[] {
  const posts = getAllPosts();
  return posts.filter((p) => p.frontmatter.category === category);
}
