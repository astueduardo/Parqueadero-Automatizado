const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '2101087019',
  host: 'localhost',
  port: 5432,
  database: 'Movil__app',
});

async function checkTableStructure() {
  try {
    console.log('=== ESTRUCTURA DE TABLA "user" ===\n');
    
    // Información de columnas de la tabla user
    const userColumns = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'user'
      ORDER BY ordinal_position;
    `);
    
    console.log('Columnas:');
    userColumns.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? '✓ NULL' : '✗ NOT NULL';
      const defaultVal = col.column_default ? ` = ${col.column_default}` : '';
      console.log(`  - ${col.column_name}: ${col.data_type} (${nullable})${defaultVal}`);
    });
    
    // Contar registros
    const countUser = await pool.query('SELECT COUNT(*) as count FROM "user";');
    console.log(`\nRegistros en tabla "user": ${countUser.rows[0].count}`);
    
    console.log('\n=== ESTRUCTURA DE TABLA "usuarios" ===\n');
    
    const usuariosColumns = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'usuarios'
      ORDER BY ordinal_position;
    `);
    
    console.log('Columnas:');
    usuariosColumns.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? '✓ NULL' : '✗ NOT NULL';
      const defaultVal = col.column_default ? ` = ${col.column_default}` : '';
      console.log(`  - ${col.column_name}: ${col.data_type} (${nullable})${defaultVal}`);
    });
    
    const countUsuarios = await pool.query('SELECT COUNT(*) as count FROM "usuarios";');
    console.log(`\nRegistros en tabla "usuarios": ${countUsuarios.rows[0].count}`);
    
    // Mostrar datos en usuario si los hay
    if (countUser.rows[0].count > 0) {
      console.log('\n=== DATOS EN TABLA "user" ===\n');
      const data = await pool.query('SELECT * FROM "user" LIMIT 5;');
      console.log(data.rows);
    }
    
    if (countUsuarios.rows[0].count > 0) {
      console.log('\n=== DATOS EN TABLA "usuarios" ===\n');
      const data = await pool.query('SELECT * FROM "usuarios" LIMIT 5;');
      console.log(data.rows);
    }
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkTableStructure();
