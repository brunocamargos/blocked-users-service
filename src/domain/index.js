import { blockedUsersRepository } from '../repository';
import blockUserFactory from './block-user';
import unblockUser from './unblock-user';

const blockUser = blockUserFactory(blockedUsersRepository);

export { blockUser, unblockUser };
