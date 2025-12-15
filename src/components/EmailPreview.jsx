
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

// Import all templates
import AccountCreationEmail from '@/templates/emails/AccountCreationEmail';
import AppointmentConfirmationEmail from '@/templates/emails/AppointmentConfirmationEmail';
import AppointmentUpdateEmail from '@/templates/emails/AppointmentUpdateEmail';
import AppointmentCancellationEmail from '@/templates/emails/AppointmentCancellationEmail';
import PasswordResetEmail from '@/templates/emails/PasswordResetEmail';
import ProjectInvitationEmail from '@/templates/emails/ProjectInvitationEmail';
import DocumentSharedEmail from '@/templates/emails/DocumentSharedEmail';

const EmailPreview = () => {
  const { language: currentLang } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState('account');
  const [previewLang, setPreviewLang] = useState(currentLang || 'fr');

  const mockData = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    date: "15 Oct 2025",
    time: "14:00",
    service: "Strategic PMO Audit",
    oldDate: "12 Oct 2025",
    oldTime: "10:00",
    newDate: "15 Oct 2025",
    newTime: "14:00",
    resetLink: "https://powalyze.ch/reset-password?token=123",
    inviterName: "Fabrice Fays",
    projectName: "Digital Transformation Q4",
    projectRole: "Editor",
    senderName: "Sarah Meyer",
    docName: "Q3_Financial_Report.pdf",
    docType: "PDF"
  };

  const renderTemplate = () => {
    const props = { ...mockData, language: previewLang };
    switch (selectedTemplate) {
      case 'account': return <AccountCreationEmail {...props} />;
      case 'confirmation': return <AppointmentConfirmationEmail {...props} />;
      case 'update': return <AppointmentUpdateEmail {...props} />;
      case 'cancellation': return <AppointmentCancellationEmail {...props} />;
      case 'reset': return <PasswordResetEmail {...props} />;
      case 'invite': return <ProjectInvitationEmail {...props} />;
      case 'doc': return <DocumentSharedEmail {...props} />;
      default: return <div>Select a template</div>;
    }
  };

  return (
    <div className="p-8 bg-[#f0f0f0] min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">System Email Previewer</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Controls */}
        <div className="w-full md:w-1/4 space-y-6">
          <Card className="p-4 bg-white">
            <h3 className="font-bold mb-4">Templates</h3>
            <div className="space-y-2 flex flex-col">
              <Button variant={selectedTemplate === 'account' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('account')} className="justify-start">Account Creation</Button>
              <Button variant={selectedTemplate === 'confirmation' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('confirmation')} className="justify-start">Appt. Confirmation</Button>
              <Button variant={selectedTemplate === 'update' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('update')} className="justify-start">Appt. Update</Button>
              <Button variant={selectedTemplate === 'cancellation' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('cancellation')} className="justify-start">Appt. Cancellation</Button>
              <Button variant={selectedTemplate === 'reset' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('reset')} className="justify-start">Password Reset</Button>
              <Button variant={selectedTemplate === 'invite' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('invite')} className="justify-start">Project Invite</Button>
              <Button variant={selectedTemplate === 'doc' ? 'default' : 'outline'} onClick={() => setSelectedTemplate('doc')} className="justify-start">Doc Shared</Button>
            </div>
          </Card>

          <Card className="p-4 bg-white">
            <h3 className="font-bold mb-4">Language</h3>
            <div className="flex gap-2">
              <Button size="sm" variant={previewLang === 'fr' ? 'default' : 'outline'} onClick={() => setPreviewLang('fr')}>FR</Button>
              <Button size="sm" variant={previewLang === 'en' ? 'default' : 'outline'} onClick={() => setPreviewLang('en')}>EN</Button>
              <Button size="sm" variant={previewLang === 'de' ? 'default' : 'outline'} onClick={() => setPreviewLang('de')}>DE</Button>
            </div>
          </Card>
        </div>

        {/* Preview Frame */}
        <div className="flex-1 bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg min-h-[600px] flex flex-col">
          <div className="bg-gray-100 p-2 border-b flex justify-between items-center text-sm text-gray-600">
            <span>To: {mockData.email}</span>
            <span>Subject: [Dynamic based on template]</span>
          </div>
          <div className="flex-1 overflow-auto">
             {/* Render the selected React component directly to simulate email view */}
             {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
