import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import {
  Container,
  Dropdown,
  Button,
  Message,
  Form,
  Segment,
  Header,
  Label,
  Input,
} from 'semantic-ui-react';

export default function SetApiUrl() {
  const history = useHistory();
  const apiUrlInput = useRef();
  const [httpType, setHttpType] = useState('http://');
  const [apiUrl, setApiUrl] = useState(
    (localStorage.getItem('config.apiUrl') || '').replace(/(^\w+:|^)\/\//, '')
  );
  const [isError, setIsError] = useState(false);

  return (
    <div className="fixed w-full" style={{ height: 'calc(100% - 3rem)' }}>
      <Container className="mt-10 flex justify-center content-center">
        <div style={{ width: 400 }}>
          {localStorage.getItem('config.apiUrl') ? null : (
            <Message
              warning
              icon="warning sign"
              header="Alamat server tidak ditemukan"
              content="Atur alamat server terlebih dahulu"
            />
          )}
          <Segment padded="very">
            <Form
              size="large"
              onSubmit={() => {
                if ('' === apiUrl.trim()) {
                  setIsError(true);
                  apiUrlInput.current.focus();
                  return false;
                }
                localStorage.setItem('config.apiUrl', httpType + apiUrl);
                history.replace('/');
              }}
            >
              <Form.Field>
                <Label pointing="below">
                  Sebelum "
                  <Header as="span" color="teal" size="small">
                    Simpan
                  </Header>
                  ", pastikan alamat server tujuan ditulis dengan benar
                </Label>
                <div className="field mb-0">
                  <Input
                    ref={apiUrlInput}
                    autoFocus
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck={false}
                    label={
                      <Dropdown
                        value={httpType}
                        options={[
                          { key: 'http://', text: 'http://', value: 'http://' },
                          {
                            key: 'https://',
                            text: 'https://',
                            value: 'https://',
                          },
                        ]}
                        onChange={(e, { value }) => {
                          setHttpType(value);
                        }}
                      />
                    }
                    labelPosition="left"
                    fluid
                    value={apiUrl}
                    onChange={(e) => {
                      setApiUrl(e.target.value);
                      if ('' !== e.target.value.trim()) {
                        setIsError(false);
                      }
                    }}
                  />
                  {isError ? (
                    <div className="flex justify-center">
                      <Label pointing basic color="brown">
                        Alamat server wajib diisi.
                      </Label>
                    </div>
                  ) : null}
                </div>
              </Form.Field>

              <Button size="large" fluid color="teal">
                Simpan
              </Button>
            </Form>
          </Segment>
        </div>
      </Container>
    </div>
  );
}
