import React from 'react';

import { Group, GroupTitle } from '../forms/FormsStyles';
import { Formik } from 'formik';
import { ModalContent, ModalContentSort } from './ListView/ListViewStyles';
import RadioGroup from '../forms/RadioGroup';

const SortModalContent = ({ closeModal, sortItems = [] }) => {
  // const minDate = useSelector(selectEldestDate);

  const handleSubmit = (values) => {
    console.log(values);
    closeModal();
  };

  const initValues = sortItems.map((item) => {
    return { [item.title]: '' };
  });
  console.log(initValues);

  return (
    <ModalContentSort>
      <Formik onSubmit={handleSubmit} initialValues={initValues}>
        {() => (
          <>
            {sortItems.map((item) => (
              <Group key={item.title}>
                <GroupTitle>{item.title}</GroupTitle>
                <RadioGroup items={item.items} name={item.title} />
              </Group>
            ))}
          </>
        )}
      </Formik>
    </ModalContentSort>
  );
};

export default SortModalContent;
