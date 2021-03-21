import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { Group, GroupTitle } from '../components/Form/FormsStyles';
import RadioGroup from '../components/Form/RadioGroup';

import { ModalContentSort } from '../features/templates/ListView/ListViewStyles';

const SortModalContent = ({ sortFunc, closeModal, sortItems = [] }) => {
  // const minDate = useSelector(selectEldestDate);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch(sortFunc(values)).catch(() => {
        setSubmitting(false);
      });
      closeModal();
    }, 200);
  };

  const initValues = {};

  return (
    <ModalContentSort>
      <Formik onSubmit={handleSubmit} initialValues={initValues}>
        {({ submitForm }) => (
          <>
            {sortItems.map((item) => (
              <Group key={item.title}>
                <GroupTitle>{item.title}</GroupTitle>
                <RadioGroup
                  items={item.items}
                  name={item.title}
                  onChange={submitForm}
                />
              </Group>
            ))}
          </>
        )}
      </Formik>
    </ModalContentSort>
  );
};

export default SortModalContent;
