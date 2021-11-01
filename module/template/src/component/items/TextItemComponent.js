import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Radio, Select, Input } from 'semantic-ui-react';
import { textComponentChange } from '../../reducer/item';

export default function TextItemComponent() {
  const dispatch = useDispatch();
  const { textComponent } = useSelector((state) => state.item);
  const format = textComponent.format;
  const textFormat = textComponent.textFormat;
  const dateTimeFormat = textComponent.dateTimeFormat;

  console.log(textComponent);

  function renderDateTimeRadio(obj) {
    let style = obj?.style ? obj.style : {},
      className = obj?.className ? obj.className : '',
      name = obj?.name ? obj.name : 'yesterday';

    return (
      <div className={className} style={style}>
        <Radio
          label={obj.label}
          name={name}
          value={obj.value}
          checked={dateTimeFormat === obj.value}
          onChange={(e, { value }) =>
            obj?.onChange && obj.onChange.constructor === Function
              ? obj.onChange(value)
              : {}
          }
        />
      </div>
    );
  }

  function renderFormatItems() {
    switch (format) {
      case 'date':
      case 'date_time':
        return (
          <>
            {renderDateTimeRadio({
              className: 'mb-2',
              label: 'Dapat memilih semua tanggal',
              value: '0',
              onChange: (value) =>
                dispatch(
                  textComponentChange({
                    ...textComponent,
                    dateTimeFormat: value,
                  })
                ),
            })}
            {renderDateTimeRadio({
              className: 'mb-2',
              label: 'Dapat memilih satu hari sebelumnya',
              value: '1',
              onChange: (value) =>
                dispatch(
                  textComponentChange({
                    ...textComponent,
                    dateTimeFormat: value,
                  })
                ),
            })}
            {renderDateTimeRadio({
              className: 'mb-2',
              label: 'Dapat memilih mulai dari tanggal MRS',
              value: '2',
              onChange: (value) =>
                dispatch(
                  textComponentChange({
                    ...textComponent,
                    dateTimeFormat: value,
                  })
                ),
            })}
            {renderDateTimeRadio({
              className: 'mb-2',
              label: 'Dapat memilih mulai dari tanggal MRS sampai tanggal KRS',
              value: '3',
              onChange: (value) =>
                dispatch(
                  textComponentChange({
                    ...textComponent,
                    dateTimeFormat: value,
                  })
                ),
            })}
          </>
        );

      case 'time':
        return null;

      default:
        return (
          <>
            <Form.Field>
              <label>Panjang Karakter</label>
              <Input
                type="number"
                value={textFormat.panjangKarakter}
                onChange={(e, { value }) =>
                  dispatch(
                    textComponentChange({
                      ...textComponent,
                      textFormat: {
                        ...textFormat,
                        panjangKarakter: value,
                      },
                    })
                  )
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Jumlah Baris</label>
              <Input
                type="number"
                value={textFormat.jumlahBaris}
                onChange={(e, { value }) =>
                  dispatch(
                    textComponentChange({
                      ...textComponent,
                      textFormat: {
                        ...textFormat,
                        jumlahBaris: value,
                      },
                    })
                  )
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Satuan</label>
              <Input
                value={textFormat.satuan}
                onChange={(e, { value }) =>
                  dispatch(
                    textComponentChange({
                      ...textComponent,
                      textFormat: {
                        ...textFormat,
                        satuan: value,
                      },
                    })
                  )
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Placeholder</label>
              <Input
                value={textFormat.placeholder}
                onChange={(e, { value }) =>
                  dispatch(
                    textComponentChange({
                      ...textComponent,
                      textFormat: {
                        ...textFormat,
                        placeholder: value,
                      },
                    })
                  )
                }
              />
              <div className="mt-2 text-gray-500">
                Teks yang muncul saat isian masih kosong
              </div>
            </Form.Field>
          </>
        );
    }
  }

  return (
    <>
      <Form.Field>
        <label>Format</label>
        <Select
          defaultValue={format}
          options={[
            { key: 0, value: 'text', text: 'Text' },
            { key: 1, value: 'date', text: 'Date' },
            { key: 2, value: 'time', text: 'Time' },
            { key: 3, value: 'date_time', text: 'Date Time' },
          ]}
          onChange={(e, { value }) =>
            dispatch(
              textComponentChange({
                ...textComponent,
                format: value,
              })
            )
          }
        />
      </Form.Field>
      {renderFormatItems()}
    </>
  );
}
