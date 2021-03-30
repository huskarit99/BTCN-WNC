import { Router } from 'express';

import countrySchema from '../schemas/country.js';
import validateMDW from '../middlewares/validate.mdw.js';
import operatorType from '../../utils/enums/operatorType.js';
import httpStatusCode from '../../utils/enums/httpStatusCode.js';
import countryService from '../../bussiness/services/country.service.js';

const router = Router();

router.get('/get-countries', async (req, res) => {
  const list = await countryService.getCountries();
  if (list === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(list);
})

router.get('/get-country/:id', async (req, res) => {
  const id = req.params.id || 0;
  const country = await countryService.getCountryById(id);
  if (country === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(country);
})

router.post('/add-country', validateMDW(countrySchema), async (req, res) => {
  const country = req.body;
  if (await countryService.addCountry(country) === operatorType.FAIL.CREATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Creating from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(country);
})

router.put('/update-country', validateMDW(countrySchema), async (req, res) => {
  const country = req.body;
  const ret = await countryService.updateCountry(country);
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
        message: "This country is not available !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(country);
})

router.delete('/delete-country/:id', async (req, res) => {
  const id = req.params.id || 0;
  const ret = await countryService.deleteCountry(id);
  if (ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This Country is not available !!"
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