"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface SiteSettings {
  brand_name: string;
  logo_url: string;
  contact_email: string;
  seo_defaults: {
    title?: string;
    description?: string;
  };
  social_links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    brand_name: '1Idea',
    logo_url: '',
    contact_email: '',
    seo_defaults: {},
    social_links: {},
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const supabase = createClient();
    const { data, error } = await supabase.from('settings').select('*').single();

    if (data) {
      setSettings({
        brand_name: data.brand_name || '1Idea',
        logo_url: data.logo_url || '',
        contact_email: data.contact_email || '',
        seo_defaults: data.seo_defaults || {},
        social_links: data.social_links || {},
      });
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('settings')
      .update({
        brand_name: settings.brand_name,
        logo_url: settings.logo_url,
        contact_email: settings.contact_email,
        seo_defaults: settings.seo_defaults,
        social_links: settings.social_links,
      })
      .eq('id', '1');

    if (error) {
      toast.error('Failed to save settings');
    } else {
      toast.success('Settings saved successfully');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-rainbow-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your site settings</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="rainbow-button-solid">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Brand Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Brand</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brand_name">Brand Name</Label>
            <Input
              id="brand_name"
              value={settings.brand_name}
              onChange={(e) =>
                setSettings({ ...settings, brand_name: e.target.value })
              }
              className="input-glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <div className="flex gap-3">
              <Input
                id="logo_url"
                value={settings.logo_url}
                onChange={(e) =>
                  setSettings({ ...settings, logo_url: e.target.value })
                }
                className="input-glass flex-1"
              />
              <Button variant="outline">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email}
              onChange={(e) =>
                setSettings({ ...settings, contact_email: e.target.value })
              }
              className="input-glass"
            />
          </div>
        </div>
      </motion.div>

      {/* SEO Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO Defaults</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="seo_title">Default Title</Label>
            <Input
              id="seo_title"
              value={settings.seo_defaults.title || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo_defaults: { ...settings.seo_defaults, title: e.target.value },
                })
              }
              className="input-glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_description">Default Description</Label>
            <Textarea
              id="seo_description"
              value={settings.seo_defaults.description || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo_defaults: {
                    ...settings.seo_defaults,
                    description: e.target.value,
                  },
                })
              }
              rows={3}
              className="input-glass"
            />
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Social Links</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={settings.social_links.twitter || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, twitter: e.target.value },
                })
              }
              placeholder="https://twitter.com/username"
              className="input-glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={settings.social_links.linkedin || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/company/name"
              className="input-glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={settings.social_links.github || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, github: e.target.value },
                })
              }
              placeholder="https://github.com/username"
              className="input-glass"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
