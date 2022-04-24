import React, { useCallback } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const LinkTransaction = ({ idKunjunganUnit }) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const clickPermintaanPenunjangHandler = useCallback(
    () =>
      history.push({
        pathname: `${match.url}penunjang/permintaan/${idKunjunganUnit}`,
        state: { background: location },
      }),
    [history, idKunjunganUnit, location, match.url]
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
        <Dropdown.Item icon="user" text="Identitas Pasien" onClick={() => {}} />
        <Dropdown.Item icon="accessible" text="Konsul" onClick={() => {}} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LinkTransaction;
