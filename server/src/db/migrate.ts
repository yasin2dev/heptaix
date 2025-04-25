import fs from 'fs'
import path from 'path'

import { DB } from '@server/db'

async function createMigrationsTable() {
  await DB`
    CREATE TABLE IF NOT EXISTS "public"."migrations" (
      id INTEGER PRIMARY KEY,
      migration TEXT,
      run_at TIMESTAMPTZ DEFAULT now()
    )
  `
}

function formatMigrationTitle(file: string): string {
  const base = path.basename(file, '.sql')
  const [, ...parts] = base.split('_')
  const method = parts[0].toUpperCase();
  const label = parts.slice(1).join(' ').toUpperCase()
  return `[${method}: ${label}]`
}

function getMigrationPriorty(file: string): string {
  const base = path.basename(file, '.sql')
  const parts = base.split('_');
  return `${parts[0]}`;  
}

async function getAppliedMigrations(): Promise<string[]> {
  const rows = await DB`SELECT "migration" FROM "public"."migrations"`
  return rows.map((row) => row.migration)
}

async function applyMigration(file: string, sql: string) {
  console.log(`Running ${formatMigrationTitle(file)}...`)
  await DB.unsafe(sql)
  await DB`INSERT INTO migrations ("id", "migration") VALUES (${getMigrationPriorty(file)}, ${formatMigrationTitle(file)})`
}

async function runMigrations() {
  await createMigrationsTable()

  const migrationDir = path.join(__dirname, 'migrations')
  const files = fs.readdirSync(migrationDir)
    .filter(f => f.endsWith('.sql'))
    .sort()

  const applied = await getAppliedMigrations()
  const toApply = files.filter(f => !applied.includes(f))

  for (const file of toApply) {
    const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8')
    try {
      await applyMigration(file, sql)
    } catch (err) {
      console.error(`❌ Error in migration ${file}:`, err)
      process.exit(1)
    }
  }

  console.log('✅ All migrations applied')
  process.exit(0)
}

runMigrations()