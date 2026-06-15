import { NextResponse } from 'next/server';
import {
  getAllPosts,
  getAllCategories,
  getAllTags,
  getPostBySlug,
  getPostCount,
} from '@/lib/blog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const count = searchParams.get('count');

  try {
    // Get single post by slug
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    // Get post count only
    if (count === 'true') {
      const postCount = getPostCount();
      return NextResponse.json({ count: postCount });
    }

    // Get all posts with metadata
    const posts = getAllPosts();
    const categories = getAllCategories();
    const tags = getAllTags();

    return NextResponse.json({
      posts,
      categories,
      tags,
      totalPosts: posts.length,
    });
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    );
  }
}
