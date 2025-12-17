/**
 * Custom hooks for Project Management
 * Handle all data fetching and mutations
 */

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { ProjectTask, TaskComment, ProjectStats, TaskFilter } from '@/types/projects.types';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

// Hook: Fetch tasks for a project
export function useProjectTasks(projectId: string | null, filters?: TaskFilter) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    let isMounted = true;

    async function fetchTasks() {
      setLoading(true);
      try {
        let query = supabase
          .from('project_tasks')
          .select(`
            *,
            assigned_user:users(full_name, email)
          `)
          .eq('project_id', projectId);

        // Apply filters
        if (filters?.status?.length) {
          query = query.in('status', filters.status);
        }
        if (filters?.priority?.length) {
          query = query.in('priority', filters.priority);
        }
        if (filters?.assigned_to) {
          query = query.eq('assigned_to', filters.assigned_to);
        }
        if (filters?.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }

        // Apply sorting
        const sortBy = filters?.sort || 'due_date';
        query = query.order(sortBy, { ascending: sortBy === 'due_date' });

        const { data, error: queryError } = await query;

        if (!isMounted) return;
        if (queryError) throw queryError;

        setTasks(data as ProjectTask[] || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
    return () => { isMounted = false; };
  }, [projectId, filters]);

  return { tasks, loading, error };
}

// Hook: Create new task
export function useCreateTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = useCallback(
    async (projectId: string, taskData: Partial<ProjectTask>) => {
      setLoading(true);
      try {
        const { data, error: createError } = await supabase
          .from('project_tasks')
          .insert({
            project_id: projectId,
            ...taskData,
          })
          .select()
          .single();

        if (createError) throw createError;
        setError(null);
        return data;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createTask, loading, error };
}

// Hook: Update task
export function useUpdateTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = useCallback(
    async (taskId: string, updates: Partial<ProjectTask>) => {
      setLoading(true);
      try {
        const { data, error: updateError } = await supabase
          .from('project_tasks')
          .update(updates)
          .eq('id', taskId)
          .select()
          .single();

        if (updateError) throw updateError;
        setError(null);
        return data;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateTask, loading, error };
}

// Hook: Task comments
export function useTaskComments(taskId: string | null) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;
    let isMounted = true;

    async function fetchComments() {
      setLoading(true);
      try {
        const { data, error: queryError } = await supabase
          .from('task_comments')
          .select(`
            *,
            user:users(full_name, avatar_url)
          `)
          .eq('task_id', taskId)
          .order('created_at', { ascending: true });

        if (!isMounted) return;
        if (queryError) throw queryError;

        setComments(data as TaskComment[] || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
    return () => { isMounted = false; };
  }, [taskId]);

  return { comments, loading, error };
}

// Hook: Add comment
export function useAddComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = useCallback(
    async (taskId: string, content: string, userId: string) => {
      setLoading(true);
      try {
        const { data, error: insertError } = await supabase
          .from('task_comments')
          .insert({
            task_id: taskId,
            user_id: userId,
            content,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setError(null);
        return data;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { addComment, loading, error };
}

// Hook: Project statistics
export function useProjectStats(projectId: string | null) {
  const [stats, setStats] = useState<ProjectStats>({
    total_tasks: 0,
    completed_tasks: 0,
    in_progress_tasks: 0,
    overdue_tasks: 0,
    completion_percentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    async function fetchStats() {
      const { data: allTasks } = await supabase
        .from('project_tasks')
        .select('status, due_date, completed_at')
        .eq('project_id', projectId);

      if (!allTasks) return;

      const total = allTasks.length;
      const completed = allTasks.filter(t => t.status === 'done').length;
      const inProgress = allTasks.filter(t => t.status === 'in_progress').length;
      const overdue = allTasks.filter(
        t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'done'
      ).length;

      setStats({
        total_tasks: total,
        completed_tasks: completed,
        in_progress_tasks: inProgress,
        overdue_tasks: overdue,
        completion_percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, [projectId]);

  return { stats, loading };
}
