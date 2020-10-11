const express = require('express')
const scrapSeats = require('./scraper')

const app = express()

app.listen(3000)

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const seats = await scrapSeats('https://gymservices.yava.gr/login')
  if (seats.length !== 0) {
    res.json(seats)
  } else {
    res.status(500).send({ error: 'Gym is closed' })
  }
})