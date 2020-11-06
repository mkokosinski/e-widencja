import React from 'react';

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
  Subname,
  Title
} from './ListViewItemStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { A } from '../../layout/LayoutStyles';

const ListViewItem = ({ ico, item, path = '/', buttons = [] }) => {
  return (
    <Container key={item.id}>
      <Body>
        {ico && (
          <Ico>
            <FontAwesomeIcon icon={ico} />
          </Ico>
        )}
        
        <Title>
          <Name>{item.name}</Name>
          <Subname>{item.subname}</Subname>
        </Title>

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
          {buttons &&
            buttons.map((button, index) => (
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

export default React.memo(ListViewItem);
