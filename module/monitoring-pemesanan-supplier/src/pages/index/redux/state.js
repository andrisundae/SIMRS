import dayjs from 'dayjs';
import { dateFormatDB } from '@simrs/common/src/utils';

const masterState = {
  filter: {
    tgl_awal: dayjs().toDate(),
    tgl_akhir: dayjs().toDate(),
    tglAwal: dateFormatDB(dayjs().toDate()),
    tglAkhir: dateFormatDB(dayjs().toDate()),
    idSupplier: '',
    supplier: '',
    idUnitPemesan: '',
    unitPemesan: '',
  },
  data: {
    listData: [],
    options: {
      supplier: [],
      unitPemesan: [],
    },
  },
  focusElement: '',
};

export { masterState };
