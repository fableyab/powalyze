# 📄 Module Documents Premium - Powalyze

## 📊 Vue d'ensemble

Système de gestion documentaire avancé avec :
- **Métadonnées enrichies** : Thème, Type, Tags, Version
- **Filtres multiples** : Thème, Type, Tags, recherche textuelle
- **Preview intégrée** : PDF et images
- **Upload drag & drop** : Jusqu'à 50 MB par fichier
- **Multi-tenant sécurisé** : Row Level Security (RLS)

---

## 🗃️ Schéma de la base de données

### Table `documents`

```sql
CREATE TABLE documents (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id      uuid NULL,
  name            text NOT NULL,
  path            text NOT NULL,
  theme           text NOT NULL,
  type            text NULL,
  tags            text NULL,
  version         integer NOT NULL DEFAULT 1,
  created_at      timestamp with time zone DEFAULT now()
);
```

### Index

```sql
CREATE INDEX documents_user_id_idx ON documents(user_id);
CREATE INDEX documents_theme_idx ON documents(theme);
CREATE INDEX documents_type_idx ON documents(type);
```

### Row Level Security (RLS)

```sql
-- Les utilisateurs peuvent lire uniquement leurs documents
CREATE POLICY "Users can read their own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent insérer uniquement leurs documents
CREATE POLICY "Users can insert their own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer uniquement leurs documents
CREATE POLICY "Users can delete their own documents"
ON documents FOR DELETE
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier uniquement leurs documents
CREATE POLICY "Users can update their own documents"
ON documents FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 🚀 Installation

### Étape 1 : Exécuter la migration SQL

Dans **Supabase SQL Editor**, exécuter :

```bash
supabase/migrations/20260108_documents_schema_v2.sql
```

Cela va :
- ✅ Supprimer l'ancienne table `documents` (si existante)
- ✅ Créer la nouvelle table avec le nouveau schéma
- ✅ Créer les index pour les performances
- ✅ Activer RLS avec les policies

### Étape 2 : Vérifier le bucket Supabase Storage

Dans **Supabase Dashboard → Storage**, vérifier que le bucket `documents` existe et a les policies suivantes :

```sql
-- SELECT policy
CREATE POLICY "Users can read their own documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- INSERT policy
CREATE POLICY "Users can upload to their folder"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- DELETE policy
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
```

### Étape 3 : Build et déployer

```bash
npx vite build
vercel --prod
```

---

## 📦 Composants

### `UploadBox.jsx`

Formulaire d'upload avec drag & drop et métadonnées :

```jsx
<UploadBox onUploadComplete={handleUploadComplete} />
```

**Champs** :
- 🔴 **Thème** (obligatoire) : Ex. "Décision stratégique", "Audit financier"
- ⚪ **Type** (optionnel) : Ex. "Business case", "Rapport", "Contrat"
- ⚪ **Tags** (optionnel) : Ex. "finance, audit, Q1-2024" (séparés par virgules)
- ⚙️ **Version** : Auto-assignée à 1

**Validation** :
- ✅ Taille max : 50 MB
- ✅ Types acceptés : PDF, Images, Word, Excel, TXT, CSV

---

### `DocumentsList.jsx`

Liste des documents avec badges visuels :

```jsx
<DocumentsList 
  documents={filteredDocs} 
  onDocumentDeleted={handleDocumentDeleted}
/>
```

**Affichage** :
- 🔵 Badge bleu : Thème
- 🟣 Badge violet : Type
- 🟢 Badge vert : Tags
- 🔢 Version : `v1`, `v2`, etc.
- 📅 Date de création

**Actions** :
- 👁️ **Preview** : Ouvre le modal de prévisualisation
- ⬇️ **Download** : Télécharge le fichier
- 🗑️ **Delete** : Supprime (avec confirmation)

---

### `DocumentPreview.jsx`

Modal de prévisualisation pour PDF et images :

```jsx
<DocumentPreview 
  document={doc} 
  isOpen={isOpen} 
  onClose={handleClose}
/>
```

**Fonctionnalités** :
- 📄 **PDF** : Affichage via iframe
- 🖼️ **Images** : Affichage responsive
- ⬇️ **Download** : Bouton de téléchargement direct
- 🔗 **Signed URL** : Génération automatique (1h de validité)

---

### `Documents.jsx`

Page principale avec filtres avancés :

```jsx
const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [themeFilter, setThemeFilter] = useState('');
  
  // ...
}
```

**Filtres** :
- 🔍 **Recherche** : Nom du document OU tags
- 🎯 **Thème** : Dropdown dynamique (extrait des documents existants)
- 📂 **Type** : Dropdown dynamique (extrait des documents existants)
- 📄 **Format** : Tous / PDF / Images

**Stats** :
- 📊 Nombre total de documents
- 💾 Espace utilisé (MB)
- 📈 Documents uploadés ce mois

---

## 🔄 Flux d'utilisation

### 1. Upload d'un document

```
Utilisateur → Drag & Drop fichier
           → Renseigne Thème (requis)
           → Renseigne Type (optionnel)
           → Renseigne Tags (optionnel)
           → Clic "Uploader le document"
           → ✅ Document enregistré avec version=1
```

### 2. Recherche d'un document

```
Utilisateur → Tape "audit" dans la recherche
           → OU sélectionne "Audit financier" dans Thème
           → OU sélectionne "Rapport" dans Type
           → Liste filtrée en temps réel
```

### 3. Preview d'un document

```
Utilisateur → Clic sur icône 👁️
           → Modal s'ouvre
           → Signed URL générée (1h)
           → PDF affiché dans iframe
           → OU Image affichée
           → Clic X ou backdrop pour fermer
```

---

## 🛠️ Personnalisation

### Ajouter un nouveau champ

**Backend (SQL)** :
```sql
ALTER TABLE documents ADD COLUMN auteur text;
```

**Frontend (UploadBox.jsx)** :
```jsx
const [auteur, setAuteur] = useState('');

// Dans le INSERT
.insert({
  // ...
  auteur: auteur.trim() || null,
})
```

**Frontend (DocumentsList.jsx)** :
```jsx
{doc.auteur && (
  <span className="text-slate-400">
    Par {doc.auteur}
  </span>
)}
```

---

## 🔒 Sécurité

### Multi-tenant

Chaque utilisateur ne voit que **ses documents** grâce à RLS :

```sql
USING (auth.uid() = user_id)
```

### Storage isolation

Les fichiers sont stockés dans des dossiers par user_id :

```
documents/
  ├── user_id_1/
  │   ├── 1234567890-document1.pdf
  │   └── 1234567891-image.jpg
  └── user_id_2/
      └── 1234567892-report.pdf
```

### Signed URLs

Les URLs sont signées et expirent après **1 heure** :

```javascript
const { data } = await supabase.storage
  .from('documents')
  .createSignedUrl(doc.path, 3600); // 3600s = 1h
```

---

## ✅ Checklist déploiement

- [x] Exécuter migration SQL `20260108_documents_schema_v2.sql`
- [x] Vérifier bucket `documents` existe dans Supabase Storage
- [x] Vérifier Storage policies configurées
- [x] Tester upload d'un PDF
- [x] Tester upload d'une image
- [x] Tester filtres (thème, type, tags)
- [x] Tester preview PDF
- [x] Tester preview image
- [x] Tester téléchargement
- [x] Tester suppression
- [x] Build Vite sans erreurs
- [x] Déployer sur Vercel

---

## 📊 Statistiques d'utilisation

Requête SQL pour obtenir les stats :

```sql
-- Documents par thème
SELECT theme, COUNT(*) as count
FROM documents
GROUP BY theme
ORDER BY count DESC;

-- Documents par type
SELECT type, COUNT(*) as count
FROM documents
GROUP BY type
ORDER BY count DESC;

-- Tags les plus utilisés
SELECT unnest(string_to_array(tags, ',')) as tag, COUNT(*) as count
FROM documents
WHERE tags IS NOT NULL
GROUP BY tag
ORDER BY count DESC;

-- Espace total utilisé par utilisateur
SELECT user_id, SUM(file_size) as total_bytes
FROM documents
GROUP BY user_id
ORDER BY total_bytes DESC;
```

---

## 🎯 Évolutions futures

- [ ] Gestion des versions (v2, v3...)
- [ ] Commentaires sur les documents
- [ ] Partage inter-utilisateurs
- [ ] Historique des modifications
- [ ] OCR pour extraction de texte
- [ ] Recherche full-text dans le contenu
- [ ] Export en masse (ZIP)
- [ ] Dossiers / collections
- [ ] Permissions granulaires

---

## 🆘 Dépannage

### Erreur "Bucket 'documents' n'existe pas"

**Solution** :
1. Aller dans Supabase Dashboard → Storage
2. Créer un nouveau bucket `documents`
3. Activer "Public" : NON (private)
4. Appliquer les Storage policies ci-dessus

### Erreur "Policy violation"

**Solution** :
1. Vérifier que RLS est activé : `ALTER TABLE documents ENABLE ROW LEVEL SECURITY;`
2. Vérifier que les policies sont créées
3. Vérifier que l'utilisateur est authentifié : `auth.uid() IS NOT NULL`

### Upload échoue avec erreur 413

**Solution** :
- Vérifier la taille du fichier < 50 MB
- Augmenter la limite Supabase Storage (Dashboard → Settings → Storage)

### Preview ne s'affiche pas

**Solution** :
- Vérifier que `doc.path` est correct (doit être `user_id/timestamp-filename`)
- Vérifier que Signed URL est valide (< 1h)
- Vérifier le type MIME du fichier

---

**✨ Module Documents Premium by Powalyze**
