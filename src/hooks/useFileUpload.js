import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook pour gérer l'upload de fichiers avec progression
 */
export function useFileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const addFiles = useCallback((newFiles) => {
    const filesWithMetadata = Array.from(newFiles).map(file => ({
      id: uuidv4(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.name.split('.').pop().toLowerCase(),
      progress: 0,
      status: 'pending', // pending, uploading, success, error
      uploadedAt: null,
      url: null,
    }));

    setFiles(prev => [...prev, ...filesWithMetadata]);
    return filesWithMetadata;
  }, []);

  const removeFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const uploadFile = useCallback(async (fileData, uploadFn) => {
    setUploading(true);
    
    setFiles(prev => prev.map(f => 
      f.id === fileData.id 
        ? { ...f, status: 'uploading', progress: 0 }
        : f
    ));

    try {
      // Simuler la progression
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === fileData.id && f.progress < 90) {
            return { ...f, progress: f.progress + 10 };
          }
          return f;
        }));
      }, 200);

      // Appeler la fonction d'upload fournie (ou simuler)
      let result;
      if (uploadFn) {
        result = await uploadFn(fileData.file);
      } else {
        // Mock upload
        await new Promise(resolve => setTimeout(resolve, 2000));
        result = {
          url: URL.createObjectURL(fileData.file),
          success: true,
        };
      }

      clearInterval(progressInterval);

      setFiles(prev => prev.map(f => 
        f.id === fileData.id 
          ? { 
              ...f, 
              status: 'success', 
              progress: 100,
              uploadedAt: new Date().toISOString(),
              url: result.url,
            }
          : f
      ));

      return result;
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileData.id 
          ? { ...f, status: 'error', progress: 0 }
          : f
      ));
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadAll = useCallback(async (uploadFn) => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const fileData of pendingFiles) {
      await uploadFile(fileData, uploadFn);
    }
  }, [files, uploadFile]);

  const clearCompleted = useCallback(() => {
    setFiles(prev => prev.filter(f => f.status !== 'success'));
  }, []);

  const reset = useCallback(() => {
    setFiles([]);
    setUploading(false);
  }, []);

  return {
    files,
    uploading,
    addFiles,
    removeFile,
    uploadFile,
    uploadAll,
    clearCompleted,
    reset,
  };
}

export default useFileUpload;
