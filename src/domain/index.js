import { blockedUsersRepository } from '../repository';
import blockUserFactory from './block-user';
import getBlockedUsersFactory from './get-blocked-users';
import unblockUser from './unblock-user';

const blockUser = blockUserFactory(blockedUsersRepository);
const getBlockedUsers = getBlockedUsersFactory(blockedUsersRepository);

export { blockUser, unblockUser, getBlockedUsers };
