const puppeteer = require('puppeteer')
const moment = require('moment');

async function scrapeSeats(url, user) {
  // Typical Launch Stuff
  const browser = await puppeteer.launch({
    args: [
      '--disable-dev-shm-usage',  
      '--no-sandbox',
      '--disable-gpu',
    ]
  })
  const page = await browser.newPage()
  await page.goto(url)

  // Login
  await page.type('[name=_username]', user.email)
  await page.type('[name=_password]', user.password)
  await page.click('[type=submit]')

  // Wait
  await page.waitForTimeout(2000)

  // Go to gym page
  await page.goto(`https://yava.services/training/trainers/yava-${user.gym}`)

  // Get yellow dates
  const yellowdates = await page.evaluate(() => {
    const elements = document.querySelectorAll('.vaptdyellow')
    const ids = Array.from(elements).map(element => element.id)

    return ids
  })

  const finalData = []

  for (const date of yellowdates) {
    try {
      // Click on the date
      await page.click(`td#${date} > a`)

      await page.waitForTimeout(1000)

      // Get the hours and the number of people for the day
      let data = await page.evaluate(() => {
        const times = document.querySelectorAll('div.vap-timeline-block')
        
        const seats = Array.from(times).map(element => Object.assign({}, element.dataset))
        const data = []
        // Makes a new array and converts the number of people to integer
        seats.forEach(({hour, seats}) => {
          if(parseInt(hour) < 10) hour = `0${hour}`
          return data.push({ hour: `${hour}:00`, people: parseInt(seats) })
        })

        return data
      })
      
      // Convert epoch time
      let isoDate = new Date(date.slice(6, 16) * 1000)
      let formattedDate = moment(isoDate).format('dddd MMM Do')
      finalData.push({date: formattedDate, data: data})

    } catch(e) {
      console.log(e)
    }
  }
  
  await browser.close()

  // console.log(finalData)
  return finalData

}

module.exports = scrapeSeats