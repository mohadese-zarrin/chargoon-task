import { createContext } from 'react'
import { UserType } from '../../types';

interface UserListContaxt {
    userListData: UserType[],
    updateUserList: (e: UserType[]) => void
}
const defaultUserListContaxt: UserListContaxt = {
    userListData: [],
    updateUserList: () => { }
};
const UserListContaxt = createContext<UserListContaxt>(defaultUserListContaxt);


export default UserListContaxt;