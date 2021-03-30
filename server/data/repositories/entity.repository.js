import db from '../../utils/db.js';
import operatorType from '../../utils/enums/operatorType.js';

export default nameEntity => {
  return {
    //CREATE
    addEntity(entity) {
      return db(nameEntity)
        .insert(entity)
        .catch(() => operatorType.FAIL.CREATE);
    },

    //READ
    getEntities() {
      return db(nameEntity)
        .catch(() => operatorType.FAIL.READ);
    },

    getEntityById(id) {
      return db(nameEntity)
        .where(nameEntity + '_id', id)
        .catch(() => operatorType.FAIL.READ);
    },

    //UPDATE
    updateEntity(entity, id) {
      return db(nameEntity)
        .where(nameEntity + '_id', id)
        .update(entity)
        .catch(() => operatorType.FAIL.UPDATE);
    },

    //DELETE
    deleteEntity(id) {
      return db(nameEntity)
        .where(nameEntity + '_id', id)
        .del()
        .catch(() => operatorType.FAIL.DELETE);
    }
  }
};