const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 3001,
  path: '/api',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('HEADERS:', res.headers);
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.log('BODY:', data);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('HTTP request error:', e.message);
  process.exit(1);
});

req.end();
