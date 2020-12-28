import React from 'react';
import { Grid, Form } from 'semantic-ui-react';
import { useModuleTrans, Select } from '@simrs/components';

const FormPelaksanaTambahan = ({
  disabled,
  selectedOption,
  data,
  onChangeSelect,
  onFocusElement,
  focusElement,
  loaderPelaksana,
}) => {
  const trans = useModuleTrans();
  const inputRef = {
    id_spesialisasi: React.useRef(),
    id_pelaksana: React.useRef(),
  };

  React.useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        inputRef[focusElement].current.focus();
      }
    }
  }, [focusElement]);

  return (
    <Form
      id="form-pelaksana-tambahan"
      size="small"
      onSubmit={(e) => e.preventDefault()}
    >
      <Grid className="form-grid">
        <Grid.Row className="form-row">
          <Grid.Column width="4" className="required field">
            <label>{trans('spesialisasi')}</label>
          </Grid.Column>
          <Grid.Column width="12" className="field">
            <Select
              name="id_spesialisasi"
              isDisabled={disabled}
              options={data.spesialisasi}
              onChange={(selected) =>
                onChangeSelect('id_spesialisasi', selected)
              }
              isClearable={false}
              value={selectedOption.id_spesialisasi}
              inputRef={inputRef.id_spesialisasi}
              onKeyDown={(e) => onFocusElement(e, 'id_pelaksana')}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="form-row">
          <Grid.Column width="4" className="required field">
            <label>{trans('pelaksana')}</label>
          </Grid.Column>
          <Grid.Column width="12" className="field">
            <Select
              name="id_pelaksana"
              isDisabled={disabled || !selectedOption.id_spesialisasi}
              options={data.pelaksana}
              onChange={(selected) => onChangeSelect('id_pelaksana', selected)}
              isClearable={false}
              value={selectedOption.id_pelaksana}
              inputRef={inputRef.id_pelaksana}
              onKeyDown={(e) => onFocusElement(e, 'save')}
              isLoading={loaderPelaksana}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default FormPelaksanaTambahan;
