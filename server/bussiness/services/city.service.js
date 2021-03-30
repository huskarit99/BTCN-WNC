import operatorType from '../../utils/enums/operatorType.js';
import cityRepository from '../../data/repositories/city.repository.js';
import entityRepository from '../../data/repositories/entity.repository.js';

const _entityRepository = entityRepository('city');

const cityService = {
  getCities() {
    return _entityRepository.getEntities();
  },

  getCityById(id) {
    return _entityRepository.getEntityById(id);
  },

  addCity(city) {
    return _entityRepository.addEntity(city);
  },

  updateCity(city) {
    if (this.isCityAvailable(city.city_id)) {
      return _entityRepository.updateEntity(city, city.city_id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  deleteCity(id) {
    if (this.isCityAvailable(id)) {
      return _entityRepository.deleteEntity(id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  async isCityAvailable(id) {
    const cities = await _entityRepository.getEntityById(id);
    if (!cities || cities === operatorType.FAIL.READ) {
      return false;
    }
    return true;
  }
};

export default cityService;