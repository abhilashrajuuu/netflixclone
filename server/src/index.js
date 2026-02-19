import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'

const app = express()

const PORT = process.env.PORT || 4000

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: false,
  }),
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`)
})

