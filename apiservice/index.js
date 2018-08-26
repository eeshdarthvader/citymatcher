'use strict';

const
  express      = require('express'),
  cors         = require('cors'),
  cities       = require('./all.json'),
  autocomplete = {
    a: require('./a.json'),
    ab: require('./ab.json'),
    ac: require('./ac.json')
  };

let app = express();

app.use(cors());

app.get('/v1/cities', (req, res) => {
  res.json(cities);
});

app.get('/v1/autocomplete', (req, res) => {
  res.json(autocomplete[req.query.q]);
});

let server = app.listen(8080, '0.0.0.0', () => {
  console.log(`API listening on http://${server.address().address}:${server.address().port}`);
});
