<img align="right" src="https://i.imgur.com/LfjUZHs.png"></div>

<h1 align="left">Yava Gym API</h1>

Find the best time to go to the gym with the (unofficial) Yava API that lets you know the gym's busiest hours 💪

## Why I Created This?

Due to Covid-19, Yava Fitness Center (the gym i go to) implemented an online platform [YAVA360](http://yava.services/) where you make a booking in order to use the gym's facilities and also has a cap on how many people can book for each hour of the day.

So, i found myself wasting too much time visiting my gym's poorly designed website, searching for the best time to book and always checking for the capacity as i was trying to book when the gym had the least people.

## What Does it Do?

This API uses [Puppeteer](https://github.com/puppeteer/puppeteer), a [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) chrome browser to scrape the [YAVA360](http://yava.services/) webpage and then exposes an API endpoint which provides information on the **gym's capacity per hour** in a **JSON** format.

## Getting Started

### Heroku

If you do not want to install and run the API locally you can always hit the **online** instance running on [Heroku](https://www.heroku.com/) at [https://yava-gym-api.herokuapp.com/](https://yava-gym-api.herokuapp.com/).

### Installation

```bash
$ npm install
# To run with node
$ npm run start
# To run with nodemon
$ npm run dev
```

### Docker Image

You can spin up a docker container with the image i've created if you are using docker.

```bash
$ docker pull kostaschikis/yava-gym-api
$ docker run -p 3000:3000 kostaschikis/yava-gym-api
```

## Usage

> ⚠ You need a **YAVA360 account** in order to use the API

### Request

```http
POST https://yava-gym-api.herokuapp.com/
```

> 💭 `POST http://localhost:3000` if you are running locally

#### Headers

| Key | Value |
| :--- | :--- |
| `Content-Type` | `application/json` |

#### Body

Your YAVA360 account credentials

```JSON
{
  "email": "yava360email@yava",
  "password": "yava360password"
}
```

### Response

A JSON array of objects where every object is a day of the week.

```JSON
[
  {
    "date": "Thursday Oct 29th",
    "data": [
      {
        "hour": "07:00",
        "people": 15
      },
      {
        "hour": "08:00",
        "people": 15
      },
      {
        "hour": "09:00",
        "people": 18
      },
      {
        "hour": "10:00",
        "people": 20
      },
      {
        "hour": "11:00",
        "people": 13
      },
      ...
    ]
  },
  {
    "date": "Friday Oct 30th",
    "data": [...]
  },
  {...}
]
```

> ❗ The scraper returns only the days where **at least 1** booking is found.
