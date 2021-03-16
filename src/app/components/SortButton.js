import { faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useModal from '../../features/hooks/useModal';
import {
  ShowFilterLabel,
  TopButtonIco,
  TopPanelButton,
} from '../../features/templates/ListView/ListViewStyles';
import SortModalContent from './SortModal';

const SortButton = ({ modalItems, sortFunc }) => {
  const SortModal = useModal();

  return (
    <>
      <TopPanelButton tabIndex='0' onClick={SortModal.openModal}>
        <TopButtonIco>
          <FontAwesomeIcon icon={faSortAmountUpAlt} />
        </TopButtonIco>
        <ShowFilterLabel>Sortuj</ShowFilterLabel>
      </TopPanelButton>
      <SortModal.Modal>
        <SortModalContent
          sortFunc={sortFunc}
          sortItems={modalItems}
          closeModal={SortModal.closeModal}
        />
      </SortModal.Modal>
    </>
  );
};

export default SortButton;
