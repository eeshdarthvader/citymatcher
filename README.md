# kununu Frontend Test

### Prerequisites

```
node js and yarn
```

### Installing

```
yarn
```

## API Server

Install the dependencies and start the API (runs on 0.0.0.0:8080):

```
cd apiservice
npm install
node api/index.js
```

## Development

Application using developement server

```
yarn start

(opens up the application on port 3000 with Hot module reloading)
```

## Production

Production build

```
yarn build:client (generates production ready build/ folder)
Can be served using serve -p <PORT> build/
```

## Universal Rendering (WIP)

```
yarn build:client
yarn build:server
yarn ssr
```

Production build

```
yarn build:client (generates production ready build/ folder)
Can be served using serve -p <PORT> build/
```

## Author

- **Eesh Tyagi**
