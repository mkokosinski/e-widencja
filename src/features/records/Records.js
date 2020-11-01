import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import useModal from '../hooks/useModal';
import { selectIsMobileKeyboard } from '../layout/layoutSlice';
import Routing from '../routing/RoutingPaths';
import ListViewItem from '../templates/ListView/ListViewItem';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  ShowFilterButton,
  ShowFilterIco,
  ShowFilterLabel,
  TopPanel
} from '../templates/ListView/ListViewStyles';
import RecordsFilterModal from './RecordsFilterModal';
import {
  selectFiteredRecords,
} from './recordsSlice';
import {
  faEdit,
  faFileAlt,
  faPlus,
  faPlusSquare,
  faSortAmountUpAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.RecordDetails.action}/${id}`
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.RecordEdit.action}/${id}`
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details'
  }
];

const Records = () => {
  const { items: records } = useSelector(selectFiteredRecords);

  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);

  const { Modal, openModal, closeModal } = useModal();

  return (
    <ItemsList>
      <TopPanel isMobileKeyboard={isMobileKeyboard}>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa ewidencja</span>
          </AddItem>
        </ButtonAdd>

        <ShowFilterButton onClick={openModal}>
          <ShowFilterIco>
            <FontAwesomeIcon icon={faSortAmountUpAlt} />
          </ShowFilterIco>
          <ShowFilterLabel>Filtry</ShowFilterLabel>
        </ShowFilterButton>
        <Modal>
          <RecordsFilterModal closeModal={closeModal} />
        </Modal>
      </TopPanel>

      {records.map((record) => {
        const subname = record.vehicle && record.vehicle.name;
        return (
          <ListViewItem
            key={record.id}
            ico={faUser}
            item={{ ...record, subname }}
            path={Routing.Records.path}
            buttons={buttons(record.id)}
          />
        );
      })}
    </ItemsList>
  );
};

export default Records;
