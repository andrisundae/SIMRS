import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Icon } from 'semantic-ui-react';
import TreeView from '@simrs/components/src/TreeView';
import { modalIndukChange } from '../reducer/form';
import { indukChange } from '../reducer/item';

const treedata = [
  {
    key: '0',
    title: 'Induk 0',
    children: [
      {
        key: '0.0',
        title: 'Induk 0-0',
        children: [
          {
            key: '0.0.0',
            title: 'Induk 0-0-0',
          },
        ],
      },
      {
        key: '0.1',
        title: 'Induk 0-1',
        children: [
          {
            key: '0.1.0',
            title: 'Induk 0-1-0',
          },
        ],
      },
    ],
  },
];

export default function ModalInduk() {
  const dispatch = useDispatch();
  const { modalInduk } = useSelector((state) => state.form);
  const { induk } = useSelector((state) => state.item);

  return (
    <Modal
      closeIcon
      centered={false}
      open={modalInduk}
      onClose={() => dispatch(modalIndukChange(!modalInduk))}
    >
      <Modal.Header className="text-xl">
        <Icon.Group className="mr-2">
          <Icon name="ordered list" />
          <Icon corner="bottom right" name="check" />
        </Icon.Group>
        Pilih Induk
      </Modal.Header>
      <Modal.Content>
        <TreeView
          className="text-lg"
          defaultExpandAll
          showLine
          showIcon={false}
          treeData={treedata}
          selectedKeys={induk.value}
          onSelect={(key, info) => {
            const node = info.node;
            dispatch(
              indukChange({
                text: node.title,
                value: key,
              })
            );
            dispatch(modalIndukChange(!modalInduk));
          }}
        />
      </Modal.Content>
    </Modal>
  );
}
