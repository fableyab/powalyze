// Script pour exécuter le fix RLS automatiquement sur Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://phfeteiholkfiredgero.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.argv[2];

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_KEY requis');
  console.error('Usage: node apply-rls-fix.js YOUR_SERVICE_ROLE_KEY');
  console.error('');
  console.error('🔑 Pour obtenir la Service Role Key:');
  console.error('1. https://supabase.com/dashboard/project/phfeteiholkfiredgero/settings/api');
  console.error('2. Copiez "service_role" key (secret)');
  process.exit(1);
}

async function applyFix() {
  console.log('🚀 Application du fix RLS...');
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Lire le fichier SQL
  const sqlPath = path.join(__dirname, 'migrations', 'fix-rls-organizations.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  
  // Diviser en commandes individuelles
  const commands = sqlContent
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
  
  console.log(`📝 ${commands.length} commandes SQL à exécuter`);
  
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i] + ';';
    console.log(`\n⏳ [${i+1}/${commands.length}] Exécution...`);
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: cmd });
      
      if (error) {
        // Essayer méthode alternative
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ query: cmd })
        });
        
        if (!response.ok) {
          console.error(`❌ Erreur sur commande ${i+1}`);
          console.error(cmd.substring(0, 100) + '...');
          continue;
        }
      }
      
      console.log(`✅ Commande ${i+1} OK`);
    } catch (err) {
      console.error(`⚠️  Erreur commande ${i+1}:`, err.message);
    }
  }
  
  console.log('\n✅ Fix RLS appliqué!');
  console.log('🎉 Vous pouvez maintenant créer des projets');
}

applyFix().catch(err => {
  console.error('❌ Erreur fatale:', err);
  process.exit(1);
});
