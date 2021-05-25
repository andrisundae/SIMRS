import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Container,
  Header,
  Segment,
  Form,
  Button,
  Label,
  Input,
  Icon,
} from 'semantic-ui-react';
import { post } from '../fetcher/fetcher';

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [usernameIsShowWarning, setUsernameIsShowWarning] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordIsShowWarning, setPasswordIsShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="fixed w-full" style={{ height: 'calc(100% - 3rem)' }}>
      <Container className="mt-10 flex justify-center content-center">
        <div style={{ width: 400 }}>
          <Segment padded="very">
            <Header size="large" dividing>
              Rumah Sakit
              <Header.Subheader>{process.env.REACT_APP_NAME}</Header.Subheader>
            </Header>
            <Header size="small">Silahkan login terlebih dahulu</Header>
            <Form
              size="large"
              onSubmit={async (e) => {
                e.preventDefault();

                if ('' === username.trim()) {
                  setUsernameIsShowWarning(true);
                  return false;
                }
                if ('' === password.trim()) {
                  setPasswordIsShowWarning(true);
                  return false;
                }

                setIsSubmitting(true);
                await post('/auth/personel/validate/credentials', {
                  username,
                  password,
                });
                // history.push('/main');
              }}
            >
              <Form.Field>
                <Input icon iconPosition="left" fluid>
                  <input
                    autoFocus
                    type="text"
                    autoFocus
                    placeholder="ID"
                    value={username}
                    autoComplete="username"
                    className="mousetrap"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onKeyDown={() => {}}
                  />
                  <Icon name="user" />
                </Input>
                {usernameIsShowWarning ? (
                  <Label pointing basic color="brown">
                    Wajib diisi
                  </Label>
                ) : null}
              </Form.Field>

              <Form.Field>
                <Input icon iconPosition="left" fluid>
                  <input
                    type="password"
                    placeholder="Kata sandi"
                    value={password}
                    autoComplete="current-password"
                    className="mousetrap"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyDown={() => {}}
                  />
                  <Icon name="key" />
                </Input>
                {passwordIsShowWarning ? (
                  <Label pointing basic color="brown">
                    Wajib diisi
                  </Label>
                ) : null}
              </Form.Field>

              <Button
                type="submit"
                size="large"
                fluid
                color="teal"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Masuk
              </Button>
            </Form>
          </Segment>
        </div>
      </Container>
    </div>
  );
}
