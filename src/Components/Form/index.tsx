import { Input, Tabs, Form as FormEx } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import UsersList from './user-autocomplete';
import Table from '../Table'
import UserListContaxt from './userContext'
import { UserType } from '../../types'

interface Props {
	item: any;
	updateNode: (key: string, data: any) => void,
	newNode: boolean
}

function Form({ item, updateNode, newNode }: Props) {
	const [form] = FormEx.useForm();
	const [userList, setUserList] = useState<UserType[]>()
	const [accessesList, setAccessesList] = useState([])

	const handleSave = () => {
		const { code: key, title } = form.getFieldsValue()
		updateNode(item.key, { key, title, users: userList, accesses: accessesList })

	}
	useEffect(() => {
		if (!newNode) {
			if (item) {
				setUserList(item.users)
				setAccessesList(item.accesses)
				form.setFieldsValue({
					title: item.title,
					code: item.key,
					// users: item.users
				})
			}
		} else {
			form.resetFields();
			setUserList([])
		}
	}, [item, newNode])

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<UserListContaxt.Provider value={{
							userListData: userList,
							updateUserList: setUserList
						}}>
							<div className='form-content'>
								<BasicInformation form={form} initialValue={item} />
								{userList?.length ? <Table /> : null}
							</div>
						</UserListContaxt.Provider>

					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses setAccesses={setAccessesList} initialValue={accessesList} />
							</ErrorBoundry>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
			<ActionBar
				actions={[
					{
						title: 'ذخیره',
						handler: handleSave
					}
				]} />
		</div>
	);
}
export default Form

