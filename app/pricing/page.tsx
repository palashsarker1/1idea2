import { Metadata } from 'next';
import { PricingSection } from '@/components/home/pricing-section';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for every creator. Start free and scale as you grow.',
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Simple <span className="gradient-text-animated">Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, no surprises.
              Cancel anytime.
            </p>
          </div>
        </div>
      </section>
      <PricingSection />

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I use 1Idea for free?',
                a: 'Yes! Our Starter plan is completely free forever with 100 AI generations per month.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.',
              },
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Absolutely. You can cancel your subscription at any time. No questions asked.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 14-day money-back guarantee on all paid plans.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
