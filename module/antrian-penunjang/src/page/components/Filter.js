import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
// import _ from 'lodash';
import { Grid, Form, Segment } from 'semantic-ui-react';
import { useModuleTrans, messageBox } from '@simrs/components';
import { useInitAntrianPenunjang } from '@simrs/billing/src/fetcher';
// import { utils } from '@simrs/common';
import { Input, ReactSelect, PreviewButton } from '@simrs/components';
// import { selectKunjungan, ready } from '../../redux/reducer';
// import { disabledElement, moduleSelector } from '../../redux/reducer/selector';
// import { staticConst } from '../../static';

function Filter() {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const methods = useForm();

  // Hook untuk mencari pasien
  const { data } = useInitAntrianPenunjang();

  const formattedData = useMemo(() => {
    const inits = {
      instalasi: [],
      kelompok: [],
      penjamin: [],
      unit_layanan: [],
    };
    if (!data) {
      return inits;
    }
    return data;
  }, [data]);

  return (
    <FormProvider {...methods}>
      <Form
        size="mini"
        // onSubmit={methods.handleSubmit(onSubmit)}
        // ref={formRef}
        // loading={isLoading}
      >
        <Segment size="mini" className="py-2 px-5 mt-2 mb-1">
          <Grid columns="2" className="mb-1 mt-2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('jenis_layanan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <ReactSelect
                        name="instalasi_id"
                        placeholder={t('jenis_layanan')}
                        // inputRef={this.instalasi_id}
                        // onChange={(selected) =>
                        //   this.changeSelect2Hanlder('instalasi_id', selected)
                        // }
                        // value={selectedOption.instalasi_id}
                        options={formattedData?.instalasi || []}
                        // onKeyDown={(e) =>
                        //   this.focusElementHandler(e, 'unit_layanan_id')
                        // }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('unit_layanan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <ReactSelect
                        name="unit_layanan_id"
                        placeholder={t('unit_layanan')}
                        // inputRef={this.instalasi_id}
                        // onChange={(selected) =>
                        //   this.changeSelect2Hanlder('instalasi_id', selected)
                        // }
                        // value={selectedOption.instalasi_id}
                        options={formattedData?.unit_layanan || []}
                        // onKeyDown={(e) =>
                        //   this.focusElementHandler(e, 'unit_layanan_id')
                        // }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('status_pasien')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <ReactSelect
                        name="penjamin_id"
                        placeholder={t('status_pasien')}
                        // inputRef={this.instalasi_id}
                        // onChange={(selected) =>
                        //   this.changeSelect2Hanlder('instalasi_id', selected)
                        // }
                        // value={selectedOption.instalasi_id}
                        options={formattedData?.penjamin || []}
                        // onKeyDown={(e) =>
                        //   this.focusElementHandler(e, 'unit_layanan_id')
                        // }
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('nama_pasien')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input name="nama_pasien" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('norm')}</label>
                    </Grid.Column>
                    <Grid.Column width="6" className="field">
                      <Input name="norm" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="8" className="field">
                      <PreviewButton
                        // onKeyDown={this.keyDownSearchHandler}
                        tabIndex={-1}
                        as="a"
                        // inputRef={this.search}
                        // onClick={this.submitHandler}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </FormProvider>
  );
}

export default Filter;
