import { blockedUsersRepository } from '../repository';
import blockUserFactory from './block-user';
import getBlockedUsersFactory from './get-blocked-users';
import unblockUserFactory from './unblock-user';
import findBlockedUserFactory from './find-blocked-user';

const blockUser = blockUserFactory(blockedUsersRepository);
const getBlockedUsers = getBlockedUsersFactory(blockedUsersRepository);
const unblockUser = unblockUserFactory(blockedUsersRepository);
const findBlockedUser = findBlockedUserFactory(blockedUsersRepository);

export {
  blockUser, unblockUser, getBlockedUsers, findBlockedUser,
};
