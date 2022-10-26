import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { getAccessList } from '../../transportLayer';

interface Props {
	initialValue?: string[];
	setAccesses: (e: any) => void
}

function Accesses({ initialValue, setAccesses }: Props) {
	const [options, setOptions] = useState([]);

	const fetchAccessList = async () => {
		const result = await getAccessList();
		setOptions(result);
	}

	useEffect(() => {
		fetchAccessList()
	}, [])


	function handleOnChange(e: any) {
		setAccesses(e)
	}

	return (
		<Checkbox.Group value={initialValue} options={options as any} onChange={handleOnChange} />
	);
}
export default Accesses