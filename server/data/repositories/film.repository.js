import db from '../../utils/db.js';
import operatorType from '../../utils/enums/operatorType.js';

const filmRepository = {
  //CREATE
  addFilm(film) {
    return db('film')
      .insert(film)
      .catch(() => operatorType.FAIL.CREATE);
  },
  //READ
  async getFilms() {
    return db('film');
  },

  getFilmById(id) {
    return db('film').where('film_id', id).catch(() => operatorType.FAIL.READ);
  },
  //UPDATE
  updateFilm(film) {
    return db('film')
      .where(film_id, film.film_id)
      .update(film)
      .catch(() => operatorType.FAIL.UPDATE);
  },
  //DELETE
  deleteFilm(id) {
    return db('film')
      .where('film_id', id)
      .del()
      .catch(() => operatorType.FAIL.DELETE);
  }
};

export default filmRepository;
