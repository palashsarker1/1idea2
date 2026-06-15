"use client";

import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Layers,
  Puzzle,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Creation',
    description:
      'Generate content, designs, and code with advanced AI models fine-tuned for creative work.',
    gradient: 'from-rainbow-purple to-rainbow-blue',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Build and iterate in real-time with our optimized infrastructure and caching systems.',
    gradient: 'from-rainbow-blue to-rainbow-cyan',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption and compliance with SOC2, GDPR, and industry standards.',
    gradient: 'from-rainbow-cyan to-rainbow-green',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description:
      'Track metrics, understand user behavior, and optimize with actionable insights.',
    gradient: 'from-rainbow-green to-rainbow-yellow',
  },
  {
    icon: Layers,
    title: 'Scalable Infrastructure',
    description:
      'From prototype to production, scale seamlessly with auto-scaling architecture.',
    gradient: 'from-rainbow-yellow to-rainbow-pink',
  },
  {
    icon: Puzzle,
    title: 'Integrations',
    description:
      'Connect with 100+ tools and services through our extensive API ecosystem.',
    gradient: 'from-rainbow-pink to-rainbow-purple',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rainbow-purple/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rainbow-purple/5 border border-rainbow-purple/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-rainbow-purple" />
            <span className="text-sm font-medium text-rainbow-purple">Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Everything you need to{' '}
            <span className="gradient-text-animated">innovate</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600"
          >
            Powerful features designed to help you turn your ideas into reality faster
            and more efficiently.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card-rainbow rounded-2xl p-6 h-full card-3d">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
