const API = 'http://localhost:3001/api';

async function postJson(path, body, token) {
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  if (token) opts.headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function getJson(path, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function run() {
  try {
    console.log('Registrando usuario de prueba...');
    const reg = await postJson('/auth/register', {
      name: 'Prueba Usuario',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456',
    });
    console.log('Registro respuesta:', reg);

    console.log('\nIniciando sesión...');
    const login = await postJson('/auth/login', { email: 'test@example.com', password: '123456' });
    console.log('Login respuesta:', login);

    const token = login.access_token;
    console.log('\nSolicitando perfil con token...');
    const profile = await getJson('/auth/profile', token);
    console.log('Profile respuesta:', profile);
  } catch (err) {
    console.error('Error en test:', err.message);
    process.exit(1);
  }
}

run();
