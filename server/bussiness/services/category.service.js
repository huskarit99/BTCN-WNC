import operatorType from '../../utils/enums/operatorType.js';
import categoryRepository from '../../data/repositories/category.repository.js';
import entityRepository from '../../data/repositories/entity.repository.js';

const _entityRepository = entityRepository('category');

const categoryService = {
  getCategories() {
    return _entityRepository.getEntities();
  },

  getCategoryById(id) {
    return _entityRepository.getEntityById(id);
  },

  addCategory(category) {
    return _entityRepository.addEntity(category);
  },

  updateCategory(category) {
    if (this.isCategoryAvailable(category.category_id)) {
      return _entityRepository.updateEntity(category, category.category_id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  deleteCategory(id) {
    if (this.isCategoryAvailable(id)) {
      return _entityRepository.deleteEntity(id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  async isCategoryAvailable(id) {
    const categories = await _entityRepository.getEntityById(id);
    if (!categories || categories === operatorType.FAIL.READ) {
      return false;
    }
    return true;
  }
};

export default categoryService;