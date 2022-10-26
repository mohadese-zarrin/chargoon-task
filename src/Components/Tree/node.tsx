import React from 'react';
import { NodeType } from '../../types';
import { ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
  node: NodeType;
  handleContextMenuClick: (action: string, node: NodeType) => void;
}

function Node({ node, handleContextMenuClick }: Props) {
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx
        id={node.key}
        title={node.title}
      />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx disable={false} handleClick={() => handleContextMenuClick('ADD_BRANCH', node)} title={'افزودن زیرشاخه'} />
        <ContextMenuItemEx disable={node.children.length} handleClick={() => handleContextMenuClick('CUT', node)} title={'برش'} />
        <ContextMenuItemEx disable={false} handleClick={() => handleContextMenuClick('PASTE', node)} title={'چسباندن'} />
        <ContextMenuItemEx disable={node.children.length} handleClick={() => handleContextMenuClick('DELETE', node)} title={'حذف'} />
      </ContextMenuEx>

    </div>
  );
}
export default Node