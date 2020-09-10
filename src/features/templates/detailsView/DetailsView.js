import React from 'react';
import { useHistory } from 'react-router';
import Routing from '../layout/Routing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPencilAlt,
  faTrashAlt,
  faCopyright,
  faCarSide,
  faTachometerAlt,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';

import LineChart from '../../charts/Chart';
import {
  DetailsTopPanel,
  DetailsGoBack,
  DetailsTitle,
  DetailsDelete,
  DetailsEdit,
  DetailsInfo,
  DetailsIco,
  DetailsLabel,
  DetailsData,
  Details,
  DetailsEditButton,
  SectionDesc,
  SectionChart,
  SectionRecent,
} from '../../layout/LayoutStyles';
import RecentList from '../../templates/detailsView/RecentTours';

const DatailsView = ({item, chartData, recentTours, route}) => {
  const { goBack } = useHistory();

  return item ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <DetailsGoBack onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </DetailsGoBack>

          <DetailsTitle>{item.name}</DetailsTitle>

          <DetailsEdit>
            <DetailsEditButton
              to={`${route.action}/${item.id}`}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </DetailsEditButton>
          </DetailsEdit>

          <DetailsDelete
            onClick={() => {
              const isDel = window.confirm(`Na pewno chcesz usunąć ${item.name}`);

              if (isDel) {
                alert("Pojazd zostanie usunięty jak będzie api")
              }
            }}
          >
            {/* <DetailsEditButton
              to={`${Routing.ItemEdit.action}/${item.id}`}
            >
          <FontAwesomeIcon icon={faTrashAlt} />
        </DetailsEditButton> */}
            <FontAwesomeIcon icon={faTrashAlt} />
          </DetailsDelete>
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCopyright} />
          </DetailsIco>
          <DetailsLabel>Marka</DetailsLabel>
          <DetailsData>{item.mark}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCarSide} />
          </DetailsIco>
          <DetailsLabel>Model</DetailsLabel>
          <DetailsData>{item.model}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faTachometerAlt} />
          </DetailsIco>
          <DetailsLabel>Przebieg</DetailsLabel>
          <DetailsData>{item.mileage}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faColumns} />
          </DetailsIco>
          <DetailsLabel>Numer rejestracyjny</DetailsLabel>
          <DetailsData>{item.registrationNumber}</DetailsData>
        </DetailsInfo>
      </SectionDesc>

      <SectionChart>
        <LineChart
          data={sampleData}
          dataOffset={6}
          title={'Przejechane kilometry'}
        />
      </SectionChart>

      <SectionRecent>
        <RecentList title='Ostatnie trasy' list={sampletours} />
      </SectionRecent>
    </Details>
  ) : null;
};

export default DatailsView;
