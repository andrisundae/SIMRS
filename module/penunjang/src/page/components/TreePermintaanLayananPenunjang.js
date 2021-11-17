import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Modal, Icon, Form, Grid, Segment } from 'semantic-ui-react';
import Tree from 'rc-tree';
import {
  useModuleTrans,
  CancelButton,
  SaveButton,
  Input,
  ReactSelect,
  TreeView,
} from '@simrs/components';
// import { useKunjunganAktifRawatInap } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';

function getTreeData() {
  // big-data: generateData(1000, 3, 2)
  return [
    {
      key: '0',
      title: 'node 0',
      children: [
        { key: '0-0', title: 'node 0-0' },
        { key: '0-1', title: 'node 0-1' },
        {
          key: '0-2',
          title: 'node 0-2',
          children: [
            { key: '0-2-0', title: 'node 0-2-0' },
            { key: '0-2-1', title: 'node 0-2-1' },
            { key: '0-2-2', title: 'node 0-2-2' },
          ],
        },
        { key: '0-3', title: 'node 0-3' },
        { key: '0-4', title: 'node 0-4' },
        { key: '0-5', title: 'node 0-5' },
        { key: '0-6', title: 'node 0-6' },
        { key: '0-7', title: 'node 0-7' },
        { key: '0-8', title: 'node 0-8' },
        {
          key: '0-9',
          title: 'node 0-9',
          children: [
            { key: '0-9-0', title: 'node 0-9-0' },
            {
              key: '0-9-1',
              title: 'node 0-9-1',
              children: [
                { key: '0-9-1-0', title: 'node 0-9-1-0' },
                { key: '0-9-1-1', title: 'node 0-9-1-1' },
                { key: '0-9-1-2', title: 'node 0-9-1-2' },
                { key: '0-9-1-3', title: 'node 0-9-1-3' },
                { key: '0-9-1-4', title: 'node 0-9-1-4' },
              ],
            },
            {
              key: '0-9-2',
              title: 'node 0-9-2',
              children: [
                { key: '0-9-2-0', title: 'node 0-9-2-0' },
                { key: '0-9-2-1', title: 'node 0-9-2-1' },
              ],
            },
          ],
        },
      ],
    },
    {
      key: '1',
      title: 'node 1',
      // children: new Array(1000)
      //   .fill(null)
      //   .map((_, index) => ({ title: `auto ${index}`, key: `auto-${index}` })),
      children: [
        {
          key: '1-0',
          title: 'node 1-0',
          children: [
            { key: '1-0-0', title: 'node 1-0-0' },
            {
              key: '1-0-1',
              title: 'node 1-0-1',
              children: [
                { key: '1-0-1-0', title: 'node 1-0-1-0' },
                { key: '1-0-1-1', title: 'node 1-0-1-1' },
              ],
            },
            { key: '1-0-2', title: 'node 1-0-2' },
          ],
        },
      ],
    },
  ];
}

const TreePermintaanLayananPenunjang = ({
  innerRef,
  onRowSelected,
  show,
  onHide,
  idPasien,
}) => {
  // const methods = useForm();
  const t = useModuleTrans();

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="large"
      // style={{ width: 500 }}
    >
      <Modal.Header className="p-3">
        <Icon name="plus" />
        {t('permintaan_layanan_penunjang')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100 px-5 pb-8 shadow-lg">
        <div className="">
          
        </div>
        <Segment>
          <Tree
            // ref={treeRef}
            // defaultExpandAll={false}
            defaultExpandAll
            // defaultExpandedKeys={defaultExpandedKeys}
            // motion={motion}
            height={600}
            itemHeight={20}
            style={{ border: '1px solid #000' }}
            treeData={getTreeData()}
          />
        </Segment>
        {/* <TreeView
          // ref={this.tree}
          className="myCls"
          showLine
          navigation
          selectable
          // onExpand={this._onExpand}
          // onSelect={this._onSelect}
          treeData={getTreeData()}
          // selectedKeys={selectedKeys}
          // expandedKeys={expandedKeys}
          // disabled={!isDisableForm}
        /> */}
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <SaveButton />
          <CancelButton onClick={onHide} />
        </div>
      </Modal.Actions>
    </Modal>
  );
};

TreePermintaanLayananPenunjang.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return (
    <TreePermintaanLayananPenunjang innerRef={ref || innerRef} {...props} />
  );
});

export default React.memo(Component);
