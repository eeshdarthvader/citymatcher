'use strict';

const
  express      = require('express'),
  path         = require('path'),
  cors         = require('cors'),
  cities       = require('./data/cities.json'),
  historical   = require('./data/historical.json');

const app = express();
app.use(cors());

app.get('/v1/cities', (req, res) => {
  res.json(cities);
});

app.get('/v1/autocomplete', (req, res) => {
  if (!req.query.q)
    return res.status(400).sendFile(path.join(__dirname, 'tpl/error.html'));

  const foundResults = historical.filter(item => {
    const patt = new RegExp(req.query.q, 'gi');
    return patt.test(item.name);
  });

  return res.json(foundResults);
});

let server = app.listen(8080, '0.0.0.0', () => {
  console.log(`API listening on http://${server.address().address}:${server.address().port}`);
});
