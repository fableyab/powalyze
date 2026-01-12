# Guide de Gestion des Collaborateurs Powalyze

## Vue d'Ensemble

Le système de gestion des collaborateurs Powalyze permet aux administrateurs d'inviter, gérer et contrôler les accès des membres de l'équipe avec une interface Swiss Luxury élégante et des permissions granulaires.

## Accès à la Gestion des Collaborateurs

### URL
**Settings Page**: https://www.powalyze.com/app/settings

La section "Team Collaborators" se trouve en bas de la page Settings, après les sections Profile, Language, Notifications et Security.

## Système de Rôles

### 1. Admin (Crown Icon - Gold)
**Permissions:**
- Accès complet au système
- Gestion des utilisateurs (invitation, modification, suppression)
- Configuration de l'organisation
- Gestion des abonnements et facturation
- Accès à toutes les données et rapports
- Modification des settings globaux

**Badge visuel:** 
- Icône: Crown (Couronne)
- Couleur: Gold (#D4AF37)
- Border: `border-[#D4AF37]/20`
- Background: `bg-[#D4AF37]/10`

### 2. Manager (Star Icon - Blue)
**Permissions:**
- Gestion complète des projets
- Création et modification d'initiatives
- Gestion des risques
- Logging des décisions
- Accès aux rapports Power BI
- Gestion de son équipe projet
- Cannot: Modifier settings globaux, gérer abonnements

**Badge visuel:**
- Icône: Star (Étoile)
- Couleur: Blue (#3B82F6)
- Border: `border-blue-400/20`
- Background: `bg-blue-400/10`

### 3. Analyst (CheckCircle Icon - Green)
**Permissions:**
- Édition des projets existants
- Mise à jour des statuts et métriques
- Contribution aux rapports
- Lecture des risques et décisions
- Cannot: Créer projets, modifier structure, gérer équipe

**Badge visuel:**
- Icône: CheckCircle
- Couleur: Green (#22C55E)
- Border: `border-green-400/20`
- Background: `bg-green-400/10`

### 4. Viewer (Shield Icon - Grey)
**Permissions:**
- Lecture seule de toutes les données
- Accès aux dashboards et rapports
- Cannot: Modifier quoi que ce soit

**Badge visuel:**
- Icône: Shield
- Couleur: White/Grey (white/40)
- Border: `border-white/10`
- Background: `bg-white/5`

## Processus d'Invitation

### 1. Accéder au Modal d'Invitation

**Bouton:**
```jsx
<button className="px-4 py-2 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2">
  <UserPlus className="w-3 h-3" />
  Invite Member
</button>
```

Cliquer sur ce bouton ouvre un modal Swiss Luxury avec formulaire d'invitation.

### 2. Remplir le Formulaire

**Champs requis:**

1. **First Name**
   - Type: Text input
   - Exemple: "John"
   - Validation: Requis

2. **Last Name**
   - Type: Text input
   - Exemple: "Doe"
   - Validation: Requis

3. **Email Address**
   - Type: Email input
   - Exemple: "john.doe@company.com"
   - Validation: Format email valide + requis

4. **Role** (Dropdown)
   - Options:
     - `viewer`: "Viewer - View only access"
     - `analyst`: "Analyst - Can edit projects"
     - `manager`: "Manager - Full project management"
     - `admin`: "Admin - Full system access"
   - Default: `viewer`

### 3. Envoyer l'Invitation

**Actions disponibles:**
- **Cancel**: Ferme le modal sans sauvegarder
- **Send Invite**: Crée le membre avec statut "Pending"

**Code d'invitation:**
```javascript
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
    setShowInviteModal(false);
  }
};
```

## Gestion des Membres Existants

### Vue Liste des Membres

Chaque membre est affiché dans une carte avec:

**Informations:**
- Avatar: Initiales dans gradient gold/blue
- Nom complet
- Role badge (avec icône et couleur)
- Status badge ("Pending" si invitation non acceptée)
- Email
- Date de joining

**Structure carte:**
```jsx
<div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] p-4 hover:border-white/10 transition-all duration-500 group">
  {/* Avatar + Info + Actions */}
</div>
```

### Actions sur les Membres

**Delete Member** (apparaît au hover):
```javascript
const handleRemoveMember = (id) => {
  setTeamMembers(teamMembers.filter(m => m.id !== id));
};
```

Bouton:
```jsx
<button className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/10 border border-red-500/20 rounded-[2px] hover:bg-red-500/20 transition-all duration-500">
  <Trash2 className="w-4 h-4 text-red-400" />
</button>
```

## Statuts des Membres

### Active
- Badge: Aucun badge spécifique
- Signification: Membre a accepté l'invitation et accède à la plateforme
- Couleur: Normal

### Pending
- Badge: Orange avec border
```jsx
<span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-[2px] text-xs tracking-[0.1em] uppercase">
  Pending
</span>
```
- Signification: Invitation envoyée, en attente d'acceptation
- Actions: Le membre doit cliquer sur le lien d'invitation email

## Membres Mock par Défaut

Le système démarre avec 4 membres exemple:

```javascript
const teamMembers = [
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
];
```

## Design Swiss Luxury

### Modal d'Invitation
- Background: `bg-[#020713]` (Swiss dark blue)
- Border: `border-white/10`
- Rounded: `rounded-[2px]` (Swiss precision)
- Backdrop: `bg-black/80 backdrop-blur-xl`

### Inputs
```jsx
className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
```

### Buttons
**Primary (Send Invite):**
```jsx
className="flex-1 px-4 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase"
```

**Secondary (Cancel):**
```jsx
className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-[2px] text-xs hover:bg-white/10 transition-all duration-500 tracking-[0.2em] uppercase"
```

### Avatar Gradient
```jsx
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-blue-400 flex items-center justify-center">
  <span className="text-sm font-semibold text-black">
    {member.name.split(' ').map(n => n[0]).join('')}
  </span>
</div>
```

## Intégration Future avec Supabase

### Table Structure
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'analyst', 'viewer')),
  status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'inactive')),
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policies
```sql
-- Members can only see team in their org
CREATE POLICY "Users see own org team"
ON team_members
FOR SELECT
USING (organization_id = (SELECT organization_id FROM profiles WHERE user_id = auth.uid()));

-- Only admins can invite
CREATE POLICY "Admins can invite"
ON team_members
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
    AND organization_id = team_members.organization_id
  )
);
```

### Service Functions
```javascript
// src/lib/teamService.js
export async function inviteTeamMember(memberData) {
  const { data, error } = await customSupabaseClient
    .from('team_members')
    .insert({
      email: memberData.email,
      first_name: memberData.firstName,
      last_name: memberData.lastName,
      role: memberData.role,
      status: 'pending',
      organization_id: user.organization_id,
      invited_by: user.id
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Send invitation email
  await sendInvitationEmail(data);
  
  return data;
}

export async function getTeamMembers(organizationId) {
  const { data, error } = await customSupabaseClient
    .from('team_members')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function removeTeamMember(memberId) {
  const { error } = await customSupabaseClient
    .from('team_members')
    .delete()
    .eq('id', memberId);
  
  if (error) throw error;
}
```

## Notifications Email

### Template d'Invitation
```html
Subject: Invitation à rejoindre Powalyze

Bonjour {firstName},

{inviterName} vous invite à rejoindre l'équipe {organizationName} sur Powalyze.

Votre rôle: {role}

Cliquez sur le lien ci-dessous pour accepter l'invitation et créer votre compte:
{invitationLink}

Ce lien expire dans 7 jours.

---
Powalyze - Swiss Precision in Portfolio Governance
```

### Email Service
```javascript
// backend/services/emailService.js
export async function sendInvitationEmail(member, inviter, organization) {
  const invitationToken = generateInvitationToken(member.id);
  const invitationLink = `${FRONTEND_URL}/accept-invitation?token=${invitationToken}`;
  
  await sendEmail({
    to: member.email,
    subject: `Invitation à rejoindre ${organization.name} sur Powalyze`,
    html: renderInvitationTemplate({
      firstName: member.first_name,
      inviterName: inviter.name,
      organizationName: organization.name,
      role: member.role,
      invitationLink
    })
  });
}
```

## Meilleures Pratiques

### Sécurité
1. Toujours vérifier le rôle de l'utilisateur avant permettre invitation
2. Limiter invitations par jour (rate limiting)
3. Expirer les tokens d'invitation après 7 jours
4. Logger toutes les actions d'invitation/suppression

### UX
1. Confirmation avant suppression membre
2. Feedback visuel immédiat après actions
3. Afficher erreurs de validation clairement
4. Permettre resend invitation si pending > 7 jours

### Performance
1. Paginer liste si > 50 membres
2. Debounce search input
3. Cache la liste avec React Query

---

## Checklist Implémentation Production

- [ ] Créer table `team_members` dans Supabase
- [ ] Configurer RLS policies
- [ ] Implémenter `teamService.js`
- [ ] Configurer service email (SendGrid/Mailgun)
- [ ] Créer templates email
- [ ] Ajouter page `/accept-invitation`
- [ ] Implémenter token generation/validation
- [ ] Ajouter rate limiting
- [ ] Logger toutes actions admin
- [ ] Tests end-to-end flux invitation

---

© 2024 Powalyze - Team Collaboration Made Swiss
