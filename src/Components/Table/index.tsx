import React, { useContext } from 'react';
import { UserType } from '../../types'
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { FormInstance } from 'antd/es/form';
import UserListContaxt from '../Form/userContext'



interface Props {
	// form: FormInstance
}


function Table({ }: Props) {
	const { userListData, updateUserList } = useContext(UserListContaxt)

	const onCheck = (user: UserType, status: boolean) => {
		updateUserList(userListData.map((e: UserType) => {
			if (status) {
				if (e.title === user.title) e.isDefault = status
				else e.isDefault = false
			}
			return e
		}))
	};
	const handleDeleteUser = (user: UserType) => {
		updateUserList(userListData.filter((e: UserType) => e.title !== user.title))
	}

	return (
		<table className='users-table'>
			<tr>
				<th>عملیات</th>
				<th>پیشفرض</th>
				<th>نام</th>
			</tr>
			{userListData.map((user: UserType) =>
				<tr>
					<td onClick={() => handleDeleteUser(user)}>حذف</td>
					<td><Checkbox defaultChecked={user.isDefault} onChange={(status) => onCheck(user, status.target.checked)} /></td>
					<td>{user.title}</td>
				</tr>
			)}
		</table>
	)
}
export default Table