# 1Idea - AI-Powered Innovation Platform

Turn Ideas Into Reality with the power of AI. 1Idea is a production-ready SaaS platform featuring a premium 5D futuristic UI with rainbow glassmorphism design.

## Features

- **AI Tools Marketplace**: 150+ AI-powered tools for development, content creation, design, and more
- **Blog Engine**: Full-featured CMS with markdown support
- **Admin Dashboard**: Complete control panel with analytics and content management
- **Premium UI**: Rainbow glassmorphism design with 3D animations and smooth transitions
- **PWA Support**: Installable on mobile and desktop
- **SEO/AEO Optimized**: Structured data, meta tags, and AI-crawler friendly content
- **Supabase Backend**: PostgreSQL with Row Level Security, authentication, and real-time features

## Tech Stack

- **Frontend**: Next.js 15+ App Router, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Supabase PostgreSQL, Supabase Auth, Supabase Storage
- **Deployment**: Vercel-ready, GitHub CI/CD

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/1idea.git
   cd 1idea
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your `.env.local` with Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── tools/             # Tools marketplace
├── components/
│   ├── home/              # Homepage sections
│   ├── ui/                # Shadcn UI components
│   └── ...                # Other components
├── lib/
│   ├── supabase/          # Supabase client utilities
│   └── types.ts           # TypeScript types
├── content/
│   └── posts/             # Markdown blog posts
└── public/
    └── icons/             # PWA icons
```

## Database Schema

The application uses Supabase with the following tables:

- `users` - User profiles and roles
- `posts` - Blog posts with SEO metadata
- `tools` - AI tools marketplace items
- `analytics` - Usage tracking
- `settings` - Site configuration
- `contacts` - Contact form submissions
- `subscribers` - Newsletter subscribers

All tables have Row Level Security (RLS) enabled.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email hello@1idea.ai or join our Discord community.

---

Built with passion by the 1Idea team.
