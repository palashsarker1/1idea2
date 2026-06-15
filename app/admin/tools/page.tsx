"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  featured: boolean;
  downloads: number;
  rating: number;
}

export default function AdminToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTools();
  }, []);

  async function fetchTools() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tools')
      .select('id, name, slug, category, featured, downloads, rating')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch tools');
    } else {
      setTools(data || []);
    }
    setLoading(false);
  }

  async function deleteTool(id: string) {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('tools').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete tool');
    } else {
      toast.success('Tool deleted successfully');
      setTools(tools.filter((t) => t.id !== id));
    }
  }

  async function toggleFeatured(id: string, featured: boolean) {
    const supabase = createClient();
    const { error } = await supabase
      .from('tools')
      .update({ featured: !featured })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update tool');
    } else {
      setTools(tools.map((t) => (t.id === id ? { ...t, featured: !featured } : t)));
      toast.success(featured ? 'Tool unfeatured' : 'Tool featured');
    }
  }

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tools</h1>
          <p className="text-gray-600 mt-1">Manage AI tools marketplace</p>
        </div>
        <Link href="/admin/tools/new">
          <Button className="rainbow-button-solid">
            <Plus className="w-4 h-4 mr-2" />
            New Tool
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 input-glass"
        />
      </div>

      {/* Tools Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-rainbow-purple border-t-transparent rounded-full animate-spin" />
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
              <div className="glass-card rounded-2xl p-6 border border-gray-100 hover:shadow-3d transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-500">{tool.category}</p>
                  </div>
                  <button
                    onClick={() => toggleFeatured(tool.id, tool.featured)}
                    className={`p-2 rounded-lg transition-colors ${
                      tool.featured
                        ? 'bg-rainbow-yellow/20 text-rainbow-yellow'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${tool.featured ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{tool.downloads.toLocaleString()} downloads</span>
                  <span>{tool.rating.toFixed(1)} rating</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/tools/${tool.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTool(tool.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
