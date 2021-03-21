import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Routing from '../routing/Routing';
import ListViewItem from '../templates/ListView/ListViewItem';
import { deleteUser, selectFilteredUsers } from './usersSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterButton from '../../components/FilterButton';

import FilterModal from '../records/FilterModal';
import { selectCurrentUser } from '../auth/authSlice';
import { USER_ROLES } from '../../utils/constants';

import { EmptyState } from '../templates/detailsView/DetailsStyles';
import { Name, Subname, Title } from '../templates/ListView/ListViewItemStyles';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
} from '../templates/ListView/ListViewStyles';
import {
  faPlus,
  faUser,
  faFileAlt,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

function Users() {
  const { items: users } = useSelector(selectFilteredUsers);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const buttons = (id) => {
    const canEdit =
      currentUser.role === USER_ROLES.ADMIN || currentUser.id === id;
    return [
      {
        ico: faFileAlt,
        label: 'Szczegóły',
        action: `${Routing.UserDetails.action}/${id}`,
      },
      {
        ico: faEdit,
        label: 'Edytuj',
        action: `${Routing.UserEdit.action}/${id}`,
        props: {
          disabled: !canEdit,
          noPermission: !canEdit,
        },
      },
      {
        ico: faTrash,
        label: 'Usuń',
        type: 'deleteButton',
        action: () => dispatch(deleteUser(id)),
        props: {
          disabled: !canEdit,
          noPermission: !canEdit,
        },
      },
    ];
  };

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

      {users?.length ? (
        users.map((user) => (
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
        ))
      ) : (
        <EmptyState>Brak aktywnych użytkowników</EmptyState>
      )}
    </ItemsList>
  );
}

export default Users;
