import React from 'react';

import {
  faEdit,
  faPlus,
  faTrash,
  faTruckPickup,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  TopPanel,
} from '../templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListViewItem from '../templates/ListView/ListViewItem';
import FilterButton from '../..//components/FilterButton';
import FilterModal from './TripFilters';
import { deleteTripTemplate, selectTripTemplates } from './tripTemplatesSlice';
import { Name, Subname, Title } from '../templates/ListView/ListViewItemStyles';
import { StopsLabel } from './TripTemplatesStyles';
import Routing from '../routing/Routing';
import { EmptyState } from '../templates/detailsView/DetailsStyles';

const TripTemplates = () => {
  const templates = useSelector(selectTripTemplates);
  const dispatch = useDispatch();
  const buttons = (id) => [
    {
      ico: faEdit,
      label: 'Edytuj',
      action: `${Routing.TripTemplateEdit.action}/${id}`,
    },
    {
      ico: faTrash,
      label: 'Usuń',
      type: 'deleteButton',
      action: () => dispatch(deleteTripTemplate(id)),
    },
  ];
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

      {templates?.length ? (
        templates.map((template) => {
          return (
            <ListViewItem
              key={template.id}
              ico={faTruckPickup}
              item={template}
              path={Routing.Trips.path}
              buttons={buttons(template.id)}
            >
              <Title>
                <Name>{template.name}</Name>
                <Subname>
                  <StopsLabel>
                    {template.stops.map((stop) => (
                      <span key={template.id + stop.place + stop.label}>
                        {stop.place}
                      </span>
                    ))}
                  </StopsLabel>
                </Subname>
              </Title>
            </ListViewItem>
          );
        })
      ) : (
        <EmptyState>Brak zdefiniowanych szablonów</EmptyState>
      )}
    </ItemsList>
  );
};

export default TripTemplates;
