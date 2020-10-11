require('dotenv').config()
const puppeteer = require('puppeteer')

async function scrapeSeats(url) {
  // Typical Launch Stuff
  const browser = await puppeteer.launch()
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
  await page.waitForTimeout(3000)

  // Go to gym page
  await page.goto('https://yava.services/training/trainers/yava-aigaleo?id_service=131&id_city=16')

  // Click on day
  await page.click('td#vapday1602450000')

  try {
    await page.waitForSelector('.vap-timeline-block', {
      visible: true,
      timeout: 5000
    });
  } catch(e) {
    console.log("Gym is closed today")
  }
  
  // Get some data
  const data = await page.evaluate(() => {
    const times = document.querySelectorAll('div.vap-timeline-block')
    /** 
     * NodeList[i].dataset: DOMStringMap
     * Converts DOMStringMap to Object 
     * {rate: "", hour: "7", min: "0", seats: "5"}
     */
    const seats = Array.from(times).map(element => Object.assign({}, element.dataset))

    const final = []

    // Makes a new array and converts the number of people to integer
    seats.forEach(({hour, seats}) => {
      if(parseInt(hour) < 10) hour = `0${hour}`
      return final.push({ hour: `${hour}:00`, people: parseInt(seats) })
    })

    return final
  })

  await browser.close()

  return data

}

module.exports = scrapeSeats

// scrapeSeats('https://yava.services/training/')

// scrapeSeats('https://gymservices.yava.gr/login')