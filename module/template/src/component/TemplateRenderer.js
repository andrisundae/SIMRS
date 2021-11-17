import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Form } from 'semantic-ui-react';
import FormComponent from './TemplateFormComponent';

export default function TemplateRenderer({
  templateUrlProps,
  formType,
  templateProps,
}) {
  const [templateUrl, setTemplateUrl] = useState(
    undefined !== templateUrlProps ? templateUrlProps : ''
  );
  const [template, setTemplate] = useState([]);
  const [templateDetails, setTemplateDetails] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (templateUrlProps !== templateUrl) {
      setTemplateUrl(templateUrlProps);
      loadData();
    }
  }, [templateUrlProps, templateUrl]);

  function loadData() {
    console.log('Under Construction!');
    setTemplateDetails({
      '219001': {
        label: 'Diagnosis ICD IX',
        referensi: '',
        style: {
          font_size: '14',
        },
        type: 'data',
        source: 'master_diagnosis_ix_all_multiselect',
        kodeTree: '001',
        kode: '219001',
        children: null,
      },
      '219002': {
        label: 'Anamnesis',
        referensi: '',
        style: {
          font_size: '14',
          bold: 'true',
          italic: 'true',
          underline: 'true',
        },
        type: 'data',
        source: 'anamnesis_medis',
        kodeTree: '002',
        kode: '219002',
        children: null,
      },
      '219003': {
        label: 'Anamnesis (Cell)',
        referensi: '',
        style: {
          font_size: '14',
        },
        type: 'data',
        source: 'anamnesis_all_selective',
        kode: '219003',
        kodeTree: '003',
        children: null,
      },
    });
  }

  function generateComponent(component, key) {
    switch (component.type) {
      case 'label':
        return (
          <FormComponent
            form={formType}
            type="label"
            label={component.label}
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'label_with_checkbox':
        return (
          <FormComponent
            form={formType}
            type={component.type}
            name={component.name}
            label={component.label}
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'text':
        return (
          <FormComponent
            form={formType}
            type={component.type}
            name={component.name}
            label={component.label}
            format={
              'undefined' !== typeof component.format ? component.format : false
            }
            length={'' !== component.length ? component.length : false}
            placeholder={
              'undefined' !== typeof component.placeholder
                ? component.placeholder
                : ''
            }
            rows={'undefined' !== typeof component.rows ? component.rows : 0}
            yesterday={
              'undefined' !== typeof component.yesterday
                ? component.yesterday
                : -1
            }
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
            dateTimeDefaultValue={
              'undefined' !== typeof component.dateTimeDefaultValue
                ? component.dateTimeDefaultValue
                : moment(window.server.now, 'YYYY-MM-DD HH:mm:ss')
            }
          />
        );

      case 'text_with_unit':
        return (
          <FormComponent
            form={formType}
            type={component.type}
            name={component.name}
            label={component.label}
            length={'' !== component.length ? component.length : false}
            placeholder={
              'undefined' !== typeof component.placeholder
                ? component.placeholder
                : ''
            }
            unit={component.unit}
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'dropdown':
        return (
          <FormComponent
            form={formType}
            type="dropdown"
            name={component.name}
            label={component.label}
            options={component.options}
            placeholder={
              'undefined' !== typeof component.placeholder
                ? component.placeholder
                : ''
            }
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'dropdown_from_data':
        return (
          <FormComponent
            form={formType}
            type="dropdown_from_data"
            name={component.name}
            label={component.label}
            source={component.source}
            placeholder={
              'undefined' !== typeof component.placeholder
                ? component.placeholder
                : ''
            }
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'checkbox':
        return (
          <FormComponent
            form={formType}
            type={component.type}
            label={component.label}
            options={component.options}
            horizontal={
              'undefined' !== typeof component.horizontal
                ? component.horizontal
                : false
            }
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'radio':
        return (
          <FormComponent
            form={formType}
            type={component.type}
            name={component.name}
            label={component.label}
            options={component.options}
            horizontal={
              'undefined' !== typeof component.horizontal
                ? component.horizontal
                : false
            }
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'multiple':
        return (
          <FormComponent
            form={formType}
            type={component.type}
            name={component.name}
            label={component.label}
            length={'' !== component.length ? component.length : false}
            placeholder={
              'undefined' !== typeof component.placeholder
                ? component.placeholder
                : ''
            }
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      case 'data':
        return (
          <FormComponent
            form={formType}
            key={key}
            type={component.type}
            name={component.name}
            source={component.source}
            label={component.label}
            level={component.level}
            style={
              'undefined' !== typeof component.style ? component.style : {}
            }
          />
        );

      default:
        return null;
    }
  }

  function generateTemplate(templateDetails, level) {
    var headingOtomatis =
        'template' === formType
          ? templateProps.headingOtomatis
          : template.headingOtomatis,
      templateNodes = [];

    _.sortBy(templateDetails, ['kodeTree']).forEach((item, key) => {
      let { kode, kodeTree, ...component } = item;

      component.name = kode;
      component.level = level;

      if ('undefined' === typeof component.label) {
        component.label = _.capitalize(key);
      }

      if (1 === headingOtomatis) {
        component.style = { heading: 'h' + (level + 1) };
      }

      if (
        'text' === component.type &&
        -1 < ['date', 'time', 'datetime'].indexOf(component.format)
      ) {
        component.dateTimeDefaultValue = item.dateTimeDefaultValue;
      }

      templateNodes.push(generateComponent(component, key));

      if (null !== component.children) {
        templateNodes.push(generateTemplate(component.children, level + 1));
      }
    });

    return templateNodes;
  }

  var templateNodes = [];

  templateNodes.push(
    <ul key="0" className="list-group">
      <li className="list-group-item">
        {generateTemplate(templateDetails, 0)}
      </li>
    </ul>
  );

  return <Form>{templateNodes}</Form>;
}
