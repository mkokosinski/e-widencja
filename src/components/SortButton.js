import React from 'react';

import SortModalContent from './SortModal';
import useModal from '../hooks/useModal';

import {
  ShowFilterLabel,
  TopButtonIco,
  TopPanelButton,
} from '../features/templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';

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

export default React.memo(SortButton);
