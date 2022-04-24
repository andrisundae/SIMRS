import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const BiayaTindakan = ({ label }) => {
  return (
    <Grid.Column width="3" style={{ paddingLeft: 0, paddingRight: 8 }}>
      <Header as="h5" textAlign="right" dividing style={{ width: '100%' }}>
        {label}
      </Header>
    </Grid.Column>
  );
};

BiayaTindakan.propTypes = {
  label: PropTypes.string.isRequired,
};

export default BiayaTindakan;
