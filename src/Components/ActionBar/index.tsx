import React from 'react';
import { Button, Form, Input } from 'antd';

interface ActionType {
	title: string;
	handler: () => void;
}

interface Props {
	actions: ActionType[];
}

function ActionBar({ actions }: Props) {
	return (<div className='actionbar' >
		{actions.map(action =>
			<Button onClick={action.handler} type="primary" >{action.title}</Button>)
		}
	</div>)
}
export default ActionBar