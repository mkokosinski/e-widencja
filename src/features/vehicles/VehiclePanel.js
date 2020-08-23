import React from 'react';
import { Link } from 'react-router-dom';
import Routing from '../layout/Routing';
import { useSelector } from 'react-redux';

import { selectIsMobile } from '../layout/layoutSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCarAlt,
  faFileAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';

import { ButtonLightSoft } from '../layout/LayoutStyles';
import {
  Container,
  Body,
  Ico,
  Name,
  Journeys,
  Buttons,
  ButtonBody,
  InfoSecondary,
  InfoMain,
  Journey,
} from './VehicleStyles';

const VehiclePanel = ({ vehicle }) => {
  const isMobile = useSelector(selectIsMobile);
  return (
    <div key={vehicle.id}>
      <Container>
        <Body>
          {isMobile ? (
            <>
              <Name>{vehicle.name}</Name>

              <Buttons>
                <ButtonLightSoft>
                  <Link
                    to={`${Routing.Vehicles.path}/${vehicle.id}`}
                    props={{ ...vehicle }}
                  >
                    <ButtonBody>
                      <FontAwesomeIcon icon={faFileAlt} />
                      <span>Szczegóły</span>
                    </ButtonBody>
                  </Link>
                </ButtonLightSoft>

                <ButtonLightSoft>
                  <Link
                    to={`${Routing.Vehicles.path}/${vehicle.id}`}
                    props={{ ...vehicle }}
                  >
                    <ButtonBody>
                      <FontAwesomeIcon icon={faPlusSquare} />
                      <span>Przejazd</span>
                    </ButtonBody>
                  </Link>
                </ButtonLightSoft>
              </Buttons>
            </>
          ) : (
            <>
              <Ico>
                <FontAwesomeIcon icon={faCarAlt} />
              </Ico>

              <Name>{vehicle.name}</Name>

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
                <ButtonLightSoft>
                  <Link
                    to={`${Routing.Vehicles.path}/${vehicle.id}`}
                    props={{ ...vehicle }}
                  >
                    <ButtonBody>
                      <FontAwesomeIcon icon={faFileAlt} />
                      <span>Szczegóły</span>
                    </ButtonBody>
                  </Link>
                </ButtonLightSoft>

                <ButtonLightSoft>
                  <Link
                    to={`${Routing.Vehicles.path}/${vehicle.id}`}
                    props={{ ...vehicle }}
                  >
                    <ButtonBody>
                      <FontAwesomeIcon icon={faPlusSquare} />
                      <span>Przejazd</span>
                    </ButtonBody>
                  </Link>
                </ButtonLightSoft>

                <ButtonLightSoft>
                  <Link
                    to={`${Routing.Vehicles.path}/${vehicle.id}`}
                    props={{ ...vehicle }}
                  >
                    <ButtonBody>
                      <FontAwesomeIcon icon={faPlusSquare} />
                      <span>Przejazd</span>
                    </ButtonBody>
                  </Link>
                </ButtonLightSoft>
              </Buttons>
            </>
          )}
        </Body>
      </Container>
    </div>
  );
};

export default VehiclePanel;
