import { blockedUsersRepository } from '../repository';
import blockUserFactory from './block-user';
import getBlockedUsersFactory from './get-blocked-users';
import unblockUserFactory from './unblock-user';

const blockUser = blockUserFactory(blockedUsersRepository);
const getBlockedUsers = getBlockedUsersFactory(blockedUsersRepository);
const unblockUser = unblockUserFactory(blockedUsersRepository);

export { blockUser, unblockUser, getBlockedUsers };
