/**
 * Formats text by ensuring proper line breaks and removing unwanted symbols.
 * 
 * Features:
 * 1. Replaces period followed by one or more spaces (". ") with period + newline (".\n") 
 *    to force line breaks when rendered with whitespace-pre-line.
 * 2. Removes "✅" symbols if present.
 * 
 * @param {string} text - The text to format
 * @returns {string} - The formatted text
 */
export const formatText = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  // Remove star symbols (✅)
  let formatted = text.replace(/✅/g, '');
  
  // Clean up potential double spaces left by removal
  formatted = formatted.replace(/\s\s+/g, ' ');
  
  // Replace period followed by one or more spaces with period + newline
  // This regex handles cases like ". " and ".  " etc.
  formatted = formatted.replace(/\. +/g, '.\n');
  
  return formatted.trim();
};