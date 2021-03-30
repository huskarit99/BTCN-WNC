import { Router } from 'express';

import categorySchema from '../schemas/category.js';
import validateMDW from '../middlewares/validate.mdw.js';
import operatorType from '../../utils/enums/operatorType.js';
import httpStatusCode from '../../utils/enums/httpStatusCode.js';
import categoryService from '../../bussiness/services/category.service.js';

const router = Router();

router.get('/get-categories', async (req, res) => {
  const list = await categoryService.getCategories();
  if (list === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      }).end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(list);
})

router.get('/get-category/:id', async (req, res) => {
  const id = req.params.id || 0;
  const category = await categoryService.getCategoryById(id);
  if (category === operatorType.FAIL.READ) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Reading from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.OK).json(category);
})

router.post('/add-category', validateMDW(categorySchema), async (req, res) => {
  const category = req.body;
  if (await categoryService.addCategory(category) === operatorType.FAIL.CREATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Creating from DB went wrong !!"
      })
      .end();
  }
  res.status(httpStatusCode.SUCCESS.CREATED).json(category);
})

router.put('/update-category', validateMDW(categorySchema), async (req, res) => {
  const category = req.body;
  const ret = await categoryService.updateCategory(category);
  if (ret === operatorType.FAIL.UPDATE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "Updating from DB went wrong !!"
      })
      .end();
  }
  else
    if (ret === operatorType.NOT_AVAILABLE) {
      res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
        .json({
          message: "This category is not available !!"
        })
        .end();
    }
  res.status(httpStatusCode.SUCCESS.CREATED).json(category);
})

router.delete('/delete-category/:id', async (req, res) => {
  const id = req.params.id || 0;
  const ret = await categoryService.deleteCategory(id);
  if (ret === operatorType.NOT_AVAILABLE) {
    res.status(httpStatusCode.CLIENT_ERRORS.BAD_REQUEST)
      .json({
        message: "This Category is not available !!"
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