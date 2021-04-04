import { Router } from 'express';

import citySchema from '../schemas/city.js';
import validateMDW from '../middlewares/validate.mdw.js';
import operatorType from '../../utils/enums/operatorType.js';
import httpStatusCode from '../../utils/enums/httpStatusCode.js';
import cityService from '../../bussiness/services/city.service.js';

const router = Router();

router.get('/get-cities', async (req, res) => {
  const list = await cityService.getCities();
  if (list === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(list);
})

router.get('/get-city/:id', async (req, res) => {
  const id = req.params.id || 0;
  const city = await cityService.getCityById(id);
  if (city === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(city);
})

router.post('/add-city', validateMDW(citySchema), async (req, res) => {
  const city = req.body;
  if (await cityService.addCity(city) === operatorType.FAIL.CREATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Creating from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(city);
})

router.put('/update-city', validateMDW(citySchema), async (req, res) => {
  const city = req.body;
  const ret = await cityService.updateCity(city);
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
        message: "This city is not available !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(city);
})

router.delete('/delete-city/:id', async (req, res) => {
  const id = req.params.id || 0;
  const ret = await cityService.deleteCity(id);
  if (ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This City is not available !!"
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