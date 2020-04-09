import React from 'react';

function TextBox(props) {
  let { ...attributes } = props;
  return (
    <input style={{ backgroundColor: 'red' }} type="text" {...attributes} />
  );
}

export default TextBox;
