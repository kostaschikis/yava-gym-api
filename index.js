const express = require('express')
const morgan = require('morgan')
const scrapSeats = require('./scraper')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'))

app.get('/', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  const seats = await scrapSeats('https://gymservices.yava.gr/login', user)
  if (seats.length !== 0) {
    res.status(200).json(seats)
  } else {
    res.status(500).send({ error: 'Gym is closed' })
  }
})