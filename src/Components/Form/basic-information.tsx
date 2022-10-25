import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import UserAutoComplete from './user-autocomplete';

interface Props {
	initialValue?: any;
}

function BasicInformation({ initialValue }: Props) {
	const [form] = Form.useForm();
	useEffect(() => {
		if (initialValue) {
			form.setFieldsValue({
				title: initialValue.title,
				code: initialValue.key
			})
		}
	}, [initialValue])


	return (
		<Form form={form}>
			<Form.Item name="title" label="عنوان" labelCol={{ span: 2 }} >
				<Input />
			</Form.Item>
			<Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete />
			</Form.Item>
		</Form>
	);
}
export default BasicInformation