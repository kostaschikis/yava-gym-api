const express = require('express')
const scrapSeats = require('./scraper')

const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const seats = await scrapSeats('https://gymservices.yava.gr/login')
  if (seats.length !== 0) {
    res.json(seats)
  } else {
    res.status(500).send({ error: 'Gym is closed' })
  }
})