import React from 'react';
import { useHistory } from 'react-router';

import {
  DetailsGoBack,
  DetailsEdit,
  DetailsEditButton,
  DetailsDelete,
} from './DetailsStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export const ButtonGoBack = () => {
  const { goBack } = useHistory();

  return (
    <DetailsGoBack onClick={goBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </DetailsGoBack>
  );
};

export const ButtonEdit = ({ actionPath }) => {
  return (
    <DetailsEdit>
      <DetailsEditButton to={actionPath}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </DetailsEditButton>
    </DetailsEdit>
  );
};

export const ButtonDelete = ({ item }) => {
  return (
    <DetailsDelete
      onClick={() => {
        const isDel = window.confirm(`Na pewno chcesz usunąć ${item.name}`);
        if (isDel) {
          alert('Pojazd zostanie usunięty jak będzie api');
        }
      }}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </DetailsDelete>
  );
};
