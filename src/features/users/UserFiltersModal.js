import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import Checkbox from '../forms/checkbox';

import {
  filterDefaults,
  selectFilters,
  setFilter
} from '../templates/filterSlice';
import FieldWithErrors from '../forms/fieldWithErrors';

import { FilterContainer } from '../templates/ListView/ListViewStyles';

import { ButtonsContainer, Row } from '../forms/FormsStyles';
import { Formik } from 'formik';
import {
  ButtonBorderedSeconderySoft,
  ButtonMain
} from '../layout/LayoutStyles';
import { selectUsers } from './usersSlice';

const UserFiltersModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { userFilter, userDriverFilter } = useSelector(selectFilters);
  const { items: users } = useSelector(selectUsers);

  console.log(userFilter, userDriverFilter);

  const usernameItems = [
    filterDefaults.userFilter,
    ...users.map((user) => ({ label: user.fullName, value: user.id }))
  ];

  const initValues = {
    userFilter: userFilter.filter,
    userDriverFilter: userDriverFilter.filter
  };

  const handleSubmit = (values) => {
    dispatch(setFilter(values));
    closeModal();
  };

  return (
    <FilterContainer>
      <Formik onSubmit={handleSubmit} initialValues={initValues}>
        {({ values, submitForm, setFieldTouched, setFieldValue }) => (
          <>
            <Row>
              <FieldWithErrors name='userFilter' label='Użytkownik'>
                <Select
                  defaultValue={values.userFilter}
                  options={usernameItems}
                  placeholder='Kogo szukasz?'
                  onChange={(filter) => {
                    setFieldValue('userFilter', filter);
                    setFieldTouched('userFilter');
                  }}
                />
              </FieldWithErrors>
            </Row>
            <Row>
              <Checkbox name='userDriverFilter' label='Kierowca' />
            </Row>
            <Row>
              <ButtonsContainer>
                <ButtonMain onClick={submitForm}>Zapisz</ButtonMain>
                <ButtonBorderedSeconderySoft onClick={closeModal}>
                  Anuluj
                </ButtonBorderedSeconderySoft>
              </ButtonsContainer>
            </Row>
          </>
        )}
      </Formik>
    </FilterContainer>
  );
};

export default UserFiltersModal;
