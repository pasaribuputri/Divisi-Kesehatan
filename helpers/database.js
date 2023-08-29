import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config({path: '.env-local'})

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

pool.getConnection()

export default pool;