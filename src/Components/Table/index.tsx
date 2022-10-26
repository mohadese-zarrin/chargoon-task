import React, { useContext } from 'react';
import { UserType } from '../../types'
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { FormInstance } from 'antd/es/form';
import UserListContaxt from '../Form/userContext'



interface Props {
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
			<thead>
				<tr>
					<th>عملیات</th>
					<th>پیشفرض</th>
					<th>نام</th>
				</tr>
			</thead>
			<tbody>
				{userListData.map((user: UserType) =>
					<tr key={user.title}>
						<td><Button
							// disabled={user.isDefault}
							onClick={() => handleDeleteUser(user)}
							type="text"
						>حذف</Button></td>
						<td><Checkbox checked={user.isDefault} value={user.isDefault} onChange={(status) => onCheck(user, status.target.checked)} /></td>
						<td>{user.title}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}
export default Table