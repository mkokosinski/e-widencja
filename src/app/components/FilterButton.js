import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import useModal from '../../features/hooks/useModal';
import {
  ShowFilterLabel,
  TopButtonIco,
  TopPanelButton,
} from '../../features/templates/ListView/ListViewStyles';

const FilterButton = ({ modalComponent: ModalContent }) => {
  const { Modal, openModal, closeModal } = useModal();

  useEffect(() => {
    console.log('render');
  });

  return (
    <>
      <TopPanelButton tabIndex={0} onClick={openModal}>
        <TopButtonIco>
          <FontAwesomeIcon icon={faFilter} />
        </TopButtonIco>
        <ShowFilterLabel>Filtruj</ShowFilterLabel>
      </TopPanelButton>
      <Modal>
        <ModalContent closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default React.memo(FilterButton);
