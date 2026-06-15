"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, RefreshCw, Check, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  views: number;
  created_at: string;
}

interface SyncResult {
  total: number;
  synced: number;
  skipped: number;
  errors: string[];
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [markdownCount, setMarkdownCount] = useState(0);

  useEffect(() => {
    fetchPosts();
    fetchMarkdownCount();
  }, []);

  async function fetchPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, status, category, views, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch posts');
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  async function fetchMarkdownCount() {
    try {
      const response = await fetch('/api/blog?count=true');
      const data = await response.json();
      setMarkdownCount(data.count || 0);
    } catch (error) {
      console.error('Failed to fetch markdown count:', error);
    }
  }

  async function syncMarkdownPosts() {
    setSyncing(true);
    setSyncResult(null);

    try {
      const response = await fetch('/api/admin/sync-markdown', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setSyncResult(data.results);
        toast.success(data.message);
        fetchPosts(); // Refresh posts list
      } else {
        toast.error(data.error || 'Sync failed');
      }
    } catch (error) {
      toast.error('Failed to sync markdown posts');
      console.error('Sync error:', error);
    } finally {
      setSyncing(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete post');
    } else {
      toast.success('Post deleted successfully');
      setPosts(posts.filter((p) => p.id !== id));
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog content</p>
        </div>
        <div className="flex gap-3">
          {/* Sync Markdown Dialog */}
          <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Sync Markdown ({markdownCount})
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Import Markdown Posts
                </DialogTitle>
                <DialogDescription>
                  Sync all markdown files from <code className="bg-gray-100 px-1 rounded">/content/blog/</code> to the database.
                  Existing posts will be updated if the markdown file is newer.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <Card className="bg-gray-50 border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Markdown files found:</span>
                      <Badge variant="secondary">{markdownCount} posts</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Database posts:</span>
                      <Badge variant="secondary">{posts.length} posts</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Potential new imports:</span>
                      <Badge className="bg-rainbow-purple/10 text-rainbow-purple">
                        {Math.max(0, markdownCount - posts.length)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {syncResult && (
                <div className="py-2">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Sync Complete</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-green-700">
                        <div>
                          <div className="font-medium">{syncResult.synced}</div>
                          <div className="text-xs">Synced</div>
                        </div>
                        <div>
                          <div className="font-medium">{syncResult.skipped}</div>
                          <div className="text-xs">Skipped</div>
                        </div>
                        <div>
                          <div className="font-medium">{syncResult.errors.length}</div>
                          <div className="text-xs">Errors</div>
                        </div>
                      </div>
                      {syncResult.errors.length > 0 && (
                        <div className="mt-3 text-xs text-red-600">
                          {syncResult.errors.slice(0, 3).map((err, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {err}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSyncDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={syncMarkdownPosts}
                  disabled={syncing}
                  className="rainbow-button-solid"
                >
                  {syncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Sync
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link href="/admin/posts/new">
            <Button className="rainbow-button-solid">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-gray-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
            <div className="text-sm text-gray-500">Total Posts</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-gray-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
            <div className="text-sm text-gray-500">Published</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-gray-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
            <div className="text-sm text-gray-500">Drafts</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-gray-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-rainbow-purple">{markdownCount}</div>
            <div className="text-sm text-gray-500">Markdown Files</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 input-glass"
        />
      </div>

      {/* Posts Table */}
      <div className="glass-card rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-rainbow-purple border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-gray-500">No posts found. Create your first post!</p>
            <div className="flex justify-center gap-3 mt-4">
              <Link href="/admin/posts/new">
                <Button className="rainbow-button-solid">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </Link>
              {markdownCount > 0 && (
                <Button variant="outline" onClick={() => setShowSyncDialog(true)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Import Markdown
                </Button>
              )}
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPosts.map((post, index) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : post.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-500" />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
