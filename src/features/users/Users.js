import React from 'react';
import { selectUsers } from './usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import Routing from '../routing/Routing';

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
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { Route, Switch } from 'react-router';

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

const List = ({ users }) => {
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
};

function Users() {
  const { users, status, error } = useSelector(selectUsers);

  return (
    <Switch>
      <Route exact path={Routing.UserAdd.path}>
        <Routing.UserAdd.Component />
      </Route>
      <Route exact path={Routing.UserEdit.path}>
        <Routing.UserEdit.Component />
      </Route>
      <Route exact path={Routing.UserDetails.path}>
        <Routing.UserDetails.Component />
      </Route>
      <Route>
        <List users={users} />
      </Route>
    </Switch>
  );
}

export default Users;
