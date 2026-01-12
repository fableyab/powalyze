/**
 * Script de création automatique des tables Supabase
 * Exécute: node create-tables.js
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqwcpewngbxnkcytztzk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxd2NwZXduZ2J4bmtjeXR6dHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Njk4NTUsImV4cCI6MjA4MDU0NTg1NX0.XY-rz0BHw8Xe6fVa6FRHm2SoG0CCjF0TQZ7lUq9n234';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🚀 Création automatique des tables Supabase...\n');

async function createTables() {
  try {
    // Test de connexion
    console.log('1️⃣ Test de connexion à Supabase...');
    const { data: testData, error: testError } = await supabase
      .from('organizations')
      .select('count')
      .limit(1);

    if (!testError) {
      console.log('✅ Table organizations existe déjà!\n');
    } else {
      console.log('⚠️  Tables manquantes - création nécessaire\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('❌ ERREUR: Impossible de créer les tables via JavaScript');
      console.log('   Les tables SQL doivent être créées depuis Supabase Dashboard\n');
      console.log('📋 SOLUTION:\n');
      console.log('1. Va sur: https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql');
      console.log('2. Clique "New query"');
      console.log('3. Copie-colle le contenu de SUPABASE_SCHEMA_CLEAN.sql');
      console.log('4. Clique RUN\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      process.exit(1);
    }

    // Vérifier les autres tables
    console.log('2️⃣ Vérification des tables...\n');

    const tables = ['organizations', 'user_organizations', 'initiatives', 'risks', 'decisions', 'alerts'];
    const results = {};

    for (const table of tables) {
      const { error } = await supabase.from(table).select('count').limit(1);
      results[table] = !error;
      console.log(`   ${!error ? '✅' : '❌'} ${table}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const allExist = Object.values(results).every(v => v);

    if (allExist) {
      console.log('🎉 TOUTES LES TABLES EXISTENT!\n');
      console.log('✅ Vous pouvez maintenant créer des projets sans erreur.\n');
      console.log('🚀 Testez sur: https://www.powalyze.com/app/projects/new\n');
    } else {
      console.log('❌ TABLES MANQUANTES\n');
      console.log('📋 ACTION REQUISE:\n');
      console.log('1. Ouvrez Supabase SQL Editor:');
      console.log('   https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql\n');
      console.log('2. Exécutez le fichier: SUPABASE_SCHEMA_CLEAN.sql\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

createTables();
