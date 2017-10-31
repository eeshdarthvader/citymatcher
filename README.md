# kununu Frontend Test

## Backstory

Over the years we accumulated a huge list of cities. Now we have a new set of official geographical data. Unfortunately in our old list a lot of cities are misspelled, so we can't simply let a cron job match our old data with the new data.

To solve this, we will let one of our working student check each of the old cities, that we weren't able to match automatically. To make his task a little bit more bearable, you have to write an application, that outputs a list of our new geographical city data and an accompanying autocomplete for each entry.

The interface should be made up of two columns. The left side should show the geographical data, the right side returns results from our historical old data. It should look somewhat like this:

```
<city name>      [autocomplete input field with dropdown]
<city name>      [autocomplete input field with dropdown]
...              ...
```

In the autocomplete, the user can than try out different spelling and check if he finds a city that matches the left column. If the user selects an item in the autocomplete, please output the id and the name of both the selected city and the original entry on the left, so that the user can write down all results.

## Goal

Build a city-matcher tool using two API endpoints.

## API

Install the dependencies and start the API (runs on 0.0.0.0:8080):

```sh
npm install
node api/index.js
```

There are two API endpoints:

```
/v1/cities                   Get a list of new geographical cities
/v1/autocomplete?q=<query>   Get a list of old historical city data matching a query
```

The autocomplete endpoint already returns matching results.

## Result

On selection of a result in the autocomplete fields, console.log() the full objects corresponding with both:

- the city in the left column
- the selected item from the dropdown

## Technology

This is your chance to show off. Use react to build a clearly-written application.

### Must haves

- Client-side state management with redux
- Use ES2015 promises or ES2017 async/await for api calls
- Build the interface using flexbox or CSS grid layout
- Use a module bundler, preferably webpack

## Nice to haves

- Add polyfills for older browsers
- Client-side routing (e.g.: paginate the list of cities)
- Test your components with jest
- Universal (isomorphic) JavaScript

## What not to do

Please don't simply use create-react-app to scaffold your application. We want to see, what your personal project structure would look like!


