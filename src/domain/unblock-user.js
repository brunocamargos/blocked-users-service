const unblockUser = repository => async (id) => {
  const result = await repository.remove({ id });

  return result.n;
};

export default unblockUser;
