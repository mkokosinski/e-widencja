import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { toast } from 'react-toastify';

import FieldWithErrors from '../fieldWithErrors';

import DateInput, { DATEPICKER_TYPES } from '../DateInput';
import { DependenttInput } from '../DepentetInput';
import { addRecord, editRecord } from '../../records/recordsSlice';
import { selectSortedVehicles } from '../../vehicles/redux/vehiclesSlice';
import useValidation from '../../hooks/useValidation';

import {
  StyledForm,
  Container,
  ButtonsContainer,
  Row,
  StyledSelect,
} from '../FormsStyles';
import { ButtonMain, ButtonBordered } from '../../layout/LayoutStyles';
import Routing from '../../routing/Routing';

const validationSchema = Yup.object({
  date: Yup.date().required('Pole wymagane'),
  vehicle: Yup.string().required('Pole wymagane'),
  mileage: Yup.number().min(1, 'Nie mniejszy niż 1').required('Pole wymagane'),
});

const RecordForm = ({ record, isEdit, vehicleId }) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const validation = useValidation();

  const { items: vehicles } = useSelector(selectSortedVehicles);

  const vehicleSelectOptions = vehicles.map((vehicle) => {
    return {
      label: vehicle.name,
      value: vehicle.id,
      mileage: vehicle.mileage,
    };
  });

  const defaultVehicleOption = isEdit
    ? {
        label: record.vehicle.name,
        value: record.vehicle.id,
        mileage: record.vehicle.mileage,
      }
    : vehicleSelectOptions.find((opt) => opt.value === vehicleId);

  const initValues = {
    date: record ? `${record.year}-${record.month}` : new Date(),
    vehicle: defaultVehicleOption || '',
    mileage: record?.mileage || defaultVehicleOption?.mileage,
  };

  const handleSubmit = (values) => {
    const date = new Date(values.date);
    const data = {
      id: record?.id || '',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      vehicleId: values.vehicle.value,
      mileage: values.mileage,
    };

    const validate = validation.record(data);
    const action = isEdit ? editRecord : addRecord;

    if (validate.success) {
      dispatch(action(data)).then((res) => {
        push(Routing.Records.path);
      });
    } else {
      toast.error(validate.error);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldTouched, setFieldValue }) => (
          <StyledForm>
            <Row>
              <FieldWithErrors name='date' label='Data'>
                <DateInput
                  dateFormat='yyyy-MM'
                  onChange={(date) => {
                    setFieldTouched('date');
                    setFieldValue('date', date);
                  }}
                  defaultDate={values.date}
                  type={DATEPICKER_TYPES.monthpicker}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='vehicle' label='Pojazd' scrollFocused>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={vehicleSelectOptions}
                    noOptionsMessage={() => 'Brak aktywnych pojazdów'}
                    onChange={(value) => {
                      setFieldTouched('vehicle');
                      setFieldTouched('mileage');
                      setFieldValue('vehicle', value);
                    }}
                    defaultValue={defaultVehicleOption}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='mileage' label='Przebieg' scrollFocused>
                <DependenttInput
                  type='number'
                  placeholder='Przebieg'
                  disabled
                  triggerField='vehicle'
                  triggerValue='mileage'
                />
              </FieldWithErrors>
            </Row>

            <ButtonsContainer>
              <ButtonMain type='submit'>Zapisz</ButtonMain>
              <ButtonBordered
                type='button'
                onClick={() => push(Routing.Records.path)}
              >
                Anuluj
              </ButtonBordered>
            </ButtonsContainer>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default RecordForm;
