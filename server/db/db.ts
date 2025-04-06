import postgres from 'postgres'
import { DBOptions } from '../types'

const options: DBOptions = {
    host:           process.env?.['DB_HOST'] || 'localhost',
    port:           Number(process.env?.['DB_PORT']) || 5432,
    username:       process.env?.['DB_USER'] || 'postgres',
    pass:           process.env?.['DB_PASS'] || '123456',
    database:       process.env?.['DB_NAME'] || 'todo-app'
}

export const DB = postgres({ ...options })