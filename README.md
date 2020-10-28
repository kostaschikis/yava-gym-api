<img align="right" src="https://i.imgur.com/LfjUZHs.png"></div>

<h1 align="left">Yava Gym API</h1>

Find the best time to go to the gym with the (unofficial) Yava API that lets you know the gym's busiest hours 💪

## Why I Created This?

Due to Covid-19, Yava Fitness Center (the gym i go to) implemented an online platform [YAVA360](http://yava.services/) where you make a booking in order to use the gym's facilities and also has a cap on how many people can book for each hour of the day.

So, i found myself wasting too much time visiting my gym's poorly designed website, searching for the best time to book and always checking for the capacity as i was trying to book when the gym had the least people.

## What Does it Do?

This API uses [Puppeteer](https://github.com/puppeteer/puppeteer), a [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) chrome browser to scrape the [YAVA360](http://yava.services/) webpage and then exposes an API endpoint which provides information on the **gym's capacity per hour** in a **JSON** format.

## Getting Started

### Installation

```bash
npm install
# To run with node
npm run start
# To run with nodemon
npm run dev
```

### Docker Image

You can spin up a docker container with the image i've created if you are using docker.

```bash
docker pull kostaschikis/yava-gym-api
docker run -p 3000:3000 kostaschikis/yava-gym-api
```

## Usage
