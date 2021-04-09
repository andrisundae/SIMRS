import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Divider } from 'semantic-ui-react';

import { useModuleTrans } from '@simrs/components';
import { formatter } from '@simrs/common';

const Summary = ({ data }) => {
  const t = useModuleTrans();
  const kurang = data.keringanan - data.bayar - data.pengembalian;
  return (
    <Grid verticalAlign="middle" centered>
      <Grid.Column>
        <Segment color="grey">
          <Grid>
            <Grid.Row className="form-row">
              <Grid.Column width="4" className="field">
                <label>{t('keringanan')}</label>
              </Grid.Column>
              <Grid.Column
                style={{ textAlign: 'right' }}
                width="4"
                className="field"
              >
                {formatter.currency(data.keringanan)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="form-row">
              <Grid.Column width="4" className="field">
                <label>{t('sudah_dibayar')}</label>
              </Grid.Column>
              <Grid.Column
                style={{ textAlign: 'right' }}
                width="4"
                className="field"
              >
                {formatter.currency(data.bayar)}
              </Grid.Column>
              <Grid.Column width="4" className="field">
                <label>{t('pengembalian')}</label>
              </Grid.Column>
              <Grid.Column
                style={{ textAlign: 'right' }}
                width="4"
                className="field"
              >
                {formatter.currency(data.pengembalian)}
              </Grid.Column>
            </Grid.Row>
            <Divider style={{ margin: 0 }} />
            <Grid.Row className="form-row">
              <Grid.Column width="4" className="field">
                <label>{t('total_biaya_pengunjung')}</label>
              </Grid.Column>
              <Grid.Column
                style={{ textAlign: 'right' }}
                width="4"
                className="field"
              >
                {formatter.currency(data.biaya)}
              </Grid.Column>
              <Grid.Column width="4" className="field">
                <label>{t('kurang')}</label>
              </Grid.Column>
              <Grid.Column
                style={{ textAlign: 'right' }}
                width="4"
                className="field"
              >
                {formatter.currency(kurang)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

Summary.propTypes = {
  data: PropTypes.object,
};

export default React.memo(Summary);
