import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  }

  useEffect(() => {
    fetchTreeData()
  }, [])

  const handleContextMenuClick = (action: string, node: NodeType) => {
    switch (action) {
      case 'ADD_BRANCH':
        console.log(node, 'ADD_BRANCH')
        break
      case 'CUT':
        console.log(node, 'CUT')
        break
      case 'PASTE':
        console.log(node, 'cut');
        break
      case 'DELETE':
        console.log(node, 'DELETE')
        break
    }
  }

  const handleUpdateTree = (nodes: NodeType[]) => {
    setTreeData(nodes)
  }

  const handleUpdateNode = (key: string, data: any) => {
    console.log(key, data, 'update node');

    const findNode = (listData: NodeType[]) => {
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].key === key) {
          listData[i] = data
          return listData
        } else if (listData[i].children) {
          findNode(listData[i].children);
        }
        return listData
      }
    }
    let newTree = findNode(treeData)
    console.log(newTree);
    setTreeData([...newTree])

  }

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree selectItem={setSelectedItem} handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
