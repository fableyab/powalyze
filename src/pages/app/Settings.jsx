import React, { useState } from 'react';
import CockpitLayout from "../../components/layout/CockpitLayout";
import { User, Bell, Shield, Globe, Moon, Palette, Lock, Mail, Smartphone, Database, Save, UserPlus, Trash2, Crown, Star, CheckCircle, Shield as ShieldIcon } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    fullName: 'Executive User',
    email: 'executive@powalyze.com',
    timezone: 'Europe/Zurich',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      risksAlert: true,
      weeklyReport: true
    },
    theme: 'dark',
    twoFactor: false
  });

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'viewer'
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@powalyze.com',
      role: 'admin',
      status: 'active',
      joinedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@powalyze.com',
      role: 'manager',
      status: 'active',
      joinedAt: '2024-02-10'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@powalyze.com',
      role: 'analyst',
      status: 'active',
      joinedAt: '2024-03-05'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@powalyze.com',
      role: 'viewer',
      status: 'pending',
      joinedAt: '2024-03-20'
    }
  ]);

  const handleInviteTeamMember = () => {
    if (inviteData.email && inviteData.firstName && inviteData.lastName) {
      const newMember = {
        id: teamMembers.length + 1,
        name: `${inviteData.firstName} ${inviteData.lastName}`,
        email: inviteData.email,
        role: inviteData.role,
        status: 'pending',
        joinedAt: new Date().toISOString().split('T')[0]
      };
      setTeamMembers([...teamMembers, newMember]);
      setInviteData({ email: '', firstName: '', lastName: '', role: 'viewer' });
      setShowInviteModal(false);
    }
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-[#D4AF37]" />;
      case 'manager': return <Star className="w-4 h-4 text-blue-400" />;
      case 'analyst': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'viewer': return <ShieldIcon className="w-4 h-4 text-white/40" />;
      default: return null;
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20',
      manager: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
      analyst: 'bg-green-400/10 text-green-400 border-green-400/20',
      viewer: 'bg-white/5 text-white/40 border-white/10'
    };
    return badges[role] || badges.viewer;
  };

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Full Name', value: settings.fullName, type: 'text', key: 'fullName' },
        { label: 'Email Address', value: settings.email, type: 'email', key: 'email' },
        { label: 'Timezone', value: settings.timezone, type: 'select', key: 'timezone', options: ['Europe/Zurich', 'Europe/Paris', 'Europe/London', 'America/New_York'] }
      ]
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: Globe,
      items: [
        { label: 'Interface Language', value: settings.language, type: 'select', key: 'language', options: ['en', 'fr', 'de', 'no'] }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: settings.notifications.email, type: 'toggle', key: 'notifications.email' },
        { label: 'Push Notifications', value: settings.notifications.push, type: 'toggle', key: 'notifications.push' },
        { label: 'Critical Risks Alerts', value: settings.notifications.risksAlert, type: 'toggle', key: 'notifications.risksAlert' },
        { label: 'Weekly Reports', value: settings.notifications.weeklyReport, type: 'toggle', key: 'notifications.weeklyReport' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', value: settings.twoFactor, type: 'toggle', key: 'twoFactor' }
      ]
    }
  ];

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <CockpitLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extralight text-white tracking-tight mb-2">Settings</h1>
          <p className="text-xs text-white/40 tracking-[0.1em] uppercase">Configure your Powalyze experience</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowInviteModal(true)}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2"
          >
            <UserPlus className="w-3 h-3" />
            Invite User
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2"
          >
            <Save className="w-3 h-3" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 border border-white/10 rounded-[2px] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h2 className="text-lg font-light text-white tracking-tight">{section.title}</h2>
              </div>

              {/* Section Items */}
              <div className="space-y-6">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm font-light text-white">{item.label}</label>
                      <p className="text-xs text-white/30 tracking-[0.05em]">Configure your {item.label.toLowerCase()} preferences</p>
                    </div>
                    
                    <div className="w-64">
                      {item.type === 'text' || item.type === 'email' ? (
                        <input
                          type={item.type}
                          value={item.value}
                          onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                          className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                        />
                      ) : item.type === 'select' ? (
                        <select
                          value={item.value}
                          onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                          className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                        >
                          {item.options.map(opt => (
                            <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
                          ))}
                        </select>
                      ) : item.type === 'toggle' ? (
                        <button
                          onClick={() => {
                            const keys = item.key.split('.');
                            if (keys.length === 1) {
                              setSettings({ ...settings, [keys[0]]: !item.value });
                            } else {
                              setSettings({
                                ...settings,
                                [keys[0]]: { ...settings[keys[0]], [keys[1]]: !item.value }
                              });
                            }
                          }}
                          className={`relative w-14 h-7 rounded-full transition-all duration-500 ${
                            item.value ? 'bg-[#D4AF37]' : 'bg-white/10'
                          }`}
                        >
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500 ${
                            item.value ? 'right-1' : 'left-1'
                          }`} />
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Danger Zone */}
        <div className="bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-[2px] p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/10">
            <div className="w-10 h-10 border border-red-500/20 rounded-[2px] flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-lg font-light text-white tracking-tight">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-white">Delete Account</p>
                <p className="text-xs text-white/30 mt-1">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-[2px] text-xs text-red-400 hover:bg-red-500/20 transition-all duration-500 tracking-[0.1em] uppercase">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Team Management Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white/10 rounded-[2px] flex items-center justify-center">
                <User className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-lg font-light text-white tracking-tight">Team Collaborators</h2>
                <p className="text-xs text-white/30 tracking-[0.05em]">Manage team access and permissions</p>
              </div>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2"
            >
              <UserPlus className="w-3 h-3" />
              Invite Member
            </button>
          </div>

          {/* Team Members List */}
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] p-4 hover:border-white/10 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-blue-400 flex items-center justify-center">
                      <span className="text-sm font-semibold text-black">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-light text-white">{member.name}</h3>
                        <div className={`px-2 py-0.5 rounded-[2px] border text-xs tracking-[0.1em] uppercase flex items-center gap-1 ${getRoleBadge(member.role)}`}>
                          {getRoleIcon(member.role)}
                          {member.role}
                        </div>
                        {member.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-[2px] text-xs tracking-[0.1em] uppercase">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/40">{member.email}</p>
                      <p className="text-xs text-white/30 mt-1">Joined {member.joinedAt}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/10 border border-red-500/20 rounded-[2px] hover:bg-red-500/20 transition-all duration-500"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
          <div className="bg-[#020713] border border-white/10 rounded-[2px] p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-extralight text-white tracking-tight mb-2">Invite Team Member</h2>
            <p className="text-xs text-white/40 tracking-[0.1em] uppercase mb-6">Add a new collaborator to your workspace</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-light text-white block mb-2">First Name</label>
                <input
                  type="text"
                  value={inviteData.firstName}
                  onChange={(e) => setInviteData({ ...inviteData, firstName: e.target.value })}
                  className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="text-sm font-light text-white block mb-2">Last Name</label>
                <input
                  type="text"
                  value={inviteData.lastName}
                  onChange={(e) => setInviteData({ ...inviteData, lastName: e.target.value })}
                  className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="text-sm font-light text-white block mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                  placeholder="john.doe@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-light text-white block mb-2">Role</label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                >
                  <option value="viewer">Viewer - View only access</option>
                  <option value="analyst">Analyst - Can edit projects</option>
                  <option value="manager">Manager - Full project management</option>
                  <option value="admin">Admin - Full system access</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-[2px] text-xs hover:bg-white/10 transition-all duration-500 tracking-[0.2em] uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteTeamMember}
                className="flex-1 px-4 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </CockpitLayout>
  );
}
