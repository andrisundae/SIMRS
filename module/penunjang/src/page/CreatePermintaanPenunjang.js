import React, { useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextArea, Modal, Icon, Form, Grid } from 'semantic-ui-react';
// import { useForm, FormProvider } from 'react-hook-form';
import { useModuleTrans, CancelButton, SaveButton } from '@simrs/components';
import { useInitPermintaanPenunjang } from '@simrs/billing/src/fetcher/penunjang';
import TreePermintaanLayananPenunjang from './components/TreePermintaanLayananPenunjang';
import FormPermintaanPenunjang from './components/FormPermintaanPenunjang';

const CreatePermintaanPenunjang = ({
  innerRef,
  onRowSelected,
  show,
  onHide,
  idPasien,
}) => {
  // const methods = useForm();
  const [showTree, setShowTree] = useState(false);
  const t = useModuleTrans();
  const formRef = useRef();

  const { data: init } = useInitPermintaanPenunjang();

  // Untuk mentrigger form biar submit
  const submitTriggerHandler = useCallback(() => {
    formRef.current.handleSubmit();
  }, []);

  const submitHandler = useCallback((values) => {
    setShowTree(true)
  }, []);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      // style={{ width: 500 }}
      size="tiny"
    >
      <Modal.Header className="p-3">
        <Icon name="plus" />
        {t('tambah_permintaan_penunjang')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100 px-5 pb-8 shadow-lg">
        <FormPermintaanPenunjang
          kelas={init?.kelas}
          unitLayanan={init?.unit_layanan}
          // dpjpAsal={init?.dp}
          ref={formRef}
          onSubmit={submitHandler}
        />
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <SaveButton onClick={submitTriggerHandler} />
          <CancelButton onClick={onHide} />
        </div>
      </Modal.Actions>
      {showTree && (
        <TreePermintaanLayananPenunjang
          show={showTree}
          onHide={() => setShowTree(false)}
          data={[]}
        />
      )}
    </Modal>
  );
};

CreatePermintaanPenunjang.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <CreatePermintaanPenunjang innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
