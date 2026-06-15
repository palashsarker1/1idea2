"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Eye,
  MousePointer,
  Users,
  Globe,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface StatCard {
  title: string;
  value: number;
  change: number;
  icon: typeof Eye;
  color: string;
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [topPages, setTopPages] = useState<{ page: string; views: number }[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const supabase = createClient();

    try {
      // Get total page views
      const { count: totalViews } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true });

      // Get unique visitors (approximation using distinct session_ids)
      const { data: sessions } = await supabase
        .from('analytics')
        .select('session_id');

      const uniqueSessions = new Set(sessions?.map((s: { session_id: string | null }) => s.session_id).filter(Boolean))
        .size;

      // Get top pages
      const { data: pageData } = await supabase
        .from('analytics')
        .select('page');

      const pageViews: Record<string, number> = {};
      pageData?.forEach((p: { page: string }) => {
        pageViews[p.page] = (pageViews[p.page] || 0) + 1;
      });

      const sortedPages = Object.entries(pageViews)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      setStats([
        {
          title: 'Page Views',
          value: totalViews || 0,
          change: 12,
          icon: Eye,
          color: 'from-rainbow-purple to-rainbow-blue',
        },
        {
          title: 'Unique Visitors',
          value: uniqueSessions,
          change: 8,
          icon: Users,
          color: 'from-rainbow-blue to-rainbow-cyan',
        },
        {
          title: 'Clicks',
          value: Math.floor((totalViews || 0) * 0.3),
          change: 5,
          icon: MousePointer,
          color: 'from-rainbow-cyan to-rainbow-green',
        },
        {
          title: 'Avg. Session',
          value: 4.5,
          change: 2,
          icon: TrendingUp,
          color: 'from-rainbow-green to-rainbow-yellow',
        },
      ]);

      setTopPages(sortedPages);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }

    setLoading(false);
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Monitor your site performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-green-600 font-medium">
                  +{stat.change}%
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {typeof stat.value === 'number' && stat.value >= 1000
                  ? (stat.value / 1000).toFixed(1) + 'k'
                  : stat.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Pages Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-card rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Pages</h2>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={page.page} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 truncate">
                      {page.page || '/'}
                    </div>
                    <div className="text-sm text-gray-500">{page.views} views</div>
                  </div>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rainbow-purple to-rainbow-blue rounded-full"
                      style={{
                        width: `${
                          topPages[0]?.views > 0
                            ? (page.views / topPages[0].views) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Device Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Traffic Sources</h2>
            <div className="space-y-4">
              {[
                { source: 'Direct', value: 45, icon: Globe },
                { source: 'Search', value: 30, icon: Monitor },
                { source: 'Social', value: 15, icon: Smartphone },
                { source: 'Referral', value: 10, icon: TrendingUp },
              ].map((item) => (
                <div key={item.source} className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.source}</div>
                  </div>
                  <div className="text-gray-600 font-medium">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
