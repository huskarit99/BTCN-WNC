import morgan from 'morgan';
import express from 'express';

import filmController from './api/controllers/film.controller.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Sakila API'
  });
})

app.use((err, req, res, next) => {
  console.log("haha");
  console.log(err);
  if (err) {
    res.send("Endpoint not found !!!").end();
  } else {
    next();
  }
})

app.use('/api/film-controller', filmController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
})