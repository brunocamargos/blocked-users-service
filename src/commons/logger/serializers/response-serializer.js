// Serializes an HTTP response.
const resSerializer = standardResponseSerializer => (res) => {
  if (!res) {
    return {};
  }

  const resSerialized = standardResponseSerializer(res);

  const complementKeys = {
    responseTime: res.responseTime && `${res.responseTime}ms`,
  };

  return { ...complementKeys, ...resSerialized };
};

export default resSerializer;
