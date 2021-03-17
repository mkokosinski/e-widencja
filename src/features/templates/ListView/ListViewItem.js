import React from 'react';

import {
  Container,
  Body,
  Ico,
  Buttons,
  Button,
  ButtonBody,
  ButtonIco,
} from './ListViewItemStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { A } from '../../layout/LayoutStyles';
import { DeleteButton } from '../detailsView/DetailsComponents';

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
            buttons.map((button, index) => {
              switch (button.type) {
                case 'deleteButton':
                  return (
                    <DeleteButton
                      onClick={button.action}
                      key={index}
                      item={item}
                      component={
                        <Button type='button' tabIndex='-1' key={index}>
                          <ButtonBody>
                            <ButtonIco>
                              <FontAwesomeIcon icon={button.ico} />
                            </ButtonIco>
                            <span>{button.label}</span>
                          </ButtonBody>
                        </Button>
                      }
                    />
                  );
                default:
                  return (
                    <Button type='button' tabIndex='-1' key={index}>
                      <A to={{ pathname: button.action, state: button.state }}>
                        <ButtonBody>
                          <ButtonIco>
                            <FontAwesomeIcon icon={button.ico} />
                          </ButtonIco>
                          <span>{button.label}</span>
                        </ButtonBody>
                      </A>
                    </Button>
                  );
              }
            })}
        </Buttons>
      </Body>
    </Container>
  );
};

export default React.memo(ListViewItem);
