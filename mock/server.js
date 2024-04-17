const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

/*
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const express = require("express");
const app = express();

server.use(middlewares)
server.use(router)

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data,
  });
};

server.use((req, res, next) => {
  const ids = req.body.id;
  const users = ids.map((id) => {
    return db.users.find((p) => p.id === id);
  });
  if (req.method === "POST") {
    res.json(users);
  } else {
    next();
  }
});

server.use(router);

app.post('/users/:id', (req, res) => {
  // Get the user ID from the request parameters
  const id = req.params.id;

  // Get the data for the user with the specified ID from the 'db.json' file
  const userData = router.db.get('users').find({ id: id }).value();

  // Send the user data as the response
  res.send(userData);
});
*/
