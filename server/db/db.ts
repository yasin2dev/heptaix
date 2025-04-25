import postgres from 'postgres'
import dotenv from 'dotenv';

import type { DBOptions } from '@server/types'

dotenv.config();

const options: DBOptions = {
    host:           process.env?.['DB_HOST'] || 'localhost',
    port:           Number(process.env?.['DB_PORT']) || 5432,
    username:       process.env?.['DB_USER'] || 'postgres',
    pass:           process.env?.['DB_PASS'] || '12345',
    database:       process.env?.['DB_NAME'] || 'heptaix'
}

export const DB = postgres({ ...options })