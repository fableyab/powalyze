import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClients } from '../../../contexts/ClientsContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input, { Select } from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * Page admin - Gestion des clients (organisations)
 */
const AdminClients = () => {
  const {
    organizations,
    users,
    createOrganization,
    createResponsible,
    getOrganizationUsers,
  } = useClients();
  const { isMobile } = useResponsive();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // États du formulaire de création
  const [formData, setFormData] = useState({
    // Organization
    orgName: '',
    orgEmail: '',
    orgPhone: '',
    orgAddress: '',
    subscriptionPlan: 'professional',
    // Responsible
    respFirstName: '',
    respLastName: '',
    respEmail: '',
    respPhone: '',
    respPosition: '',
  });

  // Filtrage
  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Couleur du statut
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      trial: 'bg-blue-500',
      inactive: 'bg-gray-500',
      suspended: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  // Créer client avec responsable
  const handleCreateClient = async () => {
    if (!formData.orgName || !formData.orgEmail || !formData.respFirstName || !formData.respLastName || !formData.respEmail) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer organisation
    const org = await createOrganization({
      name: formData.orgName,
      email: formData.orgEmail,
      phone: formData.orgPhone,
      address: formData.orgAddress,
      subscription: {
        plan: formData.subscriptionPlan,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // +1 an
      },
    });

    // Créer responsable
    await createResponsible(org.id, {
      firstName: formData.respFirstName,
      lastName: formData.respLastName,
      email: formData.respEmail,
      phone: formData.respPhone,
      position: formData.respPosition,
    });

    // Reset formulaire
    setFormData({
      orgName: '',
      orgEmail: '',
      orgPhone: '',
      orgAddress: '',
      subscriptionPlan: 'professional',
      respFirstName: '',
      respLastName: '',
      respEmail: '',
      respPhone: '',
      respPosition: '',
    });

    setCreateModalOpen(false);
    alert(`✅ Client créé avec succès!\n\nOrganisation: ${org.name}\nResponsable: ${formData.respFirstName} ${formData.respLastName}\n\nLes identifiants ont été envoyés par email.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Gestion des clients
          </h1>
          <p className="text-dark-300">
            {filteredOrganizations.length} client{filteredOrganizations.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="primary" onClick={() => setCreateModalOpen(true)}>
          <span className="mr-2">➕</span>
          {!isMobile && 'Nouveau client'}
        </Button>
      </div>

      {/* Stats rapides */}
      <Card.Grid cols={{ xs: 1, sm: 2, lg: 4 }} gap="normal">
        <Card.Stat
          label="Total clients"
          value={organizations.length}
          icon={<span className="text-2xl">🏢</span>}
          variant="elevated"
        />
        <Card.Stat
          label="Clients actifs"
          value={organizations.filter((o) => o.status === 'active').length}
          icon={<span className="text-2xl">✅</span>}
          variant="elevated"
        />
        <Card.Stat
          label="En essai"
          value={organizations.filter((o) => o.status === 'trial').length}
          icon={<span className="text-2xl">🔄</span>}
          variant="elevated"
        />
        <Card.Stat
          label="Total utilisateurs"
          value={users.length}
          icon={<span className="text-2xl">👥</span>}
          variant="elevated"
        />
      </Card.Grid>

      {/* Filtres */}
      <Card padding="normal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-primary"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'active', label: 'Actifs' },
              { value: 'trial', label: 'En essai' },
              { value: 'inactive', label: 'Inactifs' },
              { value: 'suspended', label: 'Suspendus' },
            ]}
            placeholder="Tous les statuts"
            fullWidth
          />
        </div>
      </Card>

      {/* Liste des clients */}
      {filteredOrganizations.length === 0 ? (
        <Card padding="large">
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">🏢</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun client trouvé
            </h3>
            <p className="text-dark-300 mb-6">
              Créez votre premier client pour commencer
            </p>
            <Button variant="primary" onClick={() => setCreateModalOpen(true)}>
              Créer un client
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrganizations.map((org) => {
            const orgUsers = getOrganizationUsers(org.id);
            const responsible = orgUsers.find((u) => u.role === 'responsible');

            return (
              <Card key={org.id} padding="normal" hoverable>
                <div className="flex items-start justify-between">
                  {/* Info client */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-primary to-gold-secondary rounded-lg flex items-center justify-center font-bold text-dark-primary text-xl flex-shrink-0">
                      {org.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {org.name}
                        </h3>
                        <span className={`px-2 py-1 ${getStatusColor(org.status)} text-white text-xs rounded-full`}>
                          {org.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center text-dark-300">
                          <span className="mr-2">📧</span>
                          {org.email}
                        </div>
                        {org.phone && (
                          <div className="flex items-center text-dark-300">
                            <span className="mr-2">📞</span>
                            {org.phone}
                          </div>
                        )}
                        <div className="flex items-center text-dark-300">
                          <span className="mr-2">👤</span>
                          Responsable: {responsible ? `${responsible.firstName} ${responsible.lastName}` : 'Non défini'}
                        </div>
                        <div className="flex items-center text-dark-300">
                          <span className="mr-2">👥</span>
                          {orgUsers.length} utilisateur{orgUsers.length > 1 ? 's' : ''}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-dark-400">
                        <span>Abonnement: {org.subscription.plan}</span>
                        <span>•</span>
                        <span>Créé le {formatDate(org.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 ml-4">
                    <Link to={`/admin/clients/${org.id}`}>
                      <Button variant="primary" size="sm">
                        Voir détails
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal création client */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Créer un nouveau client"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleCreateClient}>
              Créer le client
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Organisation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              📋 Informations de l'organisation
            </h3>
            <div className="space-y-4">
              <Input
                label="Nom de l'organisation *"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                placeholder="TechCorp Solutions"
                fullWidth
              />
              <Input
                label="Email *"
                type="email"
                value={formData.orgEmail}
                onChange={(e) => setFormData({ ...formData, orgEmail: e.target.value })}
                placeholder="contact@techcorp.com"
                fullWidth
              />
              <Input
                label="Téléphone"
                type="tel"
                value={formData.orgPhone}
                onChange={(e) => setFormData({ ...formData, orgPhone: e.target.value })}
                placeholder="+33 1 23 45 67 89"
                fullWidth
              />
              <Input
                label="Adresse"
                value={formData.orgAddress}
                onChange={(e) => setFormData({ ...formData, orgAddress: e.target.value })}
                placeholder="123 Avenue des Champs-Élysées, 75008 Paris"
                fullWidth
              />
              <Select
                label="Plan d'abonnement"
                value={formData.subscriptionPlan}
                onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                options={[
                  { value: 'trial', label: 'Essai gratuit' },
                  { value: 'starter', label: 'Starter' },
                  { value: 'professional', label: 'Professional' },
                  { value: 'enterprise', label: 'Enterprise' },
                ]}
                fullWidth
              />
            </div>
          </div>

          {/* Responsable */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              👤 Responsable principal
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Prénom *"
                  value={formData.respFirstName}
                  onChange={(e) => setFormData({ ...formData, respFirstName: e.target.value })}
                  placeholder="Jean"
                  fullWidth
                />
                <Input
                  label="Nom *"
                  value={formData.respLastName}
                  onChange={(e) => setFormData({ ...formData, respLastName: e.target.value })}
                  placeholder="Dupont"
                  fullWidth
                />
              </div>
              <Input
                label="Email *"
                type="email"
                value={formData.respEmail}
                onChange={(e) => setFormData({ ...formData, respEmail: e.target.value })}
                placeholder="jean.dupont@techcorp.com"
                fullWidth
              />
              <Input
                label="Téléphone"
                type="tel"
                value={formData.respPhone}
                onChange={(e) => setFormData({ ...formData, respPhone: e.target.value })}
                placeholder="+33 6 12 34 56 78"
                fullWidth
              />
              <Input
                label="Poste"
                value={formData.respPosition}
                onChange={(e) => setFormData({ ...formData, respPosition: e.target.value })}
                placeholder="Directeur des Opérations"
                fullWidth
              />
            </div>
          </div>

          <div className="p-4 bg-dark-700 rounded-lg">
            <p className="text-dark-300 text-sm">
              ℹ️ Un email sera automatiquement envoyé au responsable avec ses identifiants de connexion.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminClients;
