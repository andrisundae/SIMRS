import React, { useCallback } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const LinkTransaction = ({ idKunjunganUnit }) => {
  const history = useHistory();
  const clickPermintaanPenunjangHandler = useCallback(
    () =>
      history.push(
        `/billing/transaksi/penunjang/permintaan/${idKunjunganUnit}`
      ),
    [history, idKunjunganUnit]
  );
  return (
    <Dropdown
      icon={
        <Button size="mini" color="green">
          <Icon name="bars" />
          Link
        </Button>
      }
      direction="left"
      pointing="top left"
      className="mr-3 text-base"
    >
      <Dropdown.Menu>
        <Dropdown.Item
          icon="phone volume"
          text="Permintaan Penunjang"
          onClick={clickPermintaanPenunjangHandler}
        />
        <Dropdown.Item
          icon="user outline"
          text="Identitas Pasien"
          onClick={() => {}}
        />
        <Dropdown.Item icon="accessible" text="Konsul" onClick={() => {}} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LinkTransaction;
