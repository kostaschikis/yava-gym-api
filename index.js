const scrapSeats = require('./scraper')

const main = async () => {
  const seats = await scrapSeats('https://gymservices.yava.gr/login')
  if (seats.length !== 0) console.log(seats) 
}

main()