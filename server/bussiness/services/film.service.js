import operatorType from '../../utils/enums/operatorType.js';
import filmRepository from '../../data/repositories/film.repository.js';
import entityRepository from '../../data/repositories/entity.repository.js';

const _entityRepository = entityRepository('film');

const filmService = {
  getFilms() {
    return _entityRepository.getEntities();
  },

  getFilmById(id) {
    return _entityRepository.getEntityById(id);
  },

  addFilm(film) {
    return _entityRepository.addEntity(film);
  },

  updateFilm(film) {
    if (this.isFilmAvailable(film.film_id)) {
      return _entityRepository.updateEntity(film, film.film_id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  deleteFilm(id) {
    if (this.isFilmAvailable(id)) {
      return _entityRepository.deleteEntity(id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  async isFilmAvailable(id) {
    const films = await _entityRepository.getEntityById(id);
    if (!films || films === operatorType.FAIL.READ) {
      return false;
    }
    return true;
  }
};

export default filmService;