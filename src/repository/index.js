import dbAdapter from '../commons/db';
import genericRepositoryFactory from '../commons/db/generic-repository-factory';
import blockedUsersRepositoryFactory from './blocked-users';

const genericRepository = genericRepositoryFactory(dbAdapter);

const blockedUsersRepository = blockedUsersRepositoryFactory(genericRepository);

export { blockedUsersRepository };
