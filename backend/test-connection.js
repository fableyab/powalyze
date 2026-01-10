// Test simple du backend
const http = require('http');

// Test 1: Health endpoint
console.log('📋 Test du backend Power BI\n');

setTimeout(() => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/health',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('✅ Backend répond !');
      console.log('Status:', res.statusCode);
      console.log('Response:', data);
    });
  });

  req.on('error', (error) => {
    console.log('❌ Erreur de connexion:');
    console.log(error.message);
    console.log('\n💡 Solution:');
    console.log('1. Vérifiez que le serveur tourne: cd backend && npm start');
    console.log('2. Vérifiez le port 3001 est libre: netstat -ano | findstr :3001');
  });

  req.on('timeout', () => {
    console.log('⏱️ Timeout - Le serveur ne répond pas');
    req.destroy();
  });

  req.end();
}, 1000);
