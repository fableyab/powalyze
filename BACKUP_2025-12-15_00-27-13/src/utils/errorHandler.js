import { toast } from '@/components/ui/use-toast';

/**
 * Global Error Handler Utility
 * Formats errors and displays user-friendly notifications.
 */

export const handleError = (error, customTitle = "Error") => {
  console.error(`[${customTitle}]`, error);
  
  let message = "An unexpected error occurred.";
  
  if (typeof error === 'string') {
    message = error;
  } else if (error?.message) {
    message = error.message;
  }

  // Supabase specific error codes
  if (error?.code === '23505') message = "This record already exists.";
  if (error?.code === 'PGRST116') message = "Record not found.";

  toast({
    variant: "destructive",
    title: customTitle,
    description: message
  });

  return message;
};

export const logError = (context, error) => {
  // In production, send to Sentry/LogRocket
  console.error(`Error in ${context}:`, error);
};