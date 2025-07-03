import type { NextApiRequest, NextApiResponse } from 'next';
import { getBiographyContent } from '@/lib/supabase';
import type { ApiResponse, DatabaseBiographyContent, BiographyStageKey } from '@/types';

/**
 * Biography content API handler
 * GET: Retrieve biography content for a specific stage
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DatabaseBiographyContent[]>>
) {
  try {
    const { stage } = req.query;

    if (!stage || typeof stage !== 'string') {
      return res.status(400).json({
        data: null,
        error: 'Stage parameter is required',
        success: false
      });
    }

    const validStages: BiographyStageKey[] = ['infancy', 'adolescence', 'youth', 'maturity', 'present'];
    
    if (!validStages.includes(stage as BiographyStageKey)) {
      return res.status(400).json({
        data: null,
        error: 'Invalid stage',
        success: false
      });
    }

    switch (req.method) {
      case 'GET':
        const contentResult = await getBiographyContent(stage);
        
        if (!contentResult.success) {
          return res.status(500).json({
            data: null,
            error: contentResult.error || 'Failed to fetch content',
            success: false
          });
        }
        
        return res.status(200).json({
          data: contentResult.data,
          error: null,
          success: true
        });

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({
          data: null,
          error: `Method ${req.method} not allowed`,
          success: false
        });
    }
  } catch (error) {
    console.error('Biography API error:', error);
    return res.status(500).json({
      data: null,
      error: error instanceof Error ? error.message : 'Internal server error',
      success: false
    });
  }
} 