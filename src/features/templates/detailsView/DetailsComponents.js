import React, { useRef } from 'react';
import { useHistory } from 'react-router';

import {
  DetailsGoBack,
  DetailsEdit,
  DetailsEditButton,
  DetailsDelete
} from './DetailsStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPen,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import useModal from '../../hooks/useModal';
import { useDispatch } from 'react-redux';
import { deleteVehicle } from '../../vehicles/vehiclesSlice';
import {
  Button,
  ButtonBorderedSeconderySoft,
  ButtonMain,
  PanelBoxShadow
} from '../../layout/LayoutStyles';
import { Container } from '../../forms/FormsStyles';
import Routing from '../../routing/RoutingPaths';

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
        <FontAwesomeIcon icon={faPen} />
      </DetailsEditButton>
    </DetailsEdit>
  );
};

export const ButtonDelete = ({ item, onClick, redirectPath }) => {
  const { replace } = useHistory();
  const { Modal, openModal, closeModal } = useModal();

  const handleDelete = () => {
    onClick();
    replace(redirectPath);
  };

  return (
    <DetailsDelete onClick={openModal}>
      <FontAwesomeIcon icon={faTrash} />
      <Modal>
        <Container>
          {`Czy napewno chcesz usunąć ${item.name} ?`}
          <ButtonMain onClick={handleDelete}>Tak</ButtonMain>
          <br />
          <ButtonBorderedSeconderySoft onClick={closeModal}>
            Nie
          </ButtonBorderedSeconderySoft>
        </Container>
      </Modal>
    </DetailsDelete>
  );
};
