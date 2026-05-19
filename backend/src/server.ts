import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import leadRoutes from './routes/leadRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'API is running'
  })
})

app.use('/api/leads', leadRoutes)

const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})