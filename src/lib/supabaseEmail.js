import { bookingTranslations } from './bookingTranslations';

// Since Supabase is not connected and we cannot create a client, 
// we simulate the email sending process. In a production environment with Supabase connected,
// this would typically call a Supabase Edge Function (e.g., supabase.functions.invoke('send-email')).

/**
 * Generates a professional HTML email template.
 */
const generateEmailTemplate = (title, content, details, footer, isUser = false) => {
  const logoUrl = "https://powalyze.ch/logo.png"; // Placeholder for logo
  const mainColor = "#BFA76A";
  const bgColor = "#0A0A0A";
  const textColor = "#FFFFFF";

  return `
    <!DOCTYPE html>
    <html>
      <body style="background-color: ${bgColor}; color: ${textColor}; font-family: sans-serif; margin: 0; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #333; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000; padding: 20px; text-align: center; border-bottom: 1px solid ${mainColor};">
            <h1 style="color: ${mainColor}; margin: 0;">POWALYZE</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: ${mainColor}; margin-top: 0;">${title}</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #ccc;">${content}</p>
            
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <h3 style="color: ${mainColor}; margin-top: 0; font-size: 14px; text-transform: uppercase;">Details</h3>
              <ul style="list-style: none; padding: 0; margin: 0; color: #ddd;">
                ${Object.entries(details).map(([key, value]) => `
                  <li style="margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <strong style="color: #888; display: inline-block; width: 120px;">${key}:</strong> 
                    ${value}
                  </li>
                `).join('')}
              </ul>
            </div>

            ${isUser ? `
              <p style="color: #888; font-size: 12px; margin-top: 30px;">
                ${footer}
              </p>
            ` : `
              <a href="mailto:${details.email}" style="display: inline-block; background-color: ${mainColor}; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Reply to Client
              </a>
            `}
          </div>
          <div style="background-color: #000; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            &copy; 2025 Powalyze Consulting. Geneva, Switzerland.
          </div>
        </div>
      </body>
    </html>
  `;
};

export const sendEmailViaSupabase = async (formData, lang = 'en') => {
  // 1. Simulate Network Delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const t = bookingTranslations[lang] || bookingTranslations.en;
  const confirmationNumber = `BK-${Math.floor(Math.random() * 1000000)}`;
  const timestamp = new Date().toLocaleString();

  // 2. Construct Emails
  
  // --- Admin Email (to contact@powalyze.ch) ---
  const adminDetails = {
    Name: formData.name,
    Email: formData.email,
    Phone: formData.phone,
    Company: formData.company,
    Role: formData.role,
    Service: formData.need,
    Message: formData.message,
    Date: formData.date || 'Not specified',
    Time: formData.time || 'Not specified',
    Confirmation: confirmationNumber
  };
  
  const adminHtml = generateEmailTemplate(
    `${t.email.adminHeader} - ${formData.name}`,
    `New booking request received on ${timestamp}.`,
    adminDetails,
    "",
    false
  );

  // --- User Email (Confirmation) ---
  const userDetails = {
    Service: formData.need,
    Date: formData.date || 'TBD',
    Time: formData.time || 'TBD',
    "Confirmation #": confirmationNumber
  };

  const userHtml = generateEmailTemplate(
    t.email.userHeader,
    `${t.email.thankYou} ${t.email.nextSteps}`,
    userDetails,
    "If you have any questions, please contact us at contact@powalyze.ch",
    true
  );

  // 3. "Send" (Log to console to prove generation and simulate sending)
  console.group("📧 [SIMULATION] Supabase Email Service");
  console.log("STATUS: Sending...");
  console.log(`TO: contact@powalyze.ch (Admin) | SUBJECT: ${t.email.adminSubject} ${formData.name}`);
  console.log("ADMIN EMAIL CONTENT (HTML Preview):", adminHtml.substring(0, 100) + "...");
  console.log("------------------------------------------------");
  console.log(`TO: ${formData.email} (User) | SUBJECT: ${t.email.userSubject}`);
  console.log("USER EMAIL CONTENT (HTML Preview):", userHtml.substring(0, 100) + "...");
  console.log("STATUS: Sent Successfully (Simulated)");
  console.groupEnd();

  // Return success details for the UI
  return {
    success: true,
    confirmationNumber,
    date: formData.date,
    time: formData.time
  };
};