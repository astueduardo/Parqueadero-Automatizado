const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '2101087019',
  host: 'localhost',
  port: 5432,
  database: 'postgres', // Conectar a la BD por defecto primero
});

async function checkDatabases() {
  try {
    console.log('Conectando a PostgreSQL...\n');

    // Listar todas las bases de datos
    const result = await pool.query(`
      SELECT datname as database_name, 
      pg_size_pretty(pg_database_size(datname)) as size
      FROM pg_database 
      WHERE datistemplate = false 
      ORDER BY datname;
    `);

    console.log('=== BASES DE DATOS ===\n');
    result.rows.forEach(row => {
      console.log(`📦 ${row.database_name} (${row.size})`);
    });

    // Buscar la base de datos Movil__app específicamente
    console.log('\n=== VERIFICANDO Movil__app ===\n');
    const movilDb = result.rows.find(r => r.database_name === 'Movil__app');

    if (movilDb) {
      console.log(`✅ Base de datos "Movil__app" EXISTE`);
      console.log(`   Tamaño: ${movilDb.size}\n`);

      // Conectar a Movil__app y listar tablas
      const pool2 = new Pool({
        user: 'postgres',
        password: '2101087019',
        host: 'localhost',
        port: 5432,
        database: 'Movil__app',
      });

      const tables = await pool2.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
      `);

      console.log('📋 TABLAS EN Movil__app:');
      if (tables.rows.length === 0) {
        console.log('  (Sin tablas)');
      } else {
        tables.rows.forEach(t => {
          console.log(`  - ${t.table_name}`);
        });
      }

      await pool2.end();
    } else {
      console.log(`❌ Base de datos "Movil__app" NO EXISTE`);
      console.log(`\n💡 Bases de datos disponibles:`);
      result.rows.forEach(r => console.log(`   - ${r.database_name}`));
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabases();
