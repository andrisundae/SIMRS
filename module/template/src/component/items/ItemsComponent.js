import React from 'react';
import LabelItemComponent from './LabelItemComponent';
import TextItemComponent from './TextItemComponent';
import DropdownItemComponent from './DropdownItemComponent';
import DropdownDBItemComponent from './DropdownDBItemComponent';
import CheckboxItemComponent from './CheckboxItemComponent';
import RadioItemComponent from './RadioItemComponent';
import MultipleItemComponent from './MultipleItemComponent';
import DataItemComponent from './DataItemComponent';

export default function ItemsComponent({ tipe }) {
  function renderDynamicComponent() {
    switch (tipe) {
      case 'text':
        return <TextItemComponent />;

      case 'dropdown':
        return <DropdownItemComponent />;

      case 'dropdown_form_data':
        return <DropdownDBItemComponent />;

      case 'checkbox':
        return <CheckboxItemComponent />;

      case 'radio':
        return <RadioItemComponent />;

      case 'multiple':
        return <MultipleItemComponent />;

      case 'data':
        return <DataItemComponent />;

      default:
        return <LabelItemComponent />;
    }
  }

  return <>{renderDynamicComponent()}</>;
}
