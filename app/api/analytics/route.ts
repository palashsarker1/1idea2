import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { page, event_type, metadata } = await request.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('analytics').insert({
      page,
      event_type: event_type || 'page_view',
      user_id: user?.id || null,
      metadata: metadata || {},
      session_id: metadata?.sessionId || null,
      referrer: metadata?.referrer || null,
      user_agent: metadata?.userAgent || null,
    });

    if (error) {
      console.error('Analytics error:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
