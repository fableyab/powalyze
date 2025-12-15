
import React from 'react';
import { FileText, FileSpreadsheet, FileImage as FileIcon, Presentation } from 'lucide-react';

const DocumentTypeIcon = ({ type, className = "" }) => {
  const normalizedType = type ? type.toLowerCase() : 'generic';

  if (normalizedType.includes('pdf')) {
    return <FileText className={`text-red-500 ${className}`} />;
  }
  if (normalizedType.includes('excel') || normalizedType.includes('xlsx') || normalizedType.includes('sheet')) {
    return <FileSpreadsheet className={`text-green-500 ${className}`} />;
  }
  if (normalizedType.includes('word') || normalizedType.includes('docx') || normalizedType.includes('doc')) {
    return <FileText className={`text-blue-500 ${className}`} />;
  }
  if (normalizedType.includes('powerpoint') || normalizedType.includes('pptx') || normalizedType.includes('ppt')) {
    return <Presentation className={`text-orange-500 ${className}`} />;
  }

  return <FileIcon className={`text-gray-400 ${className}`} />;
};

export default DocumentTypeIcon;
