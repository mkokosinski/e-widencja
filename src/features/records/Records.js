import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsMobileKeyboard } from '../layout/layoutSlice';
import Routing from '../routing/RoutingPaths';

import {
  selectFiteredRecords,
  selectSortCases,
  setSortFunc
} from './recordsSlice';
import ListViewItem from '../templates/ListView/ListViewItem';
import SortButton from '../../app/components/SortButton';
import FilterModal from './FilterModal';

import {
  AddItem,
  ButtonAdd,
  ItemsList,
  TopPanel
} from '../templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faFileAlt,
  faPlus,
  faPlusSquare,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import FilterButton from '../../app/components/FilterButton';
import { Name, Subname, Title } from '../templates/ListView/ListViewItemStyles';

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
    action: `${Routing.TripAdd.path}`
  }
];
const Records = () => {
  const { items: records } = useSelector(selectFiteredRecords);
  const sortItems = useSelector(selectSortCases);
  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);
  return (
    <ItemsList>
      <TopPanel isMobileKeyboard={isMobileKeyboard}>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa ewidencja</span>
          </AddItem>
        </ButtonAdd>
        <FilterButton modalComponent={FilterModal} />
        <SortButton modalItems={sortItems} sortFunc={setSortFunc} />
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
          >
            <Title>
              <Name>{record.name}</Name>
              <Subname>{subname}</Subname>
            </Title>
          </ListViewItem>
        );
      })}
    </ItemsList>
  );
};

export default Records;
