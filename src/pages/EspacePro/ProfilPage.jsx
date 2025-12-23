import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiSave, FiCamera, FiShield } from 'react-icons/fi';

function ProfilPage() {
  const [profile, setProfile] = useState({
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@powalyze.com',
    phone: '+41 79 123 45 67',
    location: 'Genève, Suisse',
    role: 'Chef de Projet',
    department: 'PMO',
    joinDate: '2023-01-15',
    bio: 'Chef de projet expérimenté avec 10 ans d\'expérience dans la transformation digitale.',
  });

  const handleSave = () => {
    alert('Profil mis à jour avec succès!');
  };

  const stats = [
    { label: 'Projets actifs', value: '12', icon: FiBriefcase, color: 'text-blue-400' },
    { label: 'Tâches complétées', value: '247', icon: FiShield, color: 'text-green-400' },
    { label: 'Documents', value: '89', icon: FiCalendar, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
          Mon Profil
        </h1>
        <p className="text-gray-400 mt-2">Gérez vos informations personnelles</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center text-4xl font-bold text-black">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <button className="absolute bottom-0 right-0 p-3 bg-[#BFA76A] rounded-full hover:bg-[#D4AF37] transition-colors">
              <FiCamera className="w-5 h-5 text-black" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-[#BFA76A] font-medium text-lg mb-4">{profile.role}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Membre depuis {profile.joinDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Form */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Informations Personnelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FiUser className="inline w-4 h-4 mr-2" />
              Prénom
            </label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FiUser className="inline w-4 h-4 mr-2" />
              Nom
            </label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FiMail className="inline w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FiPhone className="inline w-4 h-4 mr-2" />
              Téléphone
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FiBriefcase className="inline w-4 h-4 mr-2" />
              Rôle
            </label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FiMapPin className="inline w-4 h-4 mr-2" />
              Localisation
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Biographie
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50 transition-colors resize-none"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
          >
            <FiSave className="w-5 h-5" />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;