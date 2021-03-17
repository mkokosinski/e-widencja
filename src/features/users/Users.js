import React from 'react';
import { selectFilteredUsers } from './usersSlice';
import { useSelector } from 'react-redux';
import Routing from '../routing/Routing';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
} from '../templates/ListView/ListViewStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import FilterButton from '../../app/components/FilterButton';
import FilterModal from '../records/FilterModal';
import { Name, Subname, Title } from '../templates/ListView/ListViewItemStyles';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.UserDetails.action}/${id}`,
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.UserEdit.action}/${id}`,
  },
  {
    ico: faPlusSquare,
    label: 'cośtam',
    action: 'details',
  },
];

function Users() {
  const { items: users } = useSelector(selectFilteredUsers);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.UserAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Nowy użytkownik</span>
          </AddItem>
        </ButtonAdd>
        <FilterButton modalComponent={FilterModal} />
      </TopPanel>

      {users.map((user) => (
        <ListViewItem
          key={user.id}
          ico={faUser}
          item={user}
          path={Routing.Users.path}
          buttons={buttons(user.id)}
        >
          <Title>
            <Name>{`${user.name} ${user.surname}`}</Name>
            <Subname>{user.label}</Subname>
          </Title>
        </ListViewItem>
      ))}
    </ItemsList>
  );
}

export default Users;
