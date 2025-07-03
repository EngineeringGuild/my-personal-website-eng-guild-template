import type { NextApiRequest, NextApiResponse } from 'next';
import { getProfile, updateProfile } from '@/lib/supabase';
import type { ApiResponse, DatabaseProfile } from '@/types';

/**
 * Profile API handler
 * GET: Retrieve user profile
 * PUT: Update user profile
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DatabaseProfile>>
) {
  try {
    switch (req.method) {
      case 'GET':
        const profileResult = await getProfile();
        
        if (!profileResult.success) {
          return res.status(500).json({
            data: null,
            error: profileResult.error || 'Failed to fetch profile',
            success: false
          });
        }
        
        return res.status(200).json({
          data: profileResult.data,
          error: null,
          success: true
        });

      case 'PUT':
        const updateData = req.body;
        
        const updateResult = await updateProfile(updateData);
        
        if (!updateResult.success) {
          return res.status(500).json({
            data: null,
            error: updateResult.error || 'Failed to update profile',
            success: false
          });
        }
        
        return res.status(200).json({
          data: updateResult.data,
          error: null,
          success: true
        });

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({
          data: null,
          error: `Method ${req.method} not allowed`,
          success: false
        });
    }
  } catch (error) {
    console.error('Profile API error:', error);
    return res.status(500).json({
      data: null,
      error: error instanceof Error ? error.message : 'Internal server error',
      success: false
    });
  }
} 