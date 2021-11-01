import React, { useEffect } from 'react';
import TemplateFormComponentHelper from './TemplateFormComponentHelper';

export default function TemplateFormComponent(props) {
  useEffect(() => {}, []);

  switch (props.type) {
    case 'label':
      return null;

    case 'label_with_checkbox':
      return null;

    case 'text':
      return null;

    case 'text_with_unit':
      return null;

    case 'dropdown':
      return null;

    case 'dropdown_from_data':
      return null;

    case 'checkbox':
      return null;

    case 'radio':
      return null;

    case 'multiple':
      return null;

    case 'data':
      return TemplateFormComponentHelper.DataSourceComponent(
        props,
        props.source
      );

    default:
      return null;
  }
}
