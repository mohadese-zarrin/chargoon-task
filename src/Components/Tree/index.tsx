import { Input, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useContext, useMemo, useRef, useState } from 'react';
import AppContext from '../../appContext';
import { NodeType } from '../../types';
import Node from './node';
import SearchResult from './searchResult';

const { Search } = Input;

interface Props {
  handleContextMenuClick: (key: string) => void;
  selectItem: (node: any) => void
}
let dataList: NodeType[]

const TreeExtended: React.FC<Props> = ({ handleContextMenuClick, selectItem }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState('')
  const [resultItems, setResultItems] = useState([])
  const searchedKeyword = useRef();

  // FIXME set false
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const { treeData } = useContext(AppContext);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value)
  };

  const handlePressEnter = () => {
    dataList = []
    if (searchValue.length === 0) {
      setSearchResultVisible(false)
      return
    }
    setSearchResultVisible(true)
    const generateList = (data: NodeType[]) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (typeof node.title === 'string' && node.title.indexOf(searchValue) > -1) dataList.push(node)
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(treeData)
    setResultItems(dataList)
  }

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    // let selectedNodeData={
    //   accesses:info.node.accesses,
    //   basicInformation:''
    // }
    console.log('selected', selectedKeys, info.node);
    selectItem(info.node)
  };

  return (
    <div className='tree-wrap'>
      <Search style={{ marginBottom: 8 }} placeholder="جستجو" onChange={handleSearchInputChange} onPressEnter={handlePressEnter} />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
        onSelect={onSelect}
      />
      {searchResultVisible && <SearchResult items={resultItems} />}
    </div>
  );
};

export default TreeExtended;