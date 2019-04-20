import findByCPF from './find-by-cpf';

const COLLECTION_NAME = 'blockedUsers';

const blockedUsersRepository = (genericRepository) => {
  const blockedUsersGenericRepository = genericRepository(COLLECTION_NAME);

  return {
    ...blockedUsersGenericRepository,
    findByCPF: findByCPF(blockedUsersGenericRepository),
  };
};

export default blockedUsersRepository;
