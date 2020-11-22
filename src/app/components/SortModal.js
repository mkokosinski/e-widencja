import React from 'react';

import { Group, GroupTitle } from '../../features/forms/FormsStyles';
import { Formik } from 'formik';
import { ModalContentSort } from '../../features/templates/ListView/ListViewStyles';
import RadioGroup from '../../features/forms/RadioGroup';
import { useDispatch } from 'react-redux';

const SortModalContent = ({ sortFunc , closeModal, sortItems = [] }) => {
  // const minDate = useSelector(selectEldestDate);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    setTimeout(() => {
      dispatch(sortFunc(values));
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
