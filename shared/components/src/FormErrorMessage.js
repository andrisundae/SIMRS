import React from 'react';
import {Transition} from 'semantic-ui-react';

function FormErrorMessage({message}) {
  return (
    <Transition.Group animation="fade down" duration={300}>
      <div className='mt-1' style={{ color: '#9f3a38', fontSize: '.85714286rem' }}>
        {message}
      </div>
    </Transition.Group>
  );
}

export default FormErrorMessage;
