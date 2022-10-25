import React, { useContext, useState } from 'react';
import { NodeType } from '../../types';
import { Popover, Tree } from 'antd';
import AppContext from '../../appContext';
import OrgchartIcon from '../SvgIcons/orgchart'
import ArrowUpIcon from '../SvgIcons/arrow-up'
import ArrowDownIcon from '../SvgIcons/arrow-down'

interface Props {
	items: (NodeType & { hierarchy: string[] })[]
}

function SearchResult({ items }: Props) {
	const { treeData } = useContext(AppContext);
	const [showResult, setShowResult] = useState(true)

	const content = (node: NodeType): JSX.Element => {
		let expandedKeys = node.hierarchy.slice(0, -1)
		return <div>
			<Tree
				expandedKeys={expandedKeys}
				treeData={treeData}
			/>
		</div>
	};
	return (
		<div className='search-result' style={{ overflow: 'auto' }}>
			<div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => setShowResult(!showResult)}>
				{showResult ?
					<ArrowDownIcon /> :
					<ArrowUpIcon />
				}
			</div>
			<div style={{ display: showResult ? 'block' : 'none' }}>
				{items.map(item => (
					<div key={item.key} className='search-result-item'>
						<div>{item.title}</div>
						<Popover placement='left' content={content(item)} trigger="click">
							<div><OrgchartIcon height={20} width={20} /></div>
						</Popover>
					</div>
				))
				}
			</div>
		</div>
	)
}
export default SearchResult;