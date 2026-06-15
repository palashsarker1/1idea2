"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rainbow-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-rainbow-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-rainbow-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-rainbow-pink/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rainbow-purple/20 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-rainbow-purple" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Innovation Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="block text-gray-900">Turn Ideas Into</span>
            <span className="block gradient-text-animated mt-2">Reality</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            The AI-powered platform that transforms your creative vision into production-ready
            results. Build, iterate, and ship faster than ever before.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="rainbow-button-solid h-12 px-8 text-base group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base group">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '1M+', label: 'Ideas Created' },
              { value: '99.9%', label: 'Uptime' },
              { value: '150+', label: 'AI Tools' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold rainbow-text">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Hero Image/Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-3d">
            <div className="absolute inset-0 bg-gradient-to-br from-rainbow-purple/5 via-rainbow-blue/5 to-rainbow-cyan/5" />
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-white rounded-3xl border border-gray-200 overflow-hidden">
              {/* Dashboard Preview */}
              <div className="p-4 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="col-span-2 glass-card rounded-2xl p-4 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="h-8 w-3/4 bg-gradient-to-r from-rainbow-purple/20 to-rainbow-blue/20 rounded-lg mb-4" />
                      <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                      <div className="h-4 w-2/3 bg-gray-100 rounded mb-6" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-24 rounded-xl bg-gradient-to-br from-rainbow-purple/10 to-rainbow-blue/10" />
                        <div className="h-24 rounded-xl bg-gradient-to-br from-rainbow-cyan/10 to-rainbow-green/10" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="glass-card rounded-2xl p-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rainbow-purple to-rainbow-blue mb-2" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="glass-card rounded-2xl p-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rainbow-cyan to-rainbow-green mb-2" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="glass-card rounded-2xl p-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rainbow-yellow to-rainbow-pink mb-2" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-8 top-1/4 glass-card-rainbow p-4 rounded-2xl shadow-lg hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rainbow-purple to-rainbow-blue flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">AI Generated</div>
                <div className="text-xs text-gray-500">Just now</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-8 top-1/3 glass-card-rainbow p-4 rounded-2xl shadow-lg hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rainbow-cyan to-rainbow-green flex items-center justify-center">
                <span className="text-white text-lg">🚀</span>
              </div>
              <div>
                <div className="font-semibold text-sm">Deployed!</div>
                <div className="text-xs text-gray-500">2 sec ago</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
