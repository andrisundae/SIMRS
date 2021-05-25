import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
} from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, Input, Modal, Transition } from 'semantic-ui-react';
import produce from 'immer';
import LoaderWithNoDimmer from './LoaderWithNoDimmer';

const HasilCariPasien = lazy(() => import('../page/HasilCariPasien'));

export default function CariPasien() {
  const history = useHistory();
  const pathName = useLocation().pathname;
  const pathNames = pathName.split('/');
  const modalIsOpen = -1 < pathName.indexOf('/hasil-cari-pasien');
  const parentPath = produce(pathNames, (draft) => {
    if (modalIsOpen) {
      draft.splice(draft.length - 1, 1);
    }
  }).join('/');
  const { t } = useTranslation();
  const [pasienId, setPasienId] = useState(
    modalIsOpen ? pathNames[pathNames.length - 1] : ''
  );
  const pasienIdInput = useRef(null);
  const pasienIdModalInput = useRef(null);
  const [
    pasienIdModalInputVisibility,
    setPasienIdModalInputVisibility,
  ] = useState(true);

  useEffect(() => {
    if (modalIsOpen) {
      setPasienIdModalInputVisibility(true);
    } else {
      setPasienIdModalInputVisibility(false);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (modalIsOpen && pasienIdModalInputVisibility) {
      pasienIdModalInput.current.focus();
    }
  }, [modalIsOpen, pasienIdModalInputVisibility]);

  function submitOnSearchPasien(e) {
    e.preventDefault();
    if ('' === pasienId) {
      return false;
    }

    if (!modalIsOpen) {
      history.push(`${parentPath}/hasil-cari-pasien/${pasienId}`);
    }
  }

  return (
    <Fragment>
      <form id="pasienSearch" onSubmit={submitOnSearchPasien} />
      {!modalIsOpen && (
        <Fragment>
          <Input icon size="small" placeholder={t('portal:cariPasien') + '...'}>
            <input
              ref={pasienIdInput}
              form="pasienSearch"
              value={pasienId}
              onChange={(e) => {
                setPasienId(e.target.value);
              }}
              className="mousetrap"
            />
            <Icon name="search" link onClick={submitOnSearchPasien} />
          </Input>
        </Fragment>
      )}

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={modalIsOpen}
        onClose={() => {
          history.goBack();
        }}
      >
        <Modal.Header>
          <Transition
            animation="glow"
            duration={1000}
            visible={pasienIdModalInputVisibility}
          >
            <Input
              icon
              transparent
              iconPosition="left"
              placeholder={t('portal:cariPasien')}
            >
              <Icon name="search" />
              <input
                ref={pasienIdModalInput}
                form="pasienSearch"
                autoComplete="off"
                value={pasienId}
                onChange={(e) => {
                  setPasienId(e.target.value);
                }}
                onFocus={() => {
                  setPasienIdModalInputVisibility(
                    !pasienIdModalInputVisibility
                  );
                }}
              />
            </Input>
          </Transition>
        </Modal.Header>
        <Modal.Content scrolling style={{ minHeight: 300 }}>
          <Suspense fallback={<LoaderWithNoDimmer />}>
            <Route path={parentPath + '/:pasienId'}>
              <HasilCariPasien />
            </Route>
          </Suspense>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
}
