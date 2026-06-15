import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Download, Share2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: tool } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: `${tool.name} - 1Idea Tools`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: tool } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!tool) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="py-4 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rainbow-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Tool Icon & Info */}
            <div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rainbow-purple via-rainbow-blue to-rainbow-cyan flex items-center justify-center mb-6">
                <span className="text-4xl">{tool.icon || '🛠️'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {tool.name}
              </h1>

              <p className="text-lg text-gray-600 mb-6">{tool.description}</p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-rainbow-yellow fill-rainbow-yellow" />
                  <span className="font-semibold">{tool.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({tool.downloads} uses)</span>
                </div>
                <span className="px-3 py-1 bg-rainbow-purple/10 text-rainbow-purple rounded-full text-sm font-medium">
                  {tool.category}
                </span>
              </div>

              <div className="flex gap-4">
                <Button className="rainbow-button-solid h-12 px-8">
                  <Download className="w-5 h-5 mr-2" />
                  Use Tool
                </Button>
                <Button variant="outline" className="h-12 px-4">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Tool Preview */}
            <div className="glass-card rounded-2xl border border-gray-100 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rainbow-purple/20 via-rainbow-blue/20 to-rainbow-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{tool.icon || '🛠️'}</span>
                </div>
                <p className="text-gray-500">Interactive tool preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Answer for AEO */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3">
              What is {tool.name}?
            </h2>
            <p className="text-gray-600">
              {tool.name} is an AI-powered {tool.category.toLowerCase()} tool that{' '}
              {tool.description?.toLowerCase() || 'helps you work more efficiently'}.
              It's available as part of the 1Idea platform and can be used by
              signing up for a free account.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
