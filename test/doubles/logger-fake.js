const fn = () => ({});
const loggerFake = {
  info: fn,
  warn: fn,
  error: fn,
};

export default loggerFake;
