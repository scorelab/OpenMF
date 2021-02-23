import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const Dropdown = ({ name, label, options = [], onChange }) => {
  return (
    <InputGroup className='my-3'>
      <InputGroup.Prepend>
        <p className='lead mr-3'>{label}</p>
      </InputGroup.Prepend>
      <FormControl name={name} as='select' onChange={onChange}>
        {options.map(element => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </FormControl>
    </InputGroup>
  );
};

export default Dropdown;
