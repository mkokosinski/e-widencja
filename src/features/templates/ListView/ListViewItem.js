import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsMobile } from '../../layout/layoutSlice';

import {
  Container,
  Body,
  Ico,
  Name,
  Journeys,
  Buttons,
  Button,
  ButtonBody,
  ButtonIco,
  InfoSecondary,
  InfoMain,
  Journey,
} from './ListViewItemStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { A } from '../../layout/LayoutStyles';

const ListViewItem = ({ ico, item, path = '/', buttons = [] }) => {
  return (
      <Container key={item.id}>
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
                <A to={{ pathname: button.action, item }}>
                  <ButtonBody>
                    <ButtonIco>
                      <FontAwesomeIcon icon={button.ico} />
                    </ButtonIco>
                    <span>{button.label}</span>
                  </ButtonBody>
                </A>
              </Button>
            ))}
          </Buttons>
        </Body>
      </Container>
  );
};

export default ListViewItem;
