# URL Shortener API

The URL Shortener API provides you, developer, easly and quickly shorten urls in your own application. The API was built using Nodejs.

## How to run

Download the repository into a folder.

```
git clone https://github.com/cristianossd/url-shortener-api.git && cd url-shortener-api
```

After that, install the dependencies.

```
npm install
```

And run the server.

```
node server.js
```

## Features

Let's consider the example below running in `localhost` on port `8080`. We'll use cUrl to simulate the requests.

Making a request to **shorten an URL**:

```
curl -X POST 'localhost:8080/api/urls' -d 'url=https://github.com'
```

Receive a response:

```json
{
  "url": {
    "shortened": "localhost:8080/u/rH0tzj",
    "original": "https://github.com"
  }
}
```

Making a request to **see shortened URL status**:
```
curl 'localhost:8080/api/urls/rH0tzj'
```

The token `rH0tzj` is a reference for shortened URL. Then, receive a response:

```json
{
  "url": {
    "shortened": "localhost:8080/u/rH0tzj",
    "original": "https://github.com",
    "visits": 2
  }
}
```

Accessing `localhost:8080/u/rH0tzj` on browser will be redirected to `https://github.com`.

## Dependencies

- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [express](https://github.com/strongloop/express): Fast, unopinionated, minimalist web framework
- [mongoose](https://github.com/Automattic/mongoose): Mongoose MongoDB ODM
- [rand-token](https://github.com/sehrope/node-rand-token): Generate random tokens
