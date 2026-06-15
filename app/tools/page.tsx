"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import type { Tool } from '@/lib/types';

const categories = [
  'All',
  'Development',
  'Content',
  'Design',
  'Analytics',
  'Marketing',
];

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchTools();
  }, []);

  async function fetchTools() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('featured', { ascending: false });

    if (!error && data) {
      setTools(data);
    }
    setLoading(false);
  }

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 hero-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              AI <span className="gradient-text-animated">Tools</span> Marketplace
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover powerful AI tools to supercharge your workflow. From content
              creation to development, we've got you covered.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search tools..."
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

      {/* Tools Grid */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-rainbow-purple border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No tools found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/tools/${tool.slug}`}>
                    <div className="glass-card-rainbow rounded-2xl p-6 h-full card-3d">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rainbow-purple via-rainbow-blue to-rainbow-cyan flex items-center justify-center">
                          <span className="text-2xl">
                            {tool.icon || '🛠️'}
                          </span>
                        </div>
                        {tool.featured && (
                          <span className="px-2 py-1 text-xs font-medium bg-rainbow-yellow/10 text-rainbow-yellow rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-rainbow-purple">{tool.category}</span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Star className="w-4 h-4 text-rainbow-yellow fill-rainbow-yellow" />
                          {tool.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
