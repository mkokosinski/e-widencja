import React from 'react';
import { ModalContent } from '../templates/ListView/ListViewStyles';
import { ButtonsContainer, Row } from '../../components/Form/FormsStyles';
import { ButtonBordered, ButtonMain } from '../layout/LayoutStyles';
import { Redirect, useHistory, useLocation } from 'react-router';
import Routing from '../routing/Routing';

const TripRecordNotExists = (props) => {
  const { push, goBack } = useHistory();
  const { state } = useLocation();

  if (!state || !state.vehicleId) {
    return <Redirect to={Routing.Dashboard.path} />;
  }

  const handleConfirm = () => {
    push(`${Routing.RecordAdd.action}/${state.vehicleId}`);
  };

  const handleReject = () => {
    goBack();
  };

  return (
    <ModalContent>
      <Row>{`Nie istnieje ewidencja dla tego pojazdu w obecnym miesiącu.`}</Row>
      <Row>{`Chcesz dodać nową ewidencję?`}</Row>

      <Row>
        <ButtonsContainer>
          <ButtonMain type='button' onClick={handleConfirm}>
            Tak
          </ButtonMain>

          <ButtonBordered type='button' onClick={handleReject}>
            Nie
          </ButtonBordered>
        </ButtonsContainer>
      </Row>
    </ModalContent>
  );
};

TripRecordNotExists.propTypes = {};

export default TripRecordNotExists;
