import mysql from 'mysql2/promise';
import Executor from 'sqlexecutor';
import dotenv from 'dotenv';
dotenv.config()
const executor = new Executor({
    database: process.env.DATABASE_SECRET
}).call


export default executor;
