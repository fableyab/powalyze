-- ⭐ Schéma SQL complet — Table documents
-- À exécuter dans Supabase SQL Editor

-- Supprimer l'ancienne table si elle existe
drop table if exists documents cascade;

-- Créer la nouvelle table avec le bon schéma
create table documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid null,
  name text not null,
  path text not null,
  theme text not null,
  type text null,
  tags text null,
  version integer not null default 1,
  created_at timestamp with time zone default now()
);

-- Index pour accélérer les filtres
create index documents_user_id_idx on documents(user_id);
create index documents_theme_idx on documents(theme);
create index documents_type_idx on documents(type);

-- RLS (Row Level Security)
alter table documents enable row level security;

-- Politique : lecture
create policy "Users can read their own documents"
on documents for select
using (auth.uid() = user_id);

-- Politique : insertion
create policy "Users can insert their own documents"
on documents for insert
with check (auth.uid() = user_id);

-- Politique : suppression
create policy "Users can delete their own documents"
on documents for delete
using (auth.uid() = user_id);

-- Politique : mise à jour
create policy "Users can update their own documents"
on documents for update
using (auth.uid() = user_id);
