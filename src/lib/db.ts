import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Create a lazy SQL client that only initializes when DATABASE_URL is available
let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

// Initialize database tables
export async function initDatabase() {
  const sql = getDb();
  if (!sql) return;
  
  await sql`
    CREATE TABLE IF NOT EXISTS estimates (
      id SERIAL PRIMARY KEY,
      business_type VARCHAR(50) NOT NULL,
      system_needed VARCHAR(50)[] NOT NULL,
      platform VARCHAR(50) NOT NULL,
      user_count VARCHAR(20) NOT NULL,
      modules VARCHAR(100)[] NOT NULL,
      customization_level VARCHAR(20) NOT NULL,
      integration_needed BOOLEAN NOT NULL,
      deployment VARCHAR(20) NOT NULL,
      estimated_cost_min INTEGER NOT NULL,
      estimated_cost_max INTEGER NOT NULL,
      timeline_weeks INTEGER NOT NULL,
      team_size VARCHAR(20) NOT NULL,
      email VARCHAR(255),
      company_name VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}
