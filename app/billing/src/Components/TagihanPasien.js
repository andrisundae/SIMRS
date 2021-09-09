import React, { memo } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useModuleTrans } from '@simrs/components';
import { formatter } from '@simrs/common';

function TagihanPasien({ keringanan, bayar, pengembalian, biaya, ...props }) {
  const t = useModuleTrans();
  const kurang = biaya - keringanan - bayar;

  return (
    <Segment color={biaya > 0 && kurang === 0 ? 'green' : 'red'} {...props}>
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
            {formatter.currency(keringanan)}
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
            {formatter.currency(bayar)}
          </Grid.Column>
          <Grid.Column width="4" className="field">
            <label>{t('pengembalian')}</label>
          </Grid.Column>
          <Grid.Column
            style={{ textAlign: 'right' }}
            width="4"
            className="field"
          >
            {pengembalian}
          </Grid.Column>
        </Grid.Row>
        {/* <Divider style={{ margin: 0 }} /> */}
        <Grid.Row className="form-row">
          <Grid.Column width="4" className="field">
            <label>{t('total_biaya_pengunjung')}</label>
          </Grid.Column>
          <Grid.Column textAlign="right" width="4" className="field">
            {formatter.currency(biaya)}
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
  );
}

export default memo(TagihanPasien);
