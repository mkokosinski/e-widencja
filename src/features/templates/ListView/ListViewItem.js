import React from 'react';

import {
  Container,
  Body,
  Ico,
  Buttons,
  Button,
  ButtonBody,
  ButtonIco
} from './ListViewItemStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { A } from '../../layout/LayoutStyles';

const ListViewItem = ({ children, ico, item, path = '/', buttons = [] }) => {
  return (
    <Container>
      <Body>
        {ico && (
          <Ico>
            <FontAwesomeIcon icon={ico} />
          </Ico>
        )}

        {children}

        <Buttons>
          {buttons &&
            buttons.map((button, index) => (
              <Button key={index}>
                <A to={{ pathname: button.action }}>
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
