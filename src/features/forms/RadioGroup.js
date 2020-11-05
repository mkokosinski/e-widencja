import { Field } from 'formik';
import React from 'react';
import { GroupItem, RadioButton, RadioControl } from './FormsStyles';

const RadioGroup = ({ items, name }) => {
  return (
    <>
      {items.map((item, index) => (
        <GroupItem>
          <RadioButton htmlFor={item + index}>
            {item}
            <Field type='radio' name={name} value={item} id={item + index} />

            <RadioControl>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                aria-hidden='true'
                focusable='false'
              >
                <path d='M1.73 12.91l6.37 6.37L22.79 4.59' />
              </svg>
            </RadioControl>
          </RadioButton>
        </GroupItem>
      ))}
    </>
  );
};

export default RadioGroup;
