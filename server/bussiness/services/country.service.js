import operatorType from '../../utils/enums/operatorType.js';
import countryRepository from '../../data/repositories/country.repository.js';
import entityRepository from '../../data/repositories/entity.repository.js';

const _entityRepository = entityRepository('country');

const countryService = {
  getCountries() {
    return _entityRepository.getEntities();
  },

  getCountryById(id) {
    return _entityRepository.getEntityById(id);
  },

  addCountry(country) {
    return _entityRepository.addEntity(country);
  },

  updateCountry(country) {
    if (this.isCountryAvailable(country.country_id)) {
      return _entityRepository.updateEntity(country, country.country_id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  deleteCountry(id) {
    if (this.isCountryAvailable(id)) {
      return _entityRepository.deleteEntity(id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  async isCountryAvailable(id) {
    const countries = await _entityRepository.getEntityById(id);
    if (!countries || countries === operatorType.FAIL.READ) {
      return false;
    }
    return true;
  }
};

export default countryService;