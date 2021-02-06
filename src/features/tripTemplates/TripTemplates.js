import React from 'react';

import {
  faEdit,
  faFileAlt,
  faPlus,
  faPlusSquare,
  faTrash,
  faTruckPickup,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredUsers } from '../users/usersSlice';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  TopPanel
} from '../templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripsFilters from './TripFilters';
import ListViewItem from '../templates/ListView/ListViewItem';
import FilterButton from '../../app/components/FilterButton';
import FilterModal from './TripFilters';
import { selectTripTemplates } from './tripTemplatesSlice';
import { Name, Subname, Title } from '../templates/ListView/ListViewItemStyles';
import { EndLabel, StartLabel, StopsLabel } from './TripTemplatesStyles';
import Routing from '../routing/RoutingPaths';

const buttons = (id) => [
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.TripTemplateEdit.action}/${id}`
  },
  {
    ico: faTrash,
    label: 'Usuń',
    action: `${Routing.TripTemplateEdit.action}/${id}`
  }
];

const TripTemplates = () => {
  const templates = useSelector(selectTripTemplates);
  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.TripTemplateAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Nowy szablon</span>
          </AddItem>
        </ButtonAdd>

        <FilterButton modalComponent={FilterModal} />
      </TopPanel>

      {templates.map((template) => {
        return (
          <ListViewItem
            key={template.id}
            ico={faTruckPickup}
            item={template}
            path={Routing.Trips.path}
            buttons={buttons(template.id)}
          >
            <Title>
              <Name>{template.label}</Name>
              <Subname>
                <StopsLabel>
                  {template.stops.map((stop) => (
                    <span key={stop.place + stop.label}>{stop.place}</span>
                  ))}
                </StopsLabel>
              </Subname>
            </Title>
          </ListViewItem>
        );
      })}
    </ItemsList>
  );
};

export default TripTemplates;
