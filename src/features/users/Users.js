import React from 'react';
import { selectUsers } from './usersSlice';
import { useSelector } from 'react-redux';
import Routing from '../layout/Routing';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  SearchInput,
  ItemsList,
} from '../templates/ListView/ListViewStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.UserDetails.action}/${id}`
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
  const users = useSelector(selectUsers);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.UserAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowy <span>kierowca</span>
          </AddItem>
        </ButtonAdd>
        <SearchInput />
      </TopPanel>

      {users.map((user) => (
        <ListViewItem
          key={user.id}
          ico={faUser}
          item={user}
          path={Routing.Users.path}
          buttons={buttons(user.id)}
        />
      ))}
    </ItemsList>
  );
}

export default Users;
