const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`✅ Backend responding with status: ${res.statusCode}`);
  process.exit(0);
});

req.on('error', (error) => {
  console.error(`❌ Connection error: ${error.message}`);
  process.exit(1);
});

req.end();
