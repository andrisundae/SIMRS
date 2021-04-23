import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import i18n from 'i18next';
import _ from 'lodash';
import dayjs from 'dayjs';

import { validator as commonValidator, toastr } from '@simrs/common';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import {
  loaderActions,
  messageBox,
  constDatatable,
  datatableActions,
  confirmation,
} from '@simrs/components';
import api from '../services/models/kunjunganModel';
import {
  actions,
  actionTypes,
  getPost,
  isPasienBaru,
  getSelectedOption,
  menggabungkanKunjunganIbuDanBayiSelector,
} from '../pages/index';
import { staticConst } from '../pages/index/static';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(staticConst.TABLE_PASIEN));
  yield put(datatableActions.onInitialize(staticConst.TABLE_KUNJUNGAN));
  yield put(datatableActions.onInitialize(staticConst.TABLE_WILAYAH));
  yield put(
    datatableActions.onInitialize(staticConst.PENJAMIN_PASIEN_RESOURCE)
  );
  yield put(
    datatableActions.onInitialize(staticConst.TABLE_KUNJUNGAN_HARI_INI)
  );
  yield put(
    aclActions.getGranted.request(staticConst.PENJAMIN_PASIEN_RESOURCE)
  );
  yield put(actions.populateForm.request(meta.resource));
  yield put(actions.onReady(meta.resource));
}

function* handleSave({ payload, meta }) {
  const { resource } = meta;
  const { data } = payload;
  try {
    yield put(loaderActions.show());
    const { rules, messages } = api.validationRules(resource);
    const prevPost = yield select(getPost);
    const jamKunjungan = dayjs(data.jam_kunjungan).format('HH:mm');
    const post = {
      norm: data.norm,
      nama: data.nama,
      id_jenis_kelamin: data.id_jenis_kelamin,
      nama_ortu: data.nama_ortu,
      nama_panggilan: data.nama_panggilan,
      nama_suami_istri: data.nama_suami_istri,
      alamat: data.alamat,
      rt: data.rt,
      rw: data.rw,
      id_desa: data.id_desa,
      nomor_anggota: data.nomor_anggota,
      id_kelas_penjamin_pasien: data.id_kelas_penjamin_pasien,
      id_kepersertaan: data.id_kepersertaan,
      id_asal_masuk: data.id_asal_masuk,
      id_asal_masuk_detail: data.id_asal_masuk_detail,
      id_penjamin: data.id_penjamin,
      id_unit_layanan: data.id_unit_layanan,
      id_dpjp: data.id_dpjp,
      id_penjamin_pasien: data.id_penjamin_pasien,
      tgl_lahir: dayjs(data.tgl_lahir).format('YYYY-MM-DD'),
      tgl_kunjungan: dayjs(data.tgl_kunjungan).format(
        `YYYY-MM-DD ${jamKunjungan}:ss`
      ),
      tgl_jaminan: dayjs(data.tgl_jaminan).format('YYYY-MM-DD HH:mm:ss'),
      tgl_cetak_jaminan: dayjs(data.tgl_cetak_jaminan).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      id_tindakan: prevPost.id_tindakan.map((item) => item.value),
      id_kelas: data.id_kelas,
      id_kelompok: data.id_kelompok,
      id_instalasi: data.id_instalasi,
      id_kunjungan_asal: data.id_kunjungan_asal || '',
    };

    if (prevPost.id_pasien) {
      post.id_pasien = prevPost.id_pasien;
    }
    if (prevPost.id) {
      post.id = prevPost.id;
    }
    if (prevPost.id_kunjungan_unit) {
      post.id_kunjungan_unit = prevPost.id_kunjungan_unit;
    }

    const method = post.id ? 'koreksi' : 'tambah';
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      const response = yield call(api.save, method, post);
      if (response.status) {
        const showNormModal = yield select(isPasienBaru);
        if (showNormModal) {
          yield put(actions.toggleShowNormModal(meta.resource));
        }
        yield put(actions.save.requestSuccess(resource, response));
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield toastr.warning(getFirstError(errors));
      yield put(actions.save.requestFailure(resource, errors));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleSaveSuccess({ payload }) {
  yield toastr.success(payload.data.message);
}

function* saveFailureHandler({ payload, meta }) {
  let { resource } = meta;
  yield put(
    actions.onFocusElement(resource, getFirstElementError(payload.errors))
  );
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show());
    let { populateForm } = actions;
    let response = yield call(api.init);
    if (response.status) {
      yield put(populateForm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(populateForm.requestFailure(meta.resource, response.message));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* changeSelect2({ meta, payload }) {
  try {
    switch (payload.name) {
      case 'id_unit_layanan':
        yield put(
          actions.optionsByUnitLayanan.request(meta.resource, {
            ...payload.data,
            resetJenisKlasifikasiRegistrasi: true,
          })
        );
        break;
      case 'id_penjamin_pasien':
        yield put(
          actions.settingKelasPenjamin.request(meta.resource, payload.data)
        );
        break;
      default:
        break;
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* asalMasukDetailRequest({ meta, payload }) {
  try {
    let response = yield call(
      api.getAsalMasukDetailOptions,
      payload.data.value
    );
    if (response.status) {
      yield put(
        actions.asalMasukDetail.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.asalMasukDetail.requestFailure(meta.resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* instalasiRequest({ meta, payload }) {
  try {
    let response = yield call(api.getInstalasiOptions, payload.data.value);
    if (response.status) {
      yield put(actions.instalasi.requestSuccess(meta.resource, response.data));
    } else {
      yield put(
        actions.instalasi.requestFailure(meta.resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* unitLayananRequest({ meta, payload }) {
  try {
    let response = yield call(api.getUnitLayananOptions, payload.data.value);
    if (response.status) {
      yield put(
        actions.unitLayanan.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.unitLayanan.requestFailure(meta.resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* optionsByUnitLayananRequestHandler({ meta, payload }) {
  try {
    const prevPost = yield select(getPost);
    let response = yield call(api.getOptionsByUnitLayanan, payload.data.value, {
      id_pasien: prevPost.id_pasien,
    });
    if (response.status) {
      yield put(
        actions.optionsByUnitLayanan.requestSuccess(meta.resource, {
          ...response.data,
          resetJenisKlasifikasiRegistrasi:
            payload.data.resetJenisKlasifikasiRegistrasi,
        })
      );
    } else {
      yield put(
        actions.optionsByUnitLayanan.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* getPasienRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(api.getPasienByNorm, payload.data.norm);
    if (response.status) {
      yield put(actions.getPasien.requestSuccess(meta.resource, response.data));
      const data = response.data;
      if (data) {
        yield put(actions.onSelected(meta.resource, data));
      }
    } else {
      yield put(
        actions.getPasien.requestFailure(meta.resource, response.message)
      );
      messageBox({
        title: 'Info',
        message: response.message,
      });
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* getPasienIbunyaRequestHandler({ meta, payload }) {
  try {
    let response = yield call(api.getPasienByNorm, payload.data.norm);
    if (response.status) {
      yield put(
        actions.getPasienIbunya.requestSuccess(meta.resource, response.data)
      );
      if (response.data) {
        yield put(
          actions.getKunjunganIbunya.request(meta.resource, {
            id: response.data.id,
          })
        );
      }
    } else {
      yield put(
        actions.getPasienIbunya.requestFailure(meta.resource, response.message)
      );
      messageBox({
        title: 'Info',
        message: response.message,
      });
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* getKunjunganIbunyaRequestHandler({ meta, payload }) {
  try {
    const response = yield call(api.getKunjunganAsalIbu, payload.data.id);
    if (response.status) {
      yield put(
        actions.getKunjunganIbunya.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.getKunjunganIbunya.requestFailure(
          meta.resource,
          response.message
        )
      );
      messageBox({
        title: 'Info',
        message: response.message,
      });
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* getKunjunganIbunyaSuccessHandler({ meta }) {
  yield put(
    actions.onFocusElementGabungBayi(meta.resource, 'id_kunjungan_asal_ibu')
  );
}

function* selectedHandler({ meta, payload }) {
  const idPasien = payload.data.id;
  yield put(actions.getPenjaminPasien.request(meta.resource, { idPasien }));
  yield put(actions.getKunjunganTerakhir.request(meta.resource, { idPasien }));
}

function* getKunjunganTerakhirRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(api.getKunjunganTerakhir, payload.data.idPasien);
    if (response.status) {
      yield put(
        actions.getKunjunganTerakhir.requestSuccess(
          meta.resource,
          response.data
        )
      );
      const data = response.data || [];
      if (data.length > 1) {
        yield put(actions.toggleShowCariKunjungan(meta.resource));
      } else {
        if (data[0]) {
          yield put(
            actions.getKunjunganDetail.request(meta.resource, {
              idKunjunganUnit: data[0].id_kunjungan_unit,
            })
          );
        } else {
          yield put(actions.resetKunjunganDetail(meta.resource));
        }
      }
    } else {
      yield put(
        actions.getKunjunganTerakhir.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* getKunjunganDetailRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(
      api.getKunjunganDetail,
      payload.data.idKunjunganUnit
    );
    if (response.status) {
      yield put(
        actions.getKunjunganDetail.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.getKunjunganDetail.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* kunjunganDetailSuccessHandler({ meta, payload }) {
  if (payload.data.kunjungan_unit.unit_layanan.id) {
    yield put(
      actions.optionsByUnitLayanan.request(meta.resource, {
        value: payload.data.kunjungan_unit.unit_layanan.id,
      })
    );
  }

  if (payload.data.id_penjamin) {
    yield put(
      actions.settingKelasPenjamin.request(meta.resource, {
        value: payload.data.id_penjamin,
      })
    );
  }
}

function* getPenjaminPasienRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(api.getPenjaminPasien, payload.data.idPasien);
    if (response.status) {
      yield put(
        actions.getPenjaminPasien.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.getPenjaminPasien.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* loadAllPasien({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    const filters = payload.data.filters;
    if (filters.nama || filters.desa) {
      let response = yield call(api.getAllPasien, payload.data);
      if (response.status) {
        successCallback(response.data, response.recordsTotal);
      } else {
        failCallback();
      }
    } else {
      successCallback([], 0);
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_PASIEN));
}

function* loadAllWilayah({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getAllWilayah, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_WILAYAH));
}

function* loadAllKunjunganHariIni({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getKunjunganHariIni, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_KUNJUNGAN_HARI_INI));
}

function* searchKunjunganHariIniHandler() {
  try {
    yield put(
      datatableActions.onReload(
        staticConst.TABLE_KUNJUNGAN_HARI_INI,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* searchPasienHandler() {
  try {
    yield put(
      datatableActions.onReload(
        staticConst.TABLE_PASIEN,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* selectedPasienHandler({ meta, payload }) {
  yield put(actions.toggleShowCariPasien(meta.resource));
  yield put(actions.onSelected(meta.resource, payload.data));
}

function* selectedKunjunganHandler({ meta, payload }) {
  yield put(actions.toggleShowCariKunjungan(meta.resource));
  yield put(
    actions.getKunjunganDetail.request(meta.resource, {
      idKunjunganUnit: payload.data.id_kunjungan_unit,
    })
  );
}

function* searchWilayahHandler() {
  try {
    yield put(
      datatableActions.onReload(
        staticConst.TABLE_WILAYAH,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* selectedWilayahHandler({ meta }) {
  yield put(actions.toggleShowCariWilayah(meta.resource));
  yield put(actions.onFocusElement(meta.resource, 'id_penjamin_pasien'));
}

function* addHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'nama'));
  yield put(actions.nextNorm.request(meta.resource));
}

function* addSelectedHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'id_asal_masuk'));
}

function* editHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'id_asal_masuk'));
}

function* nextNormRequest({ meta }) {
  try {
    let response = yield call(api.getNextNorm);
    if (response.status) {
      yield put(actions.nextNorm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(
        actions.nextNorm.requestFailure(meta.resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* checkEditHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(
      api.getDetailRangkaianKunjungan,
      payload.data.idKunjunganUnit
    );
    if (response.status) {
      const data = response.data;
      if (data.st_pulang === 1) {
        messageBox({
          title: 'Info',
          message: 'Data tidak bisa dikoreksi, karena kunjungan telah selesai',
        });
      } else {
        yield put(
          actions.getDetailRangkaianKunjungan.requestSuccess(
            meta.resource,
            response.data
          )
        );
        yield put(actions.onEdit(meta.resource));
      }
    } else {
      yield put(
        actions.getDetailRangkaianKunjungan.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* checkDeleteHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(
      api.getDetailRangkaianKunjungan,
      payload.data.idKunjunganUnit
    );
    if (response.status) {
      const data = response.data;
      if (data.st_pulang === 1) {
        messageBox({
          title: 'Info',
          message: 'Data tidak bisa hapus, karena kunjungan telah selesai',
        });
      } else {
        let isValid = false;
        if (data.st_inap === 1) {
          if (
            !data.is_entries_obat &&
            !data.is_entries_erm &&
            !data.is_bayar &&
            !data.is_penunjang_ditanggapi &&
            !data.is_konsul &&
            !data.is_tindakan_lain &&
            !data.is_pindah_kamar
          ) {
            isValid = true;
          }
        } else {
          if (
            !data.is_entries_obat &&
            !data.is_entries_erm &&
            !data.is_bayar &&
            !data.is_penunjang_ditanggapi &&
            !data.is_konsul &&
            !data.is_tindakan_lain &&
            !data.is_kunjungan_asal
          ) {
            isValid = true;
          }
        }

        if (isValid) {
          yield put(
            actions.delete.request(meta.resource, { id: payload.data.id })
          );
        }
      }
    } else {
      yield put(
        actions.getDetailRangkaianKunjungan.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* deleteHandler({ payload, meta }) {
  try {
    yield put(loaderActions.show());
    let post = payload.data;

    let response = yield call(api.delete, { id: post.id });
    if (response.status) {
      yield put(actions.delete.requestSuccess(meta.resource, response));
    } else {
      if (response.info.type === 'warning') {
        yield toastr.warning(response.message);
      } else {
        yield toastr.error(response.message);
      }
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* deleteSuccessHandler({ meta, payload }) {
  try {
    yield toastr.success(payload.data.message);
    const idPasien = payload.data.data.id_pasien;
    yield put(actions.getPenjaminPasien.request(meta.resource, { idPasien }));
    yield put(
      actions.getKunjunganTerakhir.request(meta.resource, { idPasien })
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* settingKelasPenjaminRequestHandler({ meta, payload }) {
  try {
    if (payload.data) {
      const response = yield call(
        api.getSettingKelasPenjamin,
        payload.data.value
      );
      if (response.status) {
        yield put(
          actions.settingKelasPenjamin.requestSuccess(
            meta.resource,
            response.data
          )
        );
      } else {
        yield put(
          actions.settingKelasPenjamin.requestFailure(
            meta.resource,
            response.message
          )
        );
      }
    } else {
      yield put(actions.settingKelasPenjamin.requestSuccess(meta.resource, []));
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* unitLayananKunjunganHariIniRequestHandler({ meta, payload }) {
  try {
    const response = yield call(
      api.getUnitLayananOptions,
      payload.data.instalasi_id
    );
    if (response.status) {
      yield put(
        actions.getUnitLayananKunjunganHariIni.requestSuccess(
          meta.resource,
          response.data
        )
      );
    } else {
      yield put(
        actions.getUnitLayananKunjunganHariIni.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* openMenuStatusPasienHandler() {
  const selectedOption = yield select(getSelectedOption);
  const post = yield select(getPost);
  if (
    !_.isEmpty(selectedOption.id_penjamin_pasien) &&
    (_.isEmpty(post.nomor_anggota) ||
      _.isEmpty(selectedOption.id_kelas_penjamin_pasien))
  ) {
    yield toastr.warning('Lengkapi penjamin pasien');
  }
}

function* checkAddHandler({ payload, meta }) {
  try {
    yield put(loaderActions.show());
    const response = yield call(api.kunjunganAktif, payload.data.idPasien);
    if (response.status) {
      const data = response.data;
      if (data.is_rawat_inap_aktif) {
        messageBox({
          title: 'Info',
          message: i18n.t('masih_ada_rawat_inap_aktif'),
        });
      } else if (data.is_kunjungan_aktif) {
        confirmation({
          title: i18n.t(`common:dialog.confirmation.title`),
          message: i18n.t(`${meta.resource}:masih_ada_kunjungan_aktif`),
          buttons: [
            i18n.t(`common:dialog.action.yes`),
            i18n.t(`common:dialog.action.no`),
          ],
          onOk: payload.data.callBack,
          onCancel: payload.data.cancelCallBack,
        });
      }
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
  }
}

function* checkSaveHandler({ payload, meta }) {
  try {
    yield put(loaderActions.show());
    const response = yield call(
      api.kunjunganAktif,
      payload.data.idPasien,
      payload.data.idUnitLayanan
    );
    if (response.status) {
      confirmation({
        title: i18n.t(`common:dialog.confirmation.title`),
        message: i18n.t(`${meta.resource}:masih_ada_kunjungan_aktif`),
        buttons: [
          i18n.t(`common:dialog.action.yes`),
          i18n.t(`common:dialog.action.no`),
        ],
        onOk: payload.data.callBack,
      });
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
  }
}

function* gabungBayiHandler({ payload, meta }) {
  const { resource } = meta;
  try {
    const { rules, messages } = api.gabungBayiValidationRules(resource);
    let errors = validator(payload.data, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      const response = yield call(api.saveKunjunganIbunya, payload.data);
      if (response.status) {
        yield put(
          actions.saveKunjunganIbuNya.requestSuccess(resource, response)
        );
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield toastr.warning(getFirstError(errors));
      yield put(actions.saveKunjunganIbuNya.requestFailure(resource, errors));
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* gabungBayiSuccessHandler({ payload }) {
  yield toastr.success(payload.data.message);
}

function* gabungBayiFailureHandler({ payload, meta }) {
  let { resource } = meta;
  yield put(
    actions.onFocusElementGabungBayi(
      resource,
      getFirstElementError(payload.errors)
    )
  );
}

function* showGabungKunjunganIbuDanBayiHandler({ meta }) {
  const post = yield select(getPost);
  const { show } = yield select(menggabungkanKunjunganIbuDanBayiSelector);
  if (show) {
    yield put(
      actions.checkKunjunganIbunya.request(meta.resource, {
        id: post.id,
      })
    );
  }
}

function* checkKunjunganIbuDanBayiRequestHandler({ meta, payload }) {
  try {
    let response = yield call(api.getKunjunganIbu, payload.data.id);
    if (response.status) {
      yield put(
        actions.checkKunjunganIbunya.requestSuccess(
          meta.resource,
          response.data
        )
      );
      if (!response.data) {
        yield put(actions.onFocusElementGabungBayi(meta.resource, 'norm'));
      }
    } else {
      yield put(
        actions.checkKunjunganIbunya.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* resetGabungBayiHandler({ payload, meta }) {
  const { resource } = meta;
  try {
    const response = yield call(
      api.resetKunjunganIbunya,
      payload.data.id_kunjungan
    );
    if (response.status) {
      yield put(
        actions.deleteKunjunganIbuNya.requestSuccess(resource, response)
      );
    } else {
      yield put(
        actions.deleteKunjunganIbuNya.requestFailure(resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* resetGabungBayiSuccessHandler({ meta, payload }) {
  yield toastr.success(payload.data.message);
  yield put(actions.onFocusElementGabungBayi(meta.resource, 'norm'));
}

export default function* watchAuthActions() {
  yield all([
    takeLatest(actionTypes.CHECK_EDIT, checkEditHandler),
    takeLatest(actionTypes.ADD, addHandler),
    takeLatest(actionTypes.ADD_WITH_SELECTED, addSelectedHandler),
    takeLatest(actionTypes.SAVE_REQUEST, handleSave),
    takeLatest(actionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(actionTypes.SAVE_FAILURE, saveFailureHandler),
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
    takeLatest(actionTypes.CHANGE_SELECT2, changeSelect2),
    takeLatest(actionTypes.ASAL_MASUK_DETAIL_REQUEST, asalMasukDetailRequest),
    takeLatest(actionTypes.INSTALASI_REQUEST, instalasiRequest),
    takeLatest(actionTypes.UNIT_LAYANAN_REQUEST, unitLayananRequest),
    takeLatest(
      actionTypes.GET_UNITLAYANAN_KUNJUNGAN_HARI_INI_REQUEST,
      unitLayananKunjunganHariIniRequestHandler
    ),
    takeLatest(
      actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST,
      optionsByUnitLayananRequestHandler
    ),
    takeLatest(actionTypes.NEXT_NORM_REQUEST, nextNormRequest),
    takeLatest(actionTypes.GET_PASIEN_REQUEST, getPasienRequestHandler),
    takeLatest(
      actionTypes.GET_PASIEN_IBUNYA_REQUEST,
      getPasienIbunyaRequestHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_IBUNYA_REQUEST,
      getKunjunganIbunyaRequestHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_TERAKHIR_REQUEST,
      getKunjunganTerakhirRequestHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST,
      getKunjunganDetailRequestHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS,
      kunjunganDetailSuccessHandler
    ),
    takeLatest(
      actionTypes.GET_PENJAMIN_PASIEN_REQUEST,
      getPenjaminPasienRequestHandler
    ),
    takeLatest(actionTypes.SELECTED, selectedHandler),

    takeLatest(actionTypes.GET_ALL_PASIEN_REQUEST, loadAllPasien),
    takeLatest(actionTypes.FILTER_SUBMIT_PASIEN, searchPasienHandler),
    takeLatest(actionTypes.GET_ALL_WILAYAH_REQUEST, loadAllWilayah),
    takeLatest(actionTypes.FILTER_SUBMIT_WILAYAH, searchWilayahHandler),
    takeLatest(actionTypes.FILTER_SELECTED_PASIEN, selectedPasienHandler),
    takeLatest(actionTypes.FILTER_SELECTED_WILAYAH, selectedWilayahHandler),
    takeLatest(actionTypes.FILTER_SELECTED_KUNJUNGAN, selectedKunjunganHandler),
    takeLatest(actionTypes.DELETE_REQUEST, deleteHandler),
    takeLatest(actionTypes.DELETE_SUCCESS, deleteSuccessHandler),
    takeLatest(actionTypes.CHECK_DELETE, checkDeleteHandler),
    takeLatest(actionTypes.CHECK_ADD, checkAddHandler),
    takeLatest(actionTypes.CHECK_SAVE, checkSaveHandler),
    takeLatest(actionTypes.EDIT, editHandler),
    takeLatest(
      actionTypes.GET_SETTING_KELAS_PENJAMIN_REQUEST,
      settingKelasPenjaminRequestHandler
    ),
    takeLatest(
      actionTypes.GET_ALL_KUNJUNGAN_HARI_INI_REQUEST,
      loadAllKunjunganHariIni
    ),
    takeLatest(
      actionTypes.FILTER_SUBMIT_KUNJUNGAN_HARI_INI,
      searchKunjunganHariIniHandler
    ),
    takeLatest(
      actionTypes.OPEN_MENU_STATUS_PASIEN,
      openMenuStatusPasienHandler
    ),
    takeLatest(actionTypes.SAVE_KUNJUNGAN_IBUNYA_REQUEST, gabungBayiHandler),
    takeLatest(
      actionTypes.SAVE_KUNJUNGAN_IBUNYA_SUCCESS,
      gabungBayiSuccessHandler
    ),
    takeLatest(
      actionTypes.TOGGLE_SHOW_MENGGABUNGKAN_KUNJUNGAN_ANAK_IBU,
      showGabungKunjunganIbuDanBayiHandler
    ),
    takeLatest(
      actionTypes.CHECK_KUNJUNGAN_IBUNYA_REQUEST,
      checkKunjunganIbuDanBayiRequestHandler
    ),
    takeLatest(
      actionTypes.DELETE_KUNJUNGAN_IBUNYA_REQUEST,
      resetGabungBayiHandler
    ),
    takeLatest(
      actionTypes.DELETE_KUNJUNGAN_IBUNYA_SUCCESS,
      resetGabungBayiSuccessHandler
    ),
    takeLatest(
      actionTypes.SAVE_KUNJUNGAN_IBUNYA_FAILURE,
      gabungBayiFailureHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_IBUNYA_SUCCESS,
      getKunjunganIbunyaSuccessHandler
    ),
  ]);
}
