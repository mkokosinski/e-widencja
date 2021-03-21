import React from 'react';
import { useHistory } from 'react-router';

import useModal from '../../../hooks/useModal';

import AppLink from '../AppLink';

import { DetailsGoBack, DetailsButton } from './DetailsStyles';
import { ButtonBordered, ButtonMain } from '../../layout/LayoutStyles';
import { ModalContent } from '../ListView/ListViewStyles';
import { ButtonsContainer, Row } from '../../../components/Form/FormsStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

export const ButtonGoBack = () => {
  const { goBack } = useHistory();

  return (
    <DetailsGoBack type='button' onClick={goBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </DetailsGoBack>
  );
};

export const ButtonEdit = ({ actionPath, disabled }) => {
  return (
    <DetailsButton disabled={disabled} noPermission={disabled}>
      <AppLink disabled={disabled} to={actionPath}>
        <FontAwesomeIcon icon={faPen} />
      </AppLink>
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
    closeModal();
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

export const DetailsDeleteButton = ({
  item,
  onClick,
  redirectPath,
  info,
  disabled,
}) => {
  return (
    <DeleteButton
      item={item}
      onClick={onClick}
      redirectPath={redirectPath}
      info={info}
      component={
        <DetailsButton disabled={disabled} noPermission={disabled}>
          <FontAwesomeIcon icon={faTrash} />
        </DetailsButton>
      }
    />
  );
};
