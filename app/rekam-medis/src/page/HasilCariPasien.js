import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Label, Header, Message, Icon, Table } from 'semantic-ui-react';
import LoaderWithNoDimmer from '../component/LoaderWithNoDimmer';

export default function HasilCariPasien() {
  const { t } = useTranslation();

  const pasienId = null; //match.params.pasienId;
  const pasien = undefined; //usePasien(pasienId);

  if (undefined === pasien) {
    return <LoaderWithNoDimmer />;
  }

  if (null === pasien) {
    return <PasienNotFound />;
  }

  return (
    <Fragment>
      <div className="grid grid-cols-2">
        <div className="border-r mr-5 pr-5">
          <Header size="medium">{t('module:pasien')}</Header>
          <div className="grid grid-cols-2 py-2">
            <div class="font-bold">{t('portal:noRM')}</div>
            <div class="font-bold">{pasienId}</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div class="font-bold">{t('portal:nama')}</div>
            <div>Agus Hendra Supeno</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div class="font-bold">{t('portal:jenisKelamin')}</div>
            <div>Laki-laki</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div class="font-bold">{t('portal:tanggalLahir')}</div>
            <div>10/09/1997</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div class="font-bold">{t('portal:alamat')}</div>
            <div>Jl. Buntu Timur gang kelinci</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div class="font-bold">{t('portal:telepon')}</div>
            <div>081234567890</div>
          </div>
          <Header size="medium">{t('portal:dokumenPasien')}</Header>
        </div>
        <div>
          <Header size="medium">
            {t('module:riwayatKunjunganTempatLayanan')}
          </Header>
          <Label pointing="below" className="mb-0">
            {t('portal:riwayatKunjunganTempatLayanan.data.info')}
          </Label>
          <Table celled striped selectable size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">#</Table.HeaderCell>
                <Table.HeaderCell>Tempat Layanan</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Tanggal Masuk
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Tanggal Keluar
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className="cursor-pointer">
                <Table.Cell textAlign="center" className="font-bold">
                  1
                </Table.Cell>
                <Table.Cell>Lab PK</Table.Cell>
                <Table.Cell textAlign="right">12/12/2018 15:19</Table.Cell>
                <Table.Cell textAlign="right">12/12/2018 16:08</Table.Cell>
              </Table.Row>
              <Table.Row className="cursor-pointer">
                <Table.Cell textAlign="center" className="font-bold">
                  2
                </Table.Cell>
                <Table.Cell>Melati</Table.Cell>
                <Table.Cell textAlign="right">12/12/2018 13:19</Table.Cell>
                <Table.Cell textAlign="right">15/12/2018 10:00</Table.Cell>
              </Table.Row>
              <Table.Row className="cursor-pointer">
                <Table.Cell textAlign="center" className="font-bold">
                  3
                </Table.Cell>
                <Table.Cell>IGD</Table.Cell>
                <Table.Cell textAlign="right">12/12/2018 10:19</Table.Cell>
                <Table.Cell textAlign="right">12/12/2018 13:00</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}

function PasienNotFound() {
  const { t } = useTranslation();

  return (
    <Grid>
      <Grid.Column width={8}>
        <Message warning icon compact>
          <Icon.Group size="big" className="mr-5">
            <Icon size="big" name="file outline" />
            <Icon size="small" name="user" />
          </Icon.Group>
          <Message.Content>
            <Message.Header>{t('portal:pasienTidakDitemukan')}</Message.Header>
            <p>{t('portal:pasienTidakDitemukan.description')}</p>
          </Message.Content>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
