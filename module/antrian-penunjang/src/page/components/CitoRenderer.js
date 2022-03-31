import React from 'react';
import { Label } from 'semantic-ui-react';

export default ({value}) => (
  <Label circular color="green">
    {value === 1 ? 'Ya' : 'Tidak'}
  </Label>
);
