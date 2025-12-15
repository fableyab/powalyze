import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const STORAGE_PREFIX = 'powalyze_files_';
const DATA_PREFIX = 'powalyze_data_';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = (file) => {
  if (file.size > MAX_FILE_SIZE) return { valid: false, error: 'size' };
  return { valid: true };
};

export const uploadFile = async (file, clientId = 'default') => {
  // 1. Validate
  const validation = validateFile(file);
  if (!validation.valid) throw new Error(validation.error);

  // 2. Parse Data (Common for both Local and Supabase)
  const fileData = await parseExcelData(file);
  
  // 3. Persist
  let fileMetadata = {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type,
    uploadDate: new Date().toISOString(),
    clientId
  };

  if (isSupabaseConfigured()) {
    // A) Supabase Storage & DB
    try {
      // Upload file to bucket
      const filePath = `${clientId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;

      // Create DB record
      const { data: dbData, error: dbError } = await supabase
        .from('uploads')
        .insert([{
          filename: file.name,
          file_url: filePath,
          size: file.size,
          type: file.type,
          user_id: (await supabase.auth.getUser()).data.user.id
        }])
        .select()
        .single();
        
      if (dbError) throw dbError;
      
      fileMetadata = { ...fileMetadata, id: dbData.id, remote: true };
      
      // Also trigger notification simulation
      await supabase.from('notifications').insert([{
        user_id: (await supabase.auth.getUser()).data.user.id,
        message: `File ${file.name} uploaded successfully.`,
        type: 'success'
      }]);

    } catch (err) {
      console.error("Supabase upload failed, falling back to local for demo", err);
      // Fallback to local if buckets aren't set up yet
      saveToLocal(fileMetadata, fileData, clientId);
    }
  } else {
    // B) LocalStorage
    saveToLocal(fileMetadata, fileData, clientId);
  }
  
  return fileMetadata;
};

const parseExcelData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { limit: 500 });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsBinaryString(file);
  });
};

const saveToLocal = (metadata, data, clientId) => {
  // Save Data
  const dashboardData = {
     lastUpdate: new Date().toISOString(),
     fileName: metadata.name,
     rows: data.length,
     columns: Object.keys(data[0] || {}),
     data: data,
     stats: { totalRecords: data.length }
  };
  localStorage.setItem(`${DATA_PREFIX}${clientId}`, JSON.stringify(dashboardData));

  // Save Metadata
  const existingFiles = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${clientId}`) || '[]');
  localStorage.setItem(`${STORAGE_PREFIX}${clientId}`, JSON.stringify([metadata, ...existingFiles]));
};

export const getFiles = async (clientId = 'default') => {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('uploads').select('*').order('created_at', { ascending: false });
    if (data) return data.map(d => ({
      id: d.id,
      name: d.filename,
      size: d.size,
      uploadDate: d.created_at,
      type: d.type
    }));
  }
  // Fallback / Merge
  return JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${clientId}`) || '[]');
};

export const deleteFile = async (id, clientId = 'default') => {
  if (isSupabaseConfigured()) {
    await supabase.from('uploads').delete().match({ id });
  }
  const key = `${STORAGE_PREFIX}${clientId}`;
  const files = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify(files.filter(f => f.id !== id)));
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};