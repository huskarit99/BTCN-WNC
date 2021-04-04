import { Router } from 'express';

import actorSchema from '../schemas/actor.js';
import validateMDW from '../middlewares/validate.mdw.js';
import operatorType from '../../utils/enums/operatorType.js';
import httpStatusCode from '../../utils/enums/httpStatusCode.js';
import actorService from '../../bussiness/services/actor.service.js';

const router = Router();

router.get('/get-actors', async (req, res) => {
  const list = await actorService.getActors();
  if (list === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(list);
})

router.get('/get-actor/:id', async (req, res) => {
  const id = req.params.id || 0;
  const actor = await actorService.getActorById(id);
  if (actor === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(actor);
})

router.post('/add-actor', validateMDW(actorSchema), async (req, res) => {
  const actor = req.body;
  if (await actorService.addActor(actor) === operatorType.FAIL.CREATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Creating from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(actor);
})

router.put('/update-actor', validateMDW(actorSchema), async (req, res) => {
  const actor = req.body;
  const ret = await actorService.updateActor(actor);
  if (ret === operatorType.FAIL.UPDATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Updating from DB went wrong !!"
      })
      .end();
  }
  else if (ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This actor is not available !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(actor);
})

router.delete('/delete-actor/:id', async (req, res) => {
  const id = req.params.id || 0;
  const ret = await actorService.deleteActor(id);
  if (id === 0 || ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This Actor is not available !!"
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