import React from 'react';
import { selectFilteredUsers } from './usersSlice';
import { useSelector } from 'react-redux';
import Routing from '../routing/RoutingPaths';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
  ShowFilterButton,
  ShowFilterIco,
  ShowFilterLabel
} from '../templates/ListView/ListViewStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit,
  faSortAmountUpAlt
} from '@fortawesome/free-solid-svg-icons';
import useModal from '../hooks/useModal';
import UserFiltersModal from './UserFiltersModal';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.UserDetails.action}/${id}`
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.UserEdit.action}/${id}`
  },
  {
    ico: faPlusSquare,
    label: 'cośtam',
    action: 'details'
  }
];

function Users() {
  const { items: users } = useSelector(selectFilteredUsers);

  const { Modal, openModal, closeModal } = useModal();

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.UserAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Nowy kierowca</span>
          </AddItem>
        </ButtonAdd>
        <ShowFilterButton onClick={openModal}>
          <ShowFilterIco>
            <FontAwesomeIcon icon={faSortAmountUpAlt} />
          </ShowFilterIco>
          <ShowFilterLabel>Filtry</ShowFilterLabel>
        </ShowFilterButton>
        <Modal>
          <UserFiltersModal closeModal={closeModal} />
        </Modal>
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
