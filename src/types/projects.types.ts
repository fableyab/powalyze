/**
 * POWALYZE PROJECT MANAGER
 * Mobile-First Project & Task Management App
 * Features: Tasks, Subtasks, Attachments, Comments, Real-time Sync
 */

// src/types/projects.types.ts
export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string | null;
  assigned_user?: {
    full_name: string;
    email: string;
  } | null;
  due_date: string | null;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  attachments: string[] | null;
  created_at: string;
  updated_at: string;
  user?: {
    full_name: string;
    avatar_url: string | null;
  };
}

export interface TaskAttachment {
  id: string;
  task_id: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: string;
  uploaded_by: string;
  created_at: string;
}

export interface TaskFilter {
  status?: string[];
  priority?: string[];
  assigned_to?: string;
  search?: string;
  sort?: 'due_date' | 'priority' | 'created_at';
}

export interface ProjectStats {
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  overdue_tasks: number;
  completion_percentage: number;
}
