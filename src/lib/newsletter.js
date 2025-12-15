import { supabase } from '@/lib/supabaseClient';

export const subscribeToNewsletter = async (email) => {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // Use localStorage as fallback if Supabase is not connected
  try {
    if (!supabase) throw new Error("Supabase not connected");

    const { error } = await supabase
      .from('newsletters')
      .insert([{ email, status: 'subscribed', subscribed_date: new Date().toISOString() }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
         return { success: false, error: "Email already subscribed" };
      }
      throw error;
    }
  } catch (err) {
    console.warn("Supabase insert failed, using localStorage fallback:", err);
    const existing = JSON.parse(localStorage.getItem('powalyze_newsletter_subs') || '[]');
    if (existing.includes(email)) {
      return { success: false, error: "Email already subscribed" };
    }
    existing.push(email);
    localStorage.setItem('powalyze_newsletter_subs', JSON.stringify(existing));
  }
  
  // Send to Formspree for immediate notification/handling
  try {
    await fetch("https://formspree.io/f/xeoyznlq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, subject: "New Newsletter Subscriber" })
    });
  } catch (e) {
    console.error("Formspree error", e);
    // Non-blocking error
  }

  return { success: true };
};