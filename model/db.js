import mysql from 'mysql2/promise';
import Executor from 'sqlexecutor';
import dotenv from 'dotenv';
dotenv.config()
const executor = new Executor({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
}).call


export default executor;
