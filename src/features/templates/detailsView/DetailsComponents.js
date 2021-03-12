import React, { useRef } from 'react';
import { useHistory } from 'react-router';

import { DetailsGoBack, DetailsButton } from './DetailsStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import useModal from '../../hooks/useModal';
import { useDispatch } from 'react-redux';
import { deleteVehicle } from '../../vehicles/redux/vehicleThunk';
import {
  Button,
  ButtonBorderedSeconderySoft,
  ButtonMain,
  PanelBoxShadow,
} from '../../layout/LayoutStyles';
import { ButtonsContainer, Container, Row } from '../../forms/FormsStyles';
import Routing from '../../routing/RoutingPaths';
import { ModalContent } from '../ListView/ListViewStyles';
import { Link } from 'react-router-dom';

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
    <DetailsButton>
      <Link to={actionPath}>
        <FontAwesomeIcon icon={faPen} />
      </Link>
    </DetailsButton>
  );
};

export const ButtonDelete = ({ item, onClick, redirectPath, title }) => {
  const { replace } = useHistory();
  const { Modal, openModal, closeModal } = useModal();

  const handleDelete = () => {
    onClick();
    replace(redirectPath);
  };

  const close = () => {
    closeModal();
  };

  return (
    <>
      <DetailsButton onClick={openModal}>
        <FontAwesomeIcon icon={faTrash} />
      </DetailsButton>
      <Modal>
        <ModalContent>
          <Row>{`Czy napewno chcesz usunąć ${item.name} ?`}</Row>

          <Row>
            <ButtonsContainer>
              <ButtonMain onClick={handleDelete}>Tak</ButtonMain>

              <ButtonBorderedSeconderySoft onClick={close}>
                Nie
              </ButtonBorderedSeconderySoft>
            </ButtonsContainer>
          </Row>
        </ModalContent>
      </Modal>
    </>
  );
};
