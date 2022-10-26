import { debug } from "console";
import { debugPort } from "process";
import { useEffect, useContext, useState, useMemo, useRef } from "react";
import { debuglog } from "util";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from './Components/Tree'
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";

const handleGenerateNode = (parent: NodeType, data: any): NodeType => {
  const { title, key, users, accesses } = data
  let node: NodeType = {
    title,
    key,
    hierarchy: [...parent.hierarchy, key],
    children: [],
    users,
    parentKey: parent.key,
    accesses

  }
  return node
}
function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newNode, setNewNode] = useState(false)
  const [treeData, setTreeData] = useState([]);
  const cutedNode = useRef<NodeType>()

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
        setNewNode(true)
        break
      case 'CUT':
        cutedNode.current = node
        break
      case 'PASTE':
        handlePasteNode(node)
        break
      case 'DELETE':
        handleDeleteNode(node)
        break
    }
  }
  const handleUpdateTree = (nodes: NodeType[]) => {
    setTreeData(nodes)
  }

  const handlePasteNode = (node: NodeType) => {
    let newTree
    const cutNode = (listData: NodeType[]) => {
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].children.find(e => e.key === cutedNode.current.key)) {
          listData[i].children = listData[i].children.filter(e => e.key !== cutedNode.current.key)
          return listData
        } else if (listData[i].children) {
          cutNode(listData[i].children);
        }
        return listData
      }
    }
    newTree = cutNode(treeData)
    const pasteNode = (listData: NodeType[]) => {
      let updatedNode = {
        ...cutedNode.current,
        hierarchy: [...node.hierarchy, cutedNode.current.key],
        parentKey: node.key
      }
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].key === node.key) {
          listData[i].children = [...listData[i].children, updatedNode]
          return listData
        } else if (listData[i].children) {
          pasteNode(listData[i].children);
        }
        return listData
      }
    }
    newTree = pasteNode(newTree)
    setTreeData([...newTree])
    cutedNode.current = null
  }

  const handleDeleteNode = (node: NodeType) => {
    const deleteNode = (listData: NodeType[]) => {
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].children.find(e => e.key === node.key)) {
          listData[i].children = listData[i].children.filter(e => e.key !== node.key)
          return listData
        } else if (listData[i].children) {
          deleteNode(listData[i].children);
        }
        return listData
      }
    }
    setTreeData([...deleteNode(treeData)])
  }

  const handleAddNewNode = (key: any, data: any) => {
    const addNode = (listData: NodeType[]) => {
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].key === selectedItem.key) {
          listData[i].children = [...listData[i].children, handleGenerateNode(selectedItem, data)]
          return listData
        }
        if (listData[i].children) {
          addNode(listData[i].children);
        }
      }
      return listData
    }
    setTreeData([...addNode(treeData)])
    setSelectedItem(null)
    setNewNode(false)
  }

  const handleUpdateNode = (key: string, data: any) => {
    const findNode = (listData: NodeType[]) => {
      for (let i = 0; i < listData.length; i++) {
        if (listData[i].key === key) {
          listData[i] = { ...selectedItem, ...data }
          return listData
        } else if (listData[i].children) {
          findNode(listData[i].children);
        }
      }
      return listData
    }
    let newTree = findNode(treeData)
    setTreeData([...newTree])

  }

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
        cutedNodeKey: cutedNode.current?.key
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree selectItem={(e) => {
            setSelectedItem((prev: NodeType) => {
              if (prev && prev.key !== e.key) {
                setNewNode(false)
              } else if (newNode) {
                setNewNode(false)
              }
              return e
            })
          }}
            handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {selectedItem && <Form newNode={newNode} item={selectedItem} updateNode={newNode ? handleAddNewNode : handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
