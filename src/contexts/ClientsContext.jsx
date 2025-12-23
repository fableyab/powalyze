import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ClientsContext = createContext();

// Rôles utilisateur
export const USER_ROLES = {
  POWALYZE_ADMIN: 'powalyze-admin',
  RESPONSIBLE: 'responsible',
  PARTNER: 'partner',
};

// Statuts d'organisation
export const ORG_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  TRIAL: 'trial',
};

export function ClientsProvider({ children }) {
  // Organisations (clients)
  const [organizations, setOrganizations] = useLocalStorage('powalyze_organizations', []);
  
  // Utilisateurs (responsables + partenaires)
  const [users, setUsers] = useLocalStorage('powalyze_users', []);
  
  const [loading, setLoading] = useState(false);

  // === ORGANISATIONS ===

  // Créer une organisation (client)
  const createOrganization = (orgData) => {
    const newOrg = {
      id: uuidv4(),
      ...orgData,
      status: orgData.status || ORG_STATUSES.TRIAL,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subscription: orgData.subscription || {
        plan: 'trial',
        startDate: new Date().toISOString(),
        endDate: null,
      },
      settings: orgData.settings || {},
    };

    setOrganizations(prev => [...prev, newOrg]);
    return newOrg;
  };

  // Mettre à jour une organisation
  const updateOrganization = (orgId, updates) => {
    setOrganizations(prev =>
      prev.map(org =>
        org.id === orgId
          ? {
              ...org,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : org
      )
    );
  };

  // Supprimer une organisation
  const deleteOrganization = (orgId) => {
    // Supprimer aussi tous les utilisateurs de cette org
    setUsers(prev => prev.filter(user => user.organizationId !== orgId));
    setOrganizations(prev => prev.filter(org => org.id !== orgId));
  };

  // Obtenir une organisation par ID
  const getOrganizationById = (orgId) => {
    return organizations.find(org => org.id === orgId);
  };

  // === UTILISATEURS ===

  // Créer un utilisateur responsable
  const createResponsible = (orgId, userData) => {
    const password = generatePassword();
    
    const newUser = {
      id: uuidv4(),
      organizationId: orgId,
      role: USER_ROLES.RESPONSIBLE,
      ...userData,
      credentials: {
        email: userData.email,
        password: password,
        tempPassword: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
    };

    setUsers(prev => [...prev, newUser]);
    
    // Simuler l'envoi d'email
    sendWelcomeEmail(newUser, password);
    
    return newUser;
  };

  // Créer un partenaire (par le responsable)
  const createPartner = (orgId, responsibleId, partnerData) => {
    const password = generatePassword();
    
    const newUser = {
      id: uuidv4(),
      organizationId: orgId,
      role: USER_ROLES.PARTNER,
      createdBy: responsibleId,
      ...partnerData,
      credentials: {
        email: partnerData.email,
        username: partnerData.username || partnerData.email,
        password: password,
        tempPassword: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      permissions: partnerData.permissions || [],
    };

    setUsers(prev => [...prev, newUser]);
    
    // Simuler l'envoi d'email
    sendPartnerInviteEmail(newUser, password);
    
    return newUser;
  };

  // Mettre à jour un utilisateur
  const updateUser = (userId, updates) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : user
      )
    );
  };

  // Supprimer un utilisateur
  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  // Obtenir un utilisateur par ID
  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  // Obtenir les utilisateurs d'une organisation
  const getOrganizationUsers = (orgId, role = null) => {
    return users.filter(user => {
      if (user.organizationId !== orgId) return false;
      if (role && user.role !== role) return false;
      return true;
    });
  };

  // Obtenir le responsable d'une organisation
  const getOrganizationResponsible = (orgId) => {
    return users.find(user => 
      user.organizationId === orgId && 
      user.role === USER_ROLES.RESPONSIBLE
    );
  };

  // Obtenir les partenaires d'une organisation
  const getOrganizationPartners = (orgId) => {
    return users.filter(user => 
      user.organizationId === orgId && 
      user.role === USER_ROLES.PARTNER
    );
  };

  // === EMAIL & CREDENTIALS ===

  // Générer un mot de passe aléatoire
  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Envoyer l'email de bienvenue (simulé)
  const sendWelcomeEmail = (user, password) => {
    console.log('📧 EMAIL ENVOYÉ - Bienvenue Responsable');
    console.log('To:', user.credentials.email);
    console.log('Identifiant:', user.credentials.email);
    console.log('Mot de passe temporaire:', password);
    console.log('Lien:', `${window.location.origin}/login`);
    
    // TODO: Implémenter l'envoi réel d'email via API
    return {
      success: true,
      messageId: uuidv4(),
      sentAt: new Date().toISOString(),
    };
  };

  // Envoyer l'email d'invitation partenaire (simulé)
  const sendPartnerInviteEmail = (user, password) => {
    console.log('📧 EMAIL ENVOYÉ - Invitation Partenaire');
    console.log('To:', user.credentials.email);
    console.log('Identifiant:', user.credentials.username);
    console.log('Mot de passe temporaire:', password);
    console.log('Lien:', `${window.location.origin}/login`);
    
    // TODO: Implémenter l'envoi réel d'email via API
    return {
      success: true,
      messageId: uuidv4(),
      sentAt: new Date().toISOString(),
    };
  };

  // Renvoyer les identifiants
  const resendCredentials = (userId) => {
    const user = getUserById(userId);
    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const newPassword = generatePassword();
    
    // Mettre à jour le mot de passe
    updateUser(userId, {
      credentials: {
        ...user.credentials,
        password: newPassword,
        tempPassword: true,
      },
    });

    // Renvoyer l'email
    if (user.role === USER_ROLES.RESPONSIBLE) {
      sendWelcomeEmail(user, newPassword);
    } else {
      sendPartnerInviteEmail(user, newPassword);
    }

    return {
      success: true,
      sentAt: new Date().toISOString(),
    };
  };

  // === STATISTIQUES ===

  const getStats = () => {
    return {
      organizations: {
        total: organizations.length,
        active: organizations.filter(o => o.status === ORG_STATUSES.ACTIVE).length,
        trial: organizations.filter(o => o.status === ORG_STATUSES.TRIAL).length,
        inactive: organizations.filter(o => o.status === ORG_STATUSES.INACTIVE).length,
      },
      users: {
        total: users.length,
        responsibles: users.filter(u => u.role === USER_ROLES.RESPONSIBLE).length,
        partners: users.filter(u => u.role === USER_ROLES.PARTNER).length,
      },
    };
  };

  const value = {
    // Organizations
    organizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizationById,
    
    // Users
    users,
    createResponsible,
    createPartner,
    updateUser,
    deleteUser,
    getUserById,
    getOrganizationUsers,
    getOrganizationResponsible,
    getOrganizationPartners,
    
    // Email & Credentials
    resendCredentials,
    
    // Stats
    getStats,
    
    // Constants
    USER_ROLES,
    ORG_STATUSES,
    
    // Loading
    loading,
  };

  return (
    <ClientsContext.Provider value={value}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
}

export default ClientsContext;
