/**
 * Task API Routes
 * REST endpoints for task CRUD operations
 * /api/tasks - GET, POST
 * /api/tasks/:id - GET, PATCH, DELETE
 * /api/tasks/:id/comments - GET, POST
 */

import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * GET /api/tasks
 * List all tasks for a project
 * Query params: projectId, status, priority, assigned_to, search
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { projectId, status, priority, assigned_to, search, page = 1, limit = 20 } = req.query;

    if (!projectId) {
      return res.status(400).json({ error: 'projectId is required' });
    }

    let query = supabase
      .from('project_tasks')
      .select(`
        *,
        assigned_user:users(id, full_name, email)
      `)
      .eq('project_id', projectId);

    // Apply filters
    if (status) {
      const statuses = Array.isArray(status) ? status : [status];
      query = query.in('status', statuses);
    }

    if (priority) {
      const priorities = Array.isArray(priority) ? priority : [priority];
      query = query.in('priority', priorities);
    }

    if (assigned_to) {
      query = query.eq('assigned_to', assigned_to);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    query = query.range(skip, skip + Number(limit) - 1);

    // Sorting
    query = query.order('due_date', { ascending: true });

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count || 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { projectId, title, description, priority, status, due_date, assigned_to } = req.body;

    if (!projectId || !title) {
      return res.status(400).json({ error: 'projectId and title are required' });
    }

    const { data, error } = await supabase
      .from('project_tasks')
      .insert({
        project_id: projectId,
        title,
        description,
        priority: priority || 'medium',
        status: status || 'todo',
        due_date,
        assigned_to,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/tasks/:id
 * Get a specific task with comments and subtasks
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('project_tasks')
      .select(`
        *,
        assigned_user:users(id, full_name, email),
        comments:task_comments(
          *,
          user:users(id, full_name, avatar_url)
        ),
        subtasks:subtasks(id, title, completed)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Task not found' });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/tasks/:id
 * Update a task
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('project_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Task not found' });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('project_tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/tasks/:id/comments
 * Get all comments for a task
 */
router.get('/:id/comments', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const { data, error, count } = await supabase
      .from('task_comments')
      .select(
        `
        *,
        user:users(id, full_name, avatar_url)
      `,
        { count: 'exact' }
      )
      .eq('task_id', id)
      .range(skip, skip + Number(limit) - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count || 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/tasks/:id/comments
 * Add a comment to a task
 */
router.post('/:id/comments', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, user_id } = req.body;

    if (!content || !user_id) {
      return res.status(400).json({ error: 'content and user_id are required' });
    }

    const { data, error } = await supabase
      .from('task_comments')
      .insert({
        task_id: id,
        user_id,
        content,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/tasks/:id/status
 * Quick status update endpoint
 */
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'status is required' });
    }

    const { data, error } = await supabase
      .from('project_tasks')
      .update({
        status,
        completed_at: status === 'done' ? new Date().toISOString() : null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
