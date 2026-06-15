"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import type { Post } from '@/lib/types';

const categories = ['All', 'AI', 'Technology', 'Business', 'Design', 'Marketing'];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 hero-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              1Idea <span className="gradient-text-animated">Blog</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and stories about AI, innovation, and building
              the future of idea creation.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 input-glass"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? 'rainbow-button-solid'
                    : 'hover:border-rainbow-purple/30'
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-rainbow-purple border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No articles found.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {filteredPosts[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link href={`/blog/${filteredPosts[0].slug}`}>
                    <div className="glass-card-rainbow rounded-3xl overflow-hidden card-3d">
                      {filteredPosts[0].image && (
                        <div className="aspect-[21/9] bg-gray-100">
                          <img
                            src={filteredPosts[0].image}
                            alt={filteredPosts[0].title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-rainbow-purple/10 text-rainbow-purple text-sm font-medium">
                            {filteredPosts[0].category}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              filteredPosts[0].published_at || filteredPosts[0].created_at
                            ).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-rainbow-purple transition-colors">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                          {filteredPosts[0].excerpt}
                        </p>
                        <div className="flex items-center text-rainbow-purple font-medium group">
                          Read full article
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Rest of Posts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="glass-card rounded-2xl overflow-hidden card-3d border border-gray-100 hover:border-rainbow-purple/30 transition-all">
                        {post.image && (
                          <div className="aspect-[16/10] bg-gray-100">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Clock className="w-3 h-3" />
                              5 min read
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-rainbow-purple transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
