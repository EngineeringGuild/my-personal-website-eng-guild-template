// /pages/api/projects.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjects, createProject } from '@/lib/supabase';
import type { ApiResponse, DatabaseProject } from '@/types';

/**
 * Projects API handler
 * GET: Retrieve projects (with optional featured filter)
 * POST: Create new project
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DatabaseProject[] | DatabaseProject>>
) {
  try {
    switch (req.method) {
      case 'GET':
        const featured = req.query.featured === 'true';
        const projectsResult = await getProjects(featured);
        
        if (!projectsResult.success) {
          return res.status(500).json({
            data: null,
            error: projectsResult.error || 'Failed to fetch projects',
            success: false
          });
        }
        
        return res.status(200).json({
          data: projectsResult.data,
          error: null,
          success: true
        });

      case 'POST':
        const projectData = req.body;
        
        if (!projectData || !projectData.title || !projectData.description) {
          return res.status(400).json({
            data: null,
            error: 'Project title and description are required',
            success: false
          });
        }
        
        const createResult = await createProject(projectData);
        
        if (!createResult.success) {
          return res.status(500).json({
            data: null,
            error: createResult.error || 'Failed to create project',
            success: false
          });
        }
        
        return res.status(201).json({
          data: createResult.data,
          error: null,
          success: true
        });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
          data: null,
          error: `Method ${req.method} not allowed`,
          success: false
        });
    }
  } catch (error) {
    console.error('Projects API error:', error);
    return res.status(500).json({
      data: null,
      error: error instanceof Error ? error.message : 'Internal server error',
      success: false
    });
  }
} 