import { Router } from 'express';

import filmSchema from '../schemas/film.js';
import validateMDW from '../middlewares/validate.mdw.js';
import operatorType from '../../utils/enums/operatorType.js';
import httpStatusCode from '../../utils/enums/httpStatusCode.js';
import filmService from '../../bussiness/services/film.service.js';

const router = Router();

router.get('/get-films', async (req, res) => {
  const list = await filmService.getFilms();
  if (list === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(list);
})

router.get('/get-film/:id', async (req, res) => {
  const id = req.params.id || 0;
  const film = await filmService.getFilmById(id);
  if (film === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(film);
})

router.post('/add-film', validateMDW(filmSchema), async (req, res) => {
  const film = req.body;
  if (await filmService.addFilm(film) === operatorType.FAIL.CREATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Creating from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(film);
})

router.put('/update-film', validateMDW(filmSchema), async (req, res) => {
  const film = req.body;
  const ret = await filmService.updateFilm(film);
  if (ret === operatorType.FAIL.UPDATE) {
    res.status(400)
      .json({
        message: "Updating from DB went wrong !!"
      })
      .end();
  }
  else if (ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This film is not available !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(film);
})

router.delete('/delete-film/:id', async (req, res) => {
  const id = req.params.id || 0;
  const ret = await filmService.deleteFilm(id);
  if (ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This Film is not available !!"
      })
      .end();
  }
  else
    if (ret === operatorType.FAIL.DELETE) {
      res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
        .json({
          message: "Can not delete. Bz existence of Foreign Key !!"
        })
        .end();
    }
    else {
      res.status(httpStatusCode.SUCCESS.OK)
        .json({
          message: "Delete successful !!!"
        });
    }
})

export default router;