import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Checkbox } from 'semantic-ui-react';
import Select from 'react-select';
import _ from 'lodash';
import rawDataSource from './DataItemOptionsSource';
import { dataComponentChange } from '../../reducer/item';

export default function DataItemComponent() {
  const dispatch = useDispatch();
  const { dataComponent } = useSelector((state) => state.item);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (dataSource.length === 0) {
      let tempDataSource = [];
      rawDataSource.map((v, i) => {
        let options = [];
        v.children.map((v2, i2) => {
          options.push({
            key: `${i}.${i2}`,
            label: v2.text,
            value: v2.value,
            parent: v.text,
          });
        });
        tempDataSource.push({ key: `${i}`, label: v.text, options: options });
      });
      setDataSource(tempDataSource);
    }
  }, []);

  return (
    <>
      <Form.Field>
        <label>
          Diambil dari{' '}
          {Object.keys(dataComponent.value).length > 0 &&
            `: ${dataComponent?.value?.parent} - ${dataComponent?.value?.label}`}
        </label>
        <Select
          menuPlacement="top"
          options={dataSource}
          value={dataComponent.value}
          styles={{
            menu: (provided, state) => ({
              ...provided,
              cursor: 'pointer',
              border: '1px solid gray',
            }),
            groupHeading: (provided, state) => ({
              ...provided,
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 1)',
              margin: 0,
              paddingBottom: 10,
              borderBottom: '0.15px dashed gray',
            }),
            option: (provided, state) => ({
              ...provided,
              margin: 0,
              paddingLeft: 40,
              cursor: 'pointer',
              borderBottom: '0.15px dashed gray',
            }),
          }}
          onChange={(e) => {
            dispatch(
              dataComponentChange({
                ...dataComponent,
                value: e,
              })
            );
            console.log(e);
          }}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label={`Tanpa nilai kosong: "Belum ada pemeriksaan"`}
          checked={1 === dataComponent.nilaiKosong ? true : false}
          onChange={() =>
            dispatch(
              dataComponentChange({
                ...dataComponent,
                nilaiKosong: +!dataComponent.nilaiKosong,
              })
            )
          }
        />
      </Form.Field>
      <Form.Field>
        <div>Keterangan:</div>
        <div className="pl-5">
          Multi Select Row : Bisa memilih lebih dari 1 row
        </div>
        <div className="pl-5">
          Select Cell : Pilih data per-sel, maksimal hanya 1 row
        </div>
      </Form.Field>
    </>
  );
}
