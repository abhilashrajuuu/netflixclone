import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db.js'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const TOKEN_EXPIRES_IN = '7d'

function toPublicUser(row) {
  return {
    id: row.uid,
    username: row.uname,
    email: row.email,
    phone: row.phone,
  }
}

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body || {}

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: 'username, email and password are required' })
    }

    const existing = await query(
      'SELECT uid FROM users WHERE email = $1 OR uname = $2 LIMIT 1',
      [email, username],
    )
    if (existing.rows.length > 0) {
      return res
        .status(409)
        .json({ error: 'User with this email or username already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const insertResult = await query(
      `INSERT INTO users (uname, password, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING uid, uname, email, phone`,
      [username, passwordHash, email, phone ?? null],
    )

    const user = toPublicUser(insertResult.rows[0])

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    })

    res.status(201).json({ user, token })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'email and password are required' })
    }

    const result = await query(
      'SELECT uid, uname, email, phone, password FROM users WHERE email = $1 LIMIT 1',
      [email],
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const row = result.rows[0]

    const passwordMatches = await bcrypt.compare(password, row.password)
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const user = toPublicUser(row)

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    })

    res.json({ user, token })
  } catch (error) {
    next(error)
  }
})

export default router

