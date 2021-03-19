import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, useFormikContext } from 'formik';
import {
  AddItemButton,
  MileageFieldsGroup,
  RemoveItemButton,
  StyledField,
} from '../FormsStyles';
import FieldWithErrors from '../fieldWithErrors';
import DistanceInput from './DistanceInput';
import MileageInput from './MileageInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { refreshStopsMileage } from '../../../utils/trips';

const StopsList = ({ isTemplate }) => {
  const {
    values: { stops },
    setFieldValue,
  } = useFormikContext();
  return (
    <FieldArray name='stops'>
      {({ remove, insert }) => {
        const labels = [
          'Początek trasy',
          ...stops.map((s, i) => 'Przystanek ' + i).slice(1, -1),
          'Koniec trasy',
        ];

        return stops.map((stop, index) => (
          <React.Fragment key={labels[index]}>
            <MileageFieldsGroup>
              <FieldWithErrors
                name={`stops[${index}].place`}
                label={labels[index]}
                scrollFocused
              >
                <StyledField type='text' placeholder='Miejsce' />
              </FieldWithErrors>

              {isTemplate ? (
                <FieldWithErrors
                  name={`stops[${index}].distance`}
                  scrollFocused
                >
                  <StyledField type='number' disabled={index === 0} min={0} />
                </FieldWithErrors>
              ) : (
                <>
                  <FieldWithErrors
                    name={`stops[${index}].mileage`}
                    scrollFocused
                  >
                    <MileageInput index={index} type='number' min='0' />
                  </FieldWithErrors>
                  <FieldWithErrors
                    name={`stops[${index}].distance`}
                    scrollFocused
                  >
                    {index === 0 ? (
                      <StyledField value={0} type='number' disabled />
                    ) : (
                      <DistanceInput index={index} type='number' min='0' />
                    )}
                  </FieldWithErrors>
                </>
              )}

              {index >= 1 && index < stops.length - 1 && (
                <RemoveItemButton
                  type='button'
                  onClick={() => {
                    if (isTemplate) {
                      const newStops = stops.filter((item, i) => i !== index);
                      setFieldValue(
                        'stops',
                        refreshStopsMileage(newStops[0].mileage, newStops),
                      );
                    } else {
                      remove(index);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </RemoveItemButton>
              )}
            </MileageFieldsGroup>
            {index === stops.length - 2 && (
              <AddItemButton
                type='button'
                onClick={() => {
                  insert(stops.length - 1, {
                    label: `Przystanek ${index + 1}`,
                    place: ``,
                    distance: 0,
                    ...(!isTemplate && { mileage: stops[index].mileage }),
                  });
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                <span> Dodaj przystanek </span>
              </AddItemButton>
            )}
          </React.Fragment>
        ));
      }}
    </FieldArray>
  );
};

StopsList.propTypes = {
  isTemplate: PropTypes.bool,
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      distance: PropTypes.number,
      mileage: PropTypes.number,
      place: PropTypes.string,
    }),
  ),
};

export default StopsList;
