require('dotenv').config()
const puppeteer = require('puppeteer')

async function scrapeSeats(url) {
  // Typical Launch Stuff
  const browser = await puppeteer.launch({
    args: ['--disable-dev-shm-usage']
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto(url)

  // Login
  await page.type('[name=_username]', process.env.EMAIL)
  await page.type('[name=_password]', process.env.PASSWORD)
  await page.click('[type=submit]')

  // Wait
  await page.waitForTimeout(2000)

  // Go to gym page
  await page.goto('https://yava.services/training/trainers/yava-aigaleo')

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

      // await page.waitForSelector('.vap-timeline-block', {
      //   visible: true,
      //   timeout: 5000
      // });

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
      let formattedDate = new Date(date.slice(6, 16) * 1000)
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

// scrapeSeats('https://gymservices.yava.gr/login')

// scrapeSeats('https://gymservices.yava.gr/login')