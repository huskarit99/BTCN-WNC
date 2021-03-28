import { Router } from 'express';

import filmSchema from '../schemas/film.js';
import validateMDW from '../middlewares/validate.mdw.js';
import operatorType from '../../utils/enums/operatorType.js';
import filmService from '../../bussiness/services/film.service.js';

const router = Router();

router.get('/get-films', async (req, res) => {
  const list = await filmService.getFilms();
  res.json(list);
})

router.get('/get-film/:id', async (req, res) => {
  const id = req.params.id || 0;
  const film = await filmService.getFilmById(id);
  if (film === operatorType.FAIL.READ) {
    res.status(400)
      .json({
        message: "Film is not available !!"
      })
      .end();
  }
  res.status(200).json(film);
})

router.post('/add-film', validateMDW(filmSchema), async (req, res) => {
  const film = req.body;
  if (await filmService.addFilm(film) === operatorType.FAIL.CREATE) {
    res.status(400)
      .json({
        message: "Film is not available !!"
      })
      .end();
  }
  res.status(201).json(film);
})

router.delete('/delete-film/:id', async (req, res) => {
  const id = req.params.id || 0;
  if (await filmService.isFilmAvailable(id)) {
    res.status(400)
      .json({
        message: "Film is not available !!"
      })
      .end();
  } else {
    // if (await filmService.deleteFilm(id) === );
  }
})

export default router;