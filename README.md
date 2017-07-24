# kununu Frontend Test

## Goal

Build a city-matcher tool using two API endpoints.

## API

Install the dependencies and start the API (runs on 0.0.0.0:8080):

```sh
npm install
node index.js
```

There are two API endpoints:

```
/v1/cities                   Get a list of cities
/v1/autocomplete?q=<query>   Get a list of cities matching a query
```

:exclamation: **Please note** Since this is only a mock API, autocomplete data will only be returned for the autocomplete endpoint with the queries `a`, `ab` or `ac`.

## Layout

The interface should be made up of two columns - the cities listed. It should look somewhat like this:

```
<city name>      [autocomplete input field with dropdown]
<city name>      [autocomplete input field with dropdown]
...              ...
```

## Result

On selection of a result in the autocomplete fields, console.log() the full objects corresponding with both:

- the city in the left column
- the selected item from the dropdown

## Technology

This is your chance to show off. Use modern libraries, structures and methods to build a clearly-written application.

Examples of advanced approaches:

- UI libraries like React or Elm
- Client-side state management and synchronization
- Client-side routing
- Use ES2015 promises or ES2017 async/await
- Use a module bundler
- Build the interface using flexbox or CSS grid layout
- Add polyfills for older browsers
- Universal (isomorphic) JavaScript
