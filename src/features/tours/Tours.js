import React from 'react';

import Routing from '../routing/RoutingPaths';

import {
  faEdit,
  faFileAlt,
  faPlus,
  faPlusSquare,
  faSortAmountUpAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredUsers } from '../users/usersSlice';
import useModal from '../hooks/useModal';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  FilterButton,
  TopButtonIco,
  ShowFilterLabel,
  TopPanel
} from '../templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToursFilters from './ToursFilters';
import ListViewItem from '../templates/ListView/ListViewItem';
import { signIn, signOut } from '../auth/authSlice';

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

const Users = () => {
  const { items: users } = useSelector(selectFilteredUsers);

  const dispatch = useDispatch();

  const { Modal, openModal, closeModal } = useModal();

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.TourAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa trasa</span>
          </AddItem>
        </ButtonAdd>

        <FilterButton onClick={openModal}>
          <TopButtonIco>
            <FontAwesomeIcon icon={faSortAmountUpAlt} />
          </TopButtonIco>
          <ShowFilterLabel>Filtry</ShowFilterLabel>
        </FilterButton>
        <Modal>
          <ToursFilters closeModal={closeModal} />
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
};

export default Users;
