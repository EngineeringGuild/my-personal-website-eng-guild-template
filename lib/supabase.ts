import { createClient } from '@supabase/supabase-js';
import type { 
  DatabaseProfile, 
  DatabaseProject, 
  DatabaseBiographyContent,
  ApiResponse 
} from '@/types';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// =============================================================================
// DATABASE UTILITY FUNCTIONS
// =============================================================================

/**
 * Get user profile data
 * @returns Promise<ApiResponse<DatabaseProfile>> - Profile data or error
 */
export async function getProfile(): Promise<ApiResponse<DatabaseProfile>> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (error) {
      return { data: null, error: error.message, success: false };
    }

    return { data, error: null, success: true };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    };
  }
}

/**
 * Get all projects with optional filtering
 * @param featured - Filter for featured projects only
 * @returns Promise<ApiResponse<DatabaseProject[]>> - Projects data or error
 */
export async function getProjects(featured?: boolean): Promise<ApiResponse<DatabaseProject[]>> {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message, success: false };
    }

    return { data: data || [], error: null, success: true };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    };
  }
}

/**
 * Get biography content for a specific stage
 * @param stage - Biography stage to fetch
 * @returns Promise<ApiResponse<DatabaseBiographyContent[]>> - Biography content or error
 */
export async function getBiographyContent(
  stage?: string
): Promise<ApiResponse<DatabaseBiographyContent[]>> {
  try {
    let query = supabase
      .from('biography_content')
      .select('*')
      .order('order_index', { ascending: true });

    if (stage) {
      query = query.eq('stage', stage);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message, success: false };
    }

    return { data: data || [], error: null, success: true };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    };
  }
}

/**
 * Create a new project
 * @param project - Project data to create
 * @returns Promise<ApiResponse<DatabaseProject>> - Created project or error
 */
export async function createProject(
  project: Omit<DatabaseProject, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<DatabaseProject>> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message, success: false };
    }

    return { data, error: null, success: true };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    };
  }
}

/**
 * Update profile data
 * @param profile - Profile data to update
 * @returns Promise<ApiResponse<DatabaseProfile>> - Updated profile or error
 */
export async function updateProfile(
  profile: Partial<Omit<DatabaseProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<ApiResponse<DatabaseProfile>> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message, success: false };
    }

    return { data, error: null, success: true };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      success: false 
    };
  }
} 