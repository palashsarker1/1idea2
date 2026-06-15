import { Metadata } from 'next';
import { FeaturesSection } from '@/components/home/features-section';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover powerful AI features to turn your ideas into reality faster than ever.',
};

export default function FeaturesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Powerful <span className="gradient-text-animated">Features</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform your ideas into reality. Our AI-powered
              platform provides cutting-edge tools for creators, developers, and innovators.
            </p>
          </div>
        </div>
      </section>
      <FeaturesSection />
    </div>
  );
}
