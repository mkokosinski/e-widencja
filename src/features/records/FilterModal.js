import { format } from 'date-fns';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import DateInput, { DATEPICKER_TYPES } from '../../components/Form/DateInput';
import FieldWithErrors from '../../components/Form/fieldWithErrors';
import {
  filterDefaults,
  selectFilters,
  setFilter,
} from '../templates/filterSlice';
import { selectSortedVehicles } from '../vehicles/redux/vehiclesSlice';

import { ButtonsContainer, Row } from '../../components/Form/FormsStyles';
import { ButtonBordered, ButtonMain } from '../layout/LayoutStyles';
import { ModalContent } from '../templates/ListView/ListViewStyles';

const FilterModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { dateFilter, vehicleFilter } = useSelector(selectFilters);
  const { items: vehicles } = useSelector(selectSortedVehicles);
  // const minDate = useSelector(selectEldestDate);

  const sortedItems = [
    filterDefaults.vehicleFilter,
    ...vehicles.map((veh) => ({ label: veh.name, value: veh.id })),
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    const formatedValue = {
      vehicleFilter: values.vehicleFilter,
      dateFilter: {
        from: format(values.dateFrom, 'yyyy-MM-dd'),
        to: format(values.dateTo, 'yyyy-MM-dd'),
      },
    };
    dispatch(setFilter(formatedValue));
    closeModal();
  };

  const initValues = {
    vehicleFilter: vehicleFilter.filter,
    dateFrom: new Date(dateFilter.filter.from),
    dateTo: new Date(dateFilter.filter.to),
  };

  return (
    <ModalContent>
      <Formik onSubmit={handleSubmit} initialValues={initValues}>
        {({ values, submitForm, setFieldTouched, setFieldValue }) => (
          <>
            <Row>
              <FieldWithErrors name='vehicleFilter' label='Pojazd'>
                <Select
                  defaultValue={values.vehicleFilter}
                  options={sortedItems}
                  placeholder='Wybierz pojazd'
                  onChange={(filter) => {
                    setFieldValue('vehicleFilter', filter);
                    setFieldTouched('vehicleFilter');
                  }}
                  menuShouldScrollIntoView
                />
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='dateFrom' label='Data od'>
                <DateInput
                  dateFormat='yyyy-MM'
                  defaultDate={values.dateFrom}
                  onChange={(date) => {
                    setFieldValue('dateFrom', new Date(date));
                    setFieldTouched('dateFrom');
                  }}
                  isRange
                  rangeStart
                  startDate={values.dateFrom}
                  endDate={values.dateTo}
                  type={DATEPICKER_TYPES.monthpicker}
                />
              </FieldWithErrors>
              <FieldWithErrors name='dateTo' label='Data do'>
                <DateInput
                  dateFormat='yyyy-MM'
                  onChange={(date) => {
                    setFieldValue('dateTo', new Date(date));
                    setFieldTouched('dateTo');
                  }}
                  defaultDate={values.dateTo}
                  isRange
                  rangeEnd
                  startDate={values.dateFrom}
                  endDate={values.dateTo}
                  type={DATEPICKER_TYPES.monthpicker}
                />
              </FieldWithErrors>
            </Row>
            <Row>
              <ButtonsContainer>
                <ButtonMain type='button' onClick={submitForm}>
                  Zapisz
                </ButtonMain>
                <ButtonBordered type='button' onClick={closeModal}>
                  Anuluj
                </ButtonBordered>
              </ButtonsContainer>
            </Row>
          </>
        )}
      </Formik>
    </ModalContent>
  );
};

export default FilterModal;
