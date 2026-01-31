import { supabase } from '../supabase';

export interface OrganizationInput {
  title: string;
  description?: string;
  address?: string;
  phone?: string;
  url?: string;
  isRealOrg?: boolean;
}

export async function saveOrganizations(organizations: OrganizationInput[]) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("Supabase not configured, skipping organization persistence");
      return null;
    }

    if (!organizations || organizations.length === 0) return [];

    console.log(`Saving ${organizations.length} organizations to Supabase...`);

    const dbPayload = organizations.map(org => ({
      name: org.title,
      description: org.description,
      address: org.address,
      phone: org.phone,
      url: org.url,
      categories: ['Volunteer Opportunity'], // Default category
      status: 'ready'
    }));

    // We use upsert if we had a unique key, but for now we'll insert.
    // In a real app, you might want to deduplicate by name or URL.
    const { data, error } = await supabase
      .from('organizations')
      .insert(dbPayload)
      .select();

    if (error) {
      console.error('Error saving organizations to Supabase:', error);
      return null;
    }
    
    console.log(`✓ Saved ${data?.length || 0} organizations`);
    return data;
  } catch (e) {
    console.error("Failed to save organizations:", e);
    return null;
  }
}
