import React from 'react';
import { NodeType } from './types';


interface AppContext {
    updateTreeData: (nodes: NodeType[]) => void;
    treeData: NodeType[];
    cutedNodeKey: string
}

const defaultAppContext: AppContext = {
    treeData: [],
    updateTreeData: () => [],
    cutedNodeKey: ''
};

const AppContext = React.createContext<AppContext>(defaultAppContext);

export default AppContext;