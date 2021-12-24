exports.manipulate = async (req, res, next) => {
  const fields = req.body.fields;

  fields.forEach((field) => {
    req.body[field?.id] = { value: field?.value?.value, valueId: field?.value?.id };
  });

  next();
};
