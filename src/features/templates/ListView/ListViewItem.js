import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsMobile } from '../../layout/layoutSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Body,
  Ico,
  Name,
  Journeys,
  Buttons,
  Button,
  ButtonBody,
  InfoSecondary,
  InfoMain,
  Journey,
} from './ListViewItemStyles';

const ListViewItem = ({ ico, item, path = '/', buttons = [] }) => {
  return (
    <div key={item.id}>
      <Container>
        <Body>
            <Ico>
              <FontAwesomeIcon icon={ico} />
            </Ico>

            <Name>{item.name}</Name>

            <Journeys>
              <Journey>
                <InfoMain>359,34km</InfoMain>
                <InfoSecondary>w tym miesiącu</InfoSecondary>
              </Journey>
              <Journey>
                <InfoMain>29 przejazdów</InfoMain>
                <InfoSecondary>w tym miesiącu</InfoSecondary>
              </Journey>
            </Journeys>

            <Buttons>
              {buttons.map((button, index) => (
                <Button key={index}>
                  <Link to={{ pathname: button.action, item }}>
                    <ButtonBody>
                      <FontAwesomeIcon icon={button.ico} />
                      <span>{button.label}</span>
                    </ButtonBody>
                  </Link>
                </Button>
              ))}
            </Buttons>
        </Body>
      </Container>
    </div>
  );
};

export default ListViewItem;
