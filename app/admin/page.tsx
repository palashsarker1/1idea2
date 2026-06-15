"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Wrench,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Stats {
  totalUsers: number;
  totalPosts: number;
  totalTools: number;
  pageViews: number;
}

interface DailyViews {
  date: string;
  views: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalPosts: 0,
    totalTools: 0,
    pageViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      try {
        const [ usersCount, postsCount, toolsCount, analyticsCount ] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('id', { count: 'exact', head: true }),
          supabase.from('tools').select('id', { count: 'exact', head: true }),
          supabase.from('analytics').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          totalUsers: usersCount.count || 0,
          totalPosts: postsCount.count || 0,
          totalTools: toolsCount.count || 0,
          pageViews: analyticsCount.count || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statsData = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-rainbow-purple to-rainbow-blue',
    },
    {
      name: 'Total Posts',
      value: stats.totalPosts,
      change: '+8%',
      changeType: 'positive',
      icon: FileText,
      color: 'from-rainbow-blue to-rainbow-cyan',
    },
    {
      name: 'Tools Available',
      value: stats.totalTools,
      change: '+5',
      changeType: 'positive',
      icon: Wrench,
      color: 'from-rainbow-cyan to-rainbow-green',
    },
    {
      name: 'Page Views',
      value: stats.pageViews,
      change: '+23%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-rainbow-green to-rainbow-yellow',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-rainbow-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-card rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/posts/new"
                className="p-4 rounded-xl bg-rainbow-purple/5 hover:bg-rainbow-purple/10 transition-colors border border-rainbow-purple/20"
              >
                <FileText className="w-6 h-6 text-rainbow-purple mb-2" />
                <div className="font-medium text-gray-900">New Post</div>
                <div className="text-sm text-gray-500">Create a blog article</div>
              </a>
              <a
                href="/admin/tools/new"
                className="p-4 rounded-xl bg-rainbow-blue/5 hover:bg-rainbow-blue/10 transition-colors border border-rainbow-blue/20"
              >
                <Wrench className="w-6 h-6 text-rainbow-blue mb-2" />
                <div className="font-medium text-gray-900">New Tool</div>
                <div className="text-sm text-gray-500">Add a new AI tool</div>
              </a>
              <a
                href="/admin/analytics"
                className="p-4 rounded-xl bg-rainbow-cyan/5 hover:bg-rainbow-cyan/10 transition-colors border border-rainbow-cyan/20"
              >
                <TrendingUp className="w-6 h-6 text-rainbow-cyan mb-2" />
                <div className="font-medium text-gray-900">Analytics</div>
                <div className="text-sm text-gray-500">View detailed stats</div>
              </a>
              <a
                href="/admin/settings"
                className="p-4 rounded-xl bg-rainbow-green/5 hover:bg-rainbow-green/10 transition-colors border border-rainbow-green/20"
              >
                <MousePointer className="w-6 h-6 text-rainbow-green mb-2" />
                <div className="font-medium text-gray-900">Settings</div>
                <div className="text-sm text-gray-500">Manage site settings</div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { text: 'New user signed up', time: '2 min ago', color: 'rainbow-purple' },
                { text: 'Blog post published', time: '1 hour ago', color: 'rainbow-blue' },
                { text: 'Tool usage increased 15%', time: '3 hours ago', color: 'rainbow-cyan' },
                { text: 'New contact received', time: '5 hours ago', color: 'rainbow-green' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-${activity.color}`} />
                  <div className="flex-1 text-sm text-gray-600">{activity.text}</div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
