const puppeteer = require('puppeteer')

async function scrapeGyms() {
  // Typical Launch Stuff
  const browser = await puppeteer.launch({
    args: [
      '--disable-dev-shm-usage',  
      '--no-sandbox',
      '--disable-gpu',
    ]
  })
  const page = await browser.newPage()
  await page.goto('https://yava.services/training/')

  
  const gyms = await page.evaluate(() => {
    const links = document.querySelectorAll('h4.sprocket-strips-s-title > a')

    const data = []

    for (let gym of links) {
      let formatUrl = gym.href.substring(45) // yava-kati?city=1&id=1
      let gymCodeName = formatUrl.split('?')[0] // yava-kati

      data.push({city: gym.innerHTML.trim(), codename: gymCodeName})
    }

    return data
  })

  await browser.close()

  return gyms
}

module.exports = scrapeGyms