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

interface Props {
	item: any;
	updateNode: (key: string, data: any) => void,
	newNode: boolean
}

function Form({ item, updateNode, newNode }: Props) {
	const [form] = FormEx.useForm();
	const handleSave = () => {
		const { code: key, title } = form.getFieldsValue()
		updateNode(item?.key, { key, title })
	}

	useEffect(() => {
		if (item && !newNode) {
			form.setFieldsValue({
				title: item.title,
				code: item.key
			})
		} else form.resetFields();

	}, [item, newNode])

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation form={form} initialValue={item} />
							{item?.users.length ? <Table deleteUser={(e) => console.log(e)} setDefaultUser={(e) => console.log(e)} userList={item.users} /> : null}
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses initialValue={item?.accesses} />
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