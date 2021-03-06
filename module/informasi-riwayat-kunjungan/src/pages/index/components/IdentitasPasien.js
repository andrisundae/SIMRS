import React from 'react';
import { Grid, Form, Input, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { useModuleTrans } from '@simrs/components';
import { formatter } from '@simrs/common';

const IdentitasPasien = ({
  data,
  onEnterNorm,
  focusElement,
  isDisabledNorm,
}) => {
  const t = useModuleTrans();
  const inputRef = {
    norm: React.useRef(),
  };

  const [norm, setNorm] = React.useState('');

  React.useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        inputRef[focusElement].current.focus();
      }
    }
  }, [focusElement, inputRef]);

  const changeNormHandler = React.useCallback((e) => setNorm(e.target.value));

  return (
    <Form
      id="form-riwayat-kunjungan"
      size="mini"
      onSubmit={(e) => e.preventDefault()}
    >
      <Segment size="mini" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('norm')}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      ref={inputRef.norm}
                      name="norm"
                      onKeyDown={onEnterNorm}
                      disabled={isDisabledNorm}
                      value={
                        isDisabledNorm
                          ? formatter.textSplitter(data.norm)
                          : norm
                      }
                      onChange={changeNormHandler}
                      onFocus={(e) => {
                        if (e.target.value) {
                          e.target.select();
                        }
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('nama')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input name="nama" disabled value={data.nama} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('jenis_kelamin')}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      name="jenis_kelamin"
                      disabled
                      value={data.nama_jenis_kelamin}
                    />
                  </Grid.Column>
                  <Grid.Column width="8" className="field">
                    <Header as="h4" color="grey" style={{ marginTop: 3 }}>
                      {data.umur}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('nama_panggilan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="nama_panggilan"
                      disabled
                      value={data.nama_panggilan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('alamat')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input name="alamat" disabled value={data.alamat} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  );
};

IdentitasPasien.propTypes = {
  data: PropTypes.object,
  onEnterNorm: PropTypes.func,
  focusElement: PropTypes.string,
  isDisabledNorm: PropTypes.bool,
  onChangeInput: PropTypes.func,
};

export default React.memo(IdentitasPasien);
