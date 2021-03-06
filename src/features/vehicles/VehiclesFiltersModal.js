import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';

import {
  filterDefaults,
  selectFilters,
  setFilter,
} from '../templates/filterSlice';
import FieldWithErrors from '../../components/Form/fieldWithErrors';

import { ModalContent } from '../templates/ListView/ListViewStyles';

import { ButtonsContainer, Row } from '../../components/Form/FormsStyles';
import { Formik } from 'formik';
import { ButtonBordered, ButtonMain } from '../layout/LayoutStyles';
import { selectCarBrands, selectSortedVehicles } from './redux/vehiclesSlice';

const FilterModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { vehicleFilter, carBrandFilter } = useSelector(selectFilters);
  const { items: vehicles } = useSelector(selectSortedVehicles);
  const brands = useSelector(selectCarBrands);

  const carBrandItems = [
    filterDefaults.carBrandFilter,
    ...brands.map((brand) => ({ label: brand, value: brand })),
  ];

  const vehicleItems = [
    filterDefaults.vehicleFilter,
    ...vehicles.map((veh) => ({ label: veh.name, value: veh.id })),
  ];

  const initValues = {
    vehicleFilter: vehicleFilter.filter,
    carBrandFilter: carBrandFilter.filter,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(setFilter(values));
    closeModal();
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
                  options={vehicleItems}
                  placeholder='Wybierz pojazd'
                  onChange={(filter) => {
                    setFieldValue('vehicleFilter', filter);
                    setFieldTouched('vehicleFilter');
                  }}
                />
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='carBrandFilter' label='Marka'>
                <Select
                  defaultValue={values.carBrandFilter}
                  options={carBrandItems}
                  placeholder='Wybierz markę'
                  onChange={(filter) => {
                    setFieldValue('carBrandFilter', filter);
                    setFieldTouched('carBrandFilter');
                  }}
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
