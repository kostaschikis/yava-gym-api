const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const scrapSeats = require('./functions/scraper')
const scrapeGyms = require('./functions/scrapeGyms')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'))

app.post('/', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    gym: req.body.gym
  }
  const seats = await scrapSeats('https://gymservices.yava.gr/login', user)
  if (seats.length !== 0) {
    res.status(200).json(seats)
  } else {
    res.status(500).send({ error: 'Gym is closed' })
  }
})

app.get('/gyms', async (req, res) => {
  const gyms = await scrapeGyms()
  
  if (gyms.length !==0) {
    res.status(200).json(gyms)
  } else {
    res.status(500).send({error: 'Did not find any gym'})
  }
})