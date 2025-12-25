import React, { useState } from 'react';
import { useClients } from '../../contexts/ClientsContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

/**
 * Page Admin - Gestion complète des utilisateurs
 */
const Users = () => {
  const { clients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock users data (à remplacer par vrai contexte)
  const [users, setUsers] = useState([
    {
      id: 'user-001',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@techcorp.com',
      role: 'responsible',
      status: 'active',
      organization: 'TechCorp Solutions',
      phone: '+33 6 12 34 56 78',
      lastLogin: '2024-12-25T10:30:00',
      createdAt: '2024-01-15T09:00:00',
    },
    {
      id: 'user-002',
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.martin@techcorp.com',
      role: 'partner',
      status: 'active',
      organization: 'TechCorp Solutions',
      phone: '+33 6 23 45 67 89',
      lastLogin: '2024-12-24T16:45:00',
      createdAt: '2024-02-10T14:00:00',
    },
    {
      id: 'user-003',
      firstName: 'Admin',
      lastName: 'Powalyze',
      email: 'admin@powalyze.com',
      role: 'powalyze-admin',
      status: 'active',
      organization: 'Powalyze',
      phone: '+33 1 23 45 67 89',
      lastLogin: '2024-12-25T11:00:00',
      createdAt: '2023-01-01T00:00:00',
    },
  ]);

  // Filtrage
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Formatage date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Badge rôle
  const getRoleBadge = (role) => {
    const badges = {
      'powalyze-admin': { label: 'Admin Powalyze', color: 'bg-purple-500' },
      'responsible': { label: 'Responsable', color: 'bg-blue-500' },
      'partner': { label: 'Partenaire', color: 'bg-green-500' },
    };
    const badge = badges[role] || { label: role, color: 'bg-gray-500' };
    return (
      <span className={`px-2 py-1 ${badge.color} text-white text-xs rounded-full`}>
        {badge.label}
      </span>
    );
  };

  // Badge statut
  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">✓ Actif</span>
    ) : (
      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">✗ Inactif</span>
    );
  };

  // Statistiques
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === 'active').length,
    admins: users.filter((u) => u.role === 'powalyze-admin').length,
    responsibles: users.filter((u) => u.role === 'responsible').length,
    partners: users.filter((u) => u.role === 'partner').length,
  };

  // Créer utilisateur
  const handleCreateUser = (formData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      ...formData,
      status: 'active',
      lastLogin: null,
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  // Modifier utilisateur
  const handleEditUser = (formData) => {
    setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u)));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Supprimer utilisateur
  const handleDeleteUser = (userId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  // Toggle status
  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Gestion des utilisateurs
          </h1>
          <p className="text-dark-300">
            Gérez les comptes et les permissions des utilisateurs
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          ➕ Nouvel utilisateur
        </Button>
      </div>

      {/* Statistiques */}
      <Card.Grid cols={{ xs: 2, md: 5 }} gap="normal">
        <Card.Stat
          label="Total"
          value={stats.total}
          icon="👥"
          variant="elevated"
        />
        <Card.Stat
          label="Actifs"
          value={stats.active}
          icon="✅"
          variant="elevated"
        />
        <Card.Stat
          label="Admins"
          value={stats.admins}
          icon="👑"
          variant="elevated"
        />
        <Card.Stat
          label="Responsables"
          value={stats.responsibles}
          icon="📊"
          variant="elevated"
        />
        <Card.Stat
          label="Partenaires"
          value={stats.partners}
          icon="🤝"
          variant="elevated"
        />
      </Card.Grid>

      {/* Filtres */}
      <Card padding="normal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="🔍"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
          >
            <option value="all">Tous les rôles</option>
            <option value="powalyze-admin">Admin Powalyze</option>
            <option value="responsible">Responsable</option>
            <option value="partner">Partenaire</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </Card>

      {/* Liste des utilisateurs */}
      <Card title={`${filteredUsers.length} utilisateur(s)`} padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800 border-b border-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase">
                  Organisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-dark-400 text-sm">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-300">
                    {user.organization}
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-dark-300 text-sm">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'Jamais'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === 'active' ? '🔒' : '🔓'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Créer utilisateur */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Créer un nouvel utilisateur"
      >
        <UserForm onSubmit={handleCreateUser} onCancel={() => setShowCreateModal(false)} />
      </Modal>

      {/* Modal Modifier utilisateur */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        title="Modifier l'utilisateur"
      >
        <UserForm
          initialData={selectedUser}
          onSubmit={handleEditUser}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      </Modal>
    </div>
  );
};

// Formulaire utilisateur
const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'partner',
      organization: '',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Prénom"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
        />
        <Input
          label="Nom"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        label="Téléphone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Input
        label="Organisation"
        value={formData.organization}
        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
        required
      />
      <div>
        <label className="block text-dark-200 mb-2">Rôle</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white"
          required
        >
          <option value="partner">Partenaire</option>
          <option value="responsible">Responsable</option>
          <option value="powalyze-admin">Admin Powalyze</option>
        </select>
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" fullWidth>
          {initialData ? 'Mettre à jour' : 'Créer'}
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default Users;
