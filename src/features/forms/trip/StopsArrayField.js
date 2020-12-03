import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, useFormikContext } from 'formik';
import React, { useState } from 'react';
import FieldWithErrors from '../fieldWithErrors';
import { AddItemButton, FieldsGroup, Input } from '../FormsStyles';

const StopsArrayField = ({ items }) => {
  const [stops, setStops] = useState(items);

  return (
    <>
      {stops.map((stop, index) => {
        const labels = [
          'Początek trasy',
          ...stops.map((s, i) => 'Przystanek ' + i).slice(1, -1),
          'Koniec trasy'
        ];

        return (
          <React.Fragment key={stop.label + index}>
            <FieldsGroup>
              <FieldWithErrors
                label={labels[index]}
                name={`stops[${index}].place`}
              >
                <Input
                  type='text'
                  placeholder='Przebieg'
                  value={stops[index].place}
                />
              </FieldWithErrors>
              <FieldWithErrors name={`stops[${index}].mileage`}>
                <Input
                  type='number'
                  placeholder='distance'
                  value={stops[index].mileage}
                />
              </FieldWithErrors>
              <FieldWithErrors name={`stops[${index}].distance`}>
                <Input
                  type='number'
                  placeholder='Przebieg'
                  value={stops[index].distance}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value);
                    stops[index].distance = value;
                  }}
                />
              </FieldWithErrors>
            </FieldsGroup>
            {index === stops.length - 2 && (
              <AddItemButton
              //   onClick={() => {
              //     insert(values.stops.length - 1, {
              //       label: `Przystanek ${index + 1}`,
              //       place: ``,
              //       distance: 0,
              //       mileage: values.stops[index].mileage
              //     });
              //   }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                <span> Dodaj przystanek </span>
              </AddItemButton>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default StopsArrayField;
