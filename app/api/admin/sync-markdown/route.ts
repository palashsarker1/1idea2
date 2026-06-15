import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated and is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all markdown posts
    const slugs = getAllPostSlugs();
    const results = {
      total: slugs.length,
      synced: 0,
      skipped: 0,
      errors: [] as string[],
    };

    for (const slug of slugs) {
      try {
        const post = await getPostBySlug(slug);
        if (!post) continue;

        // Check if post already exists
        const { data: existingPost } = await supabase
          .from('posts')
          .select('id, updated_at')
          .eq('slug', post.slug)
          .single();

        const postData = {
          title: post.title,
          slug: post.slug,
          content: post.contentHtml,
          excerpt: post.excerpt,
          image: post.coverImage,
          category: post.category,
          tags: post.tags,
          seo_title: post.seoTitle,
          seo_description: post.seoDescription,
          status: post.status,
          published_at: post.status === 'published' ? post.publishedAt : null,
          updated_at: post.updatedAt,
        };

        if (existingPost) {
          // Update existing post if markdown is newer
          const markdownDate = new Date(post.updatedAt);
          const dbDate = new Date(existingPost.updated_at);

          if (markdownDate > dbDate) {
            const { error } = await supabase
              .from('posts')
              .update(postData)
              .eq('id', existingPost.id);

            if (error) {
              results.errors.push(`Failed to update ${slug}: ${error.message}`);
            } else {
              results.synced++;
            }
          } else {
            results.skipped++;
          }
        } else {
          // Insert new post
          const { error } = await supabase.from('posts').insert({
            ...postData,
            author_id: user.id,
          });

          if (error) {
            results.errors.push(`Failed to insert ${slug}: ${error.message}`);
          } else {
            results.synced++;
          }
        }
      } catch (error) {
        results.errors.push(`Error processing ${slug}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${results.synced} posts (${results.skipped} skipped, ${results.errors.length} errors)`,
      results,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync markdown posts' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all markdown posts
    const slugs = getAllPostSlugs();

    const markdownPosts = await Promise.all(
      slugs.map(async (slug) => {
        const post = await getPostBySlug(slug);
        return post ? { slug, title: post.title, status: post.status } : null;
      })
    );

    // Get all Supabase posts
    const { data: dbPosts } = await supabase
      .from('posts')
      .select('slug, title, status, updated_at');

    const comparison = {
      markdown: {
        total: markdownPosts.filter(Boolean).length,
        posts: markdownPosts.filter(Boolean),
      },
      database: {
        total: dbPosts?.length || 0,
        posts: dbPosts || [],
      },
      needsSync: markdownPosts.filter(Boolean).filter((mp) => {
        const dbPost = dbPosts?.find((dp) => dp.slug === mp?.slug);
        return !dbPost;
      }),
    };

    return NextResponse.json(comparison);
  } catch (error) {
    console.error('Comparison error:', error);
    return NextResponse.json(
      { error: 'Failed to compare posts' },
      { status: 500 }
    );
  }
}
