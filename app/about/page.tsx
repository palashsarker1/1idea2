import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Globe, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about 1Idea and our mission to empower creators worldwide.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Empowering <span className="gradient-text-animated">Innovators</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              We're on a mission to democratize innovation and help creators worldwide
              turn their ideas into reality with AI-powered tools.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  1Idea was born from a simple belief: everyone has great ideas, but not everyone
                  has the tools or resources to bring them to life. We set out to change that.
                </p>
                <p>
                  Founded in 2023, we've grown from a small team of dreamers to a global platform
                  serving creators, developers, and innovators across 120+ countries.
                </p>
                <p>
                  Our AI-powered platform combines cutting-edge technology with intuitive design,
                  making it possible for anyone to create professional-quality content, designs,
                  and applications in minutes, not months.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-rainbow-purple/10 via-rainbow-blue/10 to-rainbow-cyan/10 flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-rainbow-purple via-rainbow-blue to-rainbow-cyan animate-pulse-glow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50K+', label: 'Users Worldwide' },
              { icon: Globe, value: '120+', label: 'Countries' },
              { icon: Lightbulb, value: '1M+', label: 'Ideas Created' },
              { icon: Users, value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center glass-card rounded-2xl p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-rainbow-purple" />
                <div className="text-3xl font-bold rainbow-text">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Alex Chen', role: 'CEO & Founder' },
              { name: 'Sarah Kim', role: 'CTO' },
              { name: 'Michael Park', role: 'CPO' },
            ].map((member, i) => (
              <div key={i} className="text-center glass-card rounded-2xl p-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rainbow-purple to-rainbow-blue mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to join us?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Start your journey today and become part of our growing community of innovators.
          </p>
          <Link href="/signup">
            <Button className="rainbow-button-solid">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
