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
  ButtonBordered,
  ButtonMain,
  PanelBoxShadow,
} from '../../layout/LayoutStyles';
import { ButtonsContainer, Container, Row } from '../../forms/FormsStyles';
import Routing from '../../routing/Routing';
import { ModalContent } from '../ListView/ListViewStyles';
import { Link } from 'react-router-dom';

export const ButtonGoBack = () => {
  const { goBack } = useHistory();

  return (
    <DetailsGoBack type='button' onClick={goBack}>
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

export const DeleteButton = ({
  item,
  onClick,
  redirectPath,
  info,
  component = (
    <DetailsButton type='button'>
      <FontAwesomeIcon icon={faTrash} />
    </DetailsButton>
  ),
}) => {
  const { Modal, openModal, closeModal } = useModal();
  const { replace } = useHistory();

  const handleDelete = () => {
    onClick();
    if (redirectPath) replace(redirectPath);
  };
  const close = () => {
    closeModal();
  };
  return (
    <>
      <Modal>
        <ModalContent>
          <Row>{info || `Czy napewno chcesz usunąć ${item.name} ?`}</Row>

          <Row>
            <ButtonsContainer>
              <ButtonMain type='button' onClick={handleDelete}>
                Tak
              </ButtonMain>

              <ButtonBordered type='button' onClick={close}>
                Nie
              </ButtonBordered>
            </ButtonsContainer>
          </Row>
        </ModalContent>
      </Modal>
      {React.cloneElement(component, {
        onClick: openModal,
      })}
    </>
  );
};

export const DetailsDeleteButton = ({ item, onClick, redirectPath, info }) => {
  return (
    <DeleteButton
      item={item}
      onClick={onClick}
      redirectPath={redirectPath}
      info={info}
      component={
        <DetailsButton>
          <FontAwesomeIcon icon={faTrash} />
        </DetailsButton>
      }
    />
  );
};
