
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'FactoryFlow API is running',
    status: 'Operational'
  })
})

app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      totalOrders: 248,
      productionOutput: 1840,
      inventoryItems: 1256,
      activeEmployees: 86,
      productionStatus: {
        inProduction: 12,
        completed: 28,
        pending: 8,
        delayed: 3
      }
    }
  })
})

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist')
  app.use(express.static(clientPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`FactoryFlow server running on port ${PORT}`)
})
