import Ajv from 'ajv';

export default schema =>
  (req, res, next) => {
    const ajv = new Ajv.default();
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json(validate.errors);
    }
    next();
  }