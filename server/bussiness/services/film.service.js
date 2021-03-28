import operatorType from '../../utils/enums/operatorType.js';
import filmRepository from '../../data/repositories/film.repository.js';

const filmService = {
  getFilms() {
    return filmRepository.getFilms();
  },

  getFilmById(id) {
    return filmRepository.getFilmById(id);
  },

  addFilm(film) {
    if (this.isFilmAvailable(id)) {
      return operatorType.AVAILABLE;
    }
    else {
      return filmRepository.addFilm(film);
    }
  },

  updateFilm(film) {
    if (this.isFilmAvailable(film.film_id)) {
      return operatorType.NOT_AVAILABLE;
    }
    else {
      return filmRepository.updateFilm(film);
    }
  },

  deleteFilm(id) {
    if (this.isFilmAvailable(id)) {
      return filmRepository.deleteFilm(id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  async isFilmAvailable(id) {
    const films = await filmRepository.getFilmById(id);
    if (!films || films === operatorType.FAIL.READ) {
      return false;
    }
    return true;
  }
};

export default filmService;