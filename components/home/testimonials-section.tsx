"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder, TechStart',
    avatar: 'SC',
    content:
      '1Idea transformed how we build products. What used to take weeks now takes hours. The AI tools are incredibly intuitive.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO, InnovateCo',
    avatar: 'MR',
    content:
      'The analytics and insights we get from 1Idea have helped us optimize our development process by 300%. Essential for any tech team.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Creative Director',
    avatar: 'EW',
    content:
      'As a designer, the image generation and content tools have revolutionized my creative workflow. I can iterate faster than ever.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Product Manager, ScaleUp',
    avatar: 'DK',
    content:
      'The platform scales beautifully. We went from prototype to production serving millions of users without any hiccups.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'CEO, NextGen Labs',
    avatar: 'LT',
    content:
      '1Idea is not just a tool, it is a game changer. Our team productivity has doubled since we started using it.',
    rating: 5,
  },
  {
    name: 'James Park',
    role: 'Engineering Lead',
    avatar: 'JP',
    content:
      'The code generation tool produces remarkably clean, maintainable code. It understands our patterns and conventions perfectly.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rainbow-pink/5 border border-rainbow-pink/10 mb-6"
          >
            <Star className="w-4 h-4 text-rainbow-pink fill-rainbow-pink" />
            <span className="text-sm font-medium text-rainbow-pink">Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Loved by{' '}
            <span className="gradient-text-animated">innovators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600"
          >
            Join thousands of creators, developers, and entrepreneurs building the future.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card-rainbow rounded-2xl p-6 h-full card-3d">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-rainbow-yellow fill-rainbow-yellow"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rainbow-purple to-rainbow-blue flex items-center justify-center text-white font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
