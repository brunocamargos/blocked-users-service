// Serializes an HTTP request.
const reqSerializer = standardRequestSerializer => (req) => {
  if (!req) {
    return {};
  }

  const reqSerialized = standardRequestSerializer(req);

  const complementKeys = {
    httpVersion: req.httpVersion,
  };

  return { ...complementKeys, ...reqSerialized };
};

export default reqSerializer;
