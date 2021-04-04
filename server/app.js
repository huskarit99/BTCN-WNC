import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import httpStatusCode from './utils/enums/httpStatusCode.js';
import citycontroller from './api/controllers/city.controller.js';
import filmController from './api/controllers/film.controller.js';
import actorController from './api/controllers/actor.controller.js';
import countryController from './api/controllers/country.controller.js';
import categoryController from './api/controllers/category.controller.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.static('public'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
})
app.get('/actor', (req, res) => {
  res.sendFile(__dirname + '/views/crud-actor.html');
})
app.get('/category', (req, res) => {
  res.sendFile(__dirname + '/views/crud-category.html');
})

app.use('/api/city-controller', citycontroller)
app.use('/api/film-controller', filmController)
app.use('/api/actor-controller', actorController)
app.use('/api/country-controller', countryController)
app.use('/api/category-controller', categoryController)


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = httpStatusCode.CLIENT_ERRORS.BAD_REQUEST;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || httpStatusCode.SERVER_ERRORS.INTERNAL_SERVER_ERROR).send({
    error: {
      status: error.status || httpStatusCode.SERVER_ERRORS.INTERNAL_SERVER_ERROR,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})