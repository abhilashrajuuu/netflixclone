import pkg from 'pg'

const { Pool } = pkg

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.warn(
    '[DB] DATABASE_URL is not set. Set it in a .env file in the server folder.',
  )
}

export const pool = new Pool({
  connectionString,
  ssl:
    process.env.DATABASE_SSL === 'false'
      ? false
      : { rejectUnauthorized: false },
})

export async function query(text, params) {
  const client = await pool.connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

