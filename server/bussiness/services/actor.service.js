import operatorType from '../../utils/enums/operatorType.js';
import actorRepository from '../../data/repositories/actor.repository.js';
import entityRepository from '../../data/repositories/entity.repository.js';

const _entityRepository = entityRepository('actor');

const actorService = {
  getActors() {
    return _entityRepository.getEntities();
  },

  getActorById(id) {
    return _entityRepository.getEntityById(id);
  },

  addActor(actor) {
    return _entityRepository.addEntity(actor);
  },

  updateActor(actor) {
    if (this.isActorAvailable(actor.actor_id)) {
      return _entityRepository.updateEntity(actor, actor.actor_id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  deleteActor(id) {
    if (this.isActorAvailable(id)) {
      return _entityRepository.deleteEntity(id);
    }
    else {
      return operatorType.NOT_AVAILABLE;
    }
  },

  async isActorAvailable(id) {
    const actors = await _entityRepository.getEntityById(id);
    if (!actors || actors === operatorType.FAIL.READ) {
      return false;
    }
    return true;
  }
};

export default actorService;