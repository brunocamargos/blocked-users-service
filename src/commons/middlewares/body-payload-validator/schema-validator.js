const validateSchema = (
  schema,
  data,
  options = {
    abortEarly: false,
    convert: false,
  },
) => {
  const { error } = schema.validate(data, options);

  let validationError;
  if (error) {
    const { details } = error;

    validationError = {
      message: error.message,
      details: details.map(element => ({
        description: element.message,
      })),
    };
  }

  return validationError;
};

export default validateSchema;
