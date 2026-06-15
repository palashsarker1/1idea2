"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Pen, Image, FileText, Calculator, Globe } from 'lucide-react';

const tools = [
  {
    icon: Code,
    name: 'Code Generator',
    description: 'Generate production-ready code from natural language descriptions.',
    category: 'Development',
    color: 'rainbow-purple',
  },
  {
    icon: Pen,
    name: 'Content Writer',
    description: 'Create compelling content for blogs, marketing, and more.',
    category: 'Content',
    color: 'rainbow-blue',
  },
  {
    icon: Image,
    name: 'Image Creator',
    description: 'Generate stunning images and graphics with AI.',
    category: 'Design',
    color: 'rainbow-cyan',
  },
  {
    icon: FileText,
    name: 'Document Parser',
    description: 'Extract and analyze data from documents instantly.',
    category: 'Analytics',
    color: 'rainbow-green',
  },
  {
    icon: Calculator,
    name: 'Data Analyzer',
    description: 'Analyze datasets and generate insights automatically.',
    category: 'Analytics',
    color: 'rainbow-yellow',
  },
  {
    icon: Globe,
    name: 'Website Builder',
    description: 'Build beautiful websites with AI assistance.',
    category: 'Development',
    color: 'rainbow-pink',
  },
];

export function ToolsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rainbow-cyan/5 border border-rainbow-cyan/10 mb-6"
          >
            <Code className="w-4 h-4 text-rainbow-cyan" />
            <span className="text-sm font-medium text-rainbow-cyan">Tools Marketplace</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            AI Tools at Your{' '}
            <span className="gradient-text-animated">Fingertips</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600"
          >
            Explore our marketplace of powerful AI tools designed to supercharge your workflow.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="glass-card rounded-2xl p-6 h-full card-3d border border-gray-100 hover:border-rainbow-purple/30 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${tool.color}/20 to-${tool.color}/5 flex items-center justify-center mb-4`}>
                    <tool.icon className={`w-7 h-7 text-${tool.color}`} style={{ color: `var(--${tool.color})` }} />
                  </div>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600 mb-3">
                    {tool.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center text-rainbow-purple text-sm font-medium group-hover:gap-2 transition-all">
                    Try it free
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-rainbow-purple font-medium hover:gap-3 transition-all"
          >
            Explore all 150+ tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
