import React from 'react';
import { UserType } from '../../types'
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface Props {
	userList: UserType[]
	deleteUser: (user: UserType) => void,
	setDefaultUser: (user: UserType) => void
}


function Table({ userList, deleteUser, setDefaultUser }: Props) {
	const onCheck = (e: CheckboxChangeEvent, user: UserType) => {
		setDefaultUser(user)
	};
	return (
		<table className='users-table'>
			<tr>
				<th>عملیات</th>
				<th>پیشفرض</th>
				<th>نام</th>
			</tr>
			{userList.map((user) =>
				<tr>
					<td onClick={() => deleteUser(user)}>حذف</td>
					<td><Checkbox defaultChecked={user.isDefault} onChange={(e) => onCheck(e, user)} /></td>
					<td>{user.title}</td>
				</tr>
			)}
		</table>
	)
}
export default Table