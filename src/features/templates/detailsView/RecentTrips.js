import React from 'react';
import { useSelector } from 'react-redux';
import { compareDates } from '../../../utils/dateUtils';
import { getNameInitials } from '../../../utils/stringUtils';
import { selectSiteSize } from '../../layout/layoutSlice';
import { device, screenSize } from '../../layout/LayoutStyles';
import { EmptyState } from './DetailsStyles';
import {
  Title,
  List,
  ListItem,
  FromTo,
  Driver,
  Distance,
  ShowMore,
  TopPanel,
  StyledRecentList,
} from './RecentTripsStyles';

const RecentList = ({ title, list }) => {
  const siteSize = useSelector(selectSiteSize);
  const isEmptyList = list.length === 0;
  return (
    <StyledRecentList>
      <TopPanel>
        <Title>{title}</Title>
        {!isEmptyList && <ShowMore>pokaż więcej...</ShowMore>}
      </TopPanel>
      <List>
        {isEmptyList ? (
          <EmptyState>Brak przejazdów</EmptyState>
        ) : (
          list
            .sort((a, b) => compareDates(b.date, a.date))
            .splice(0, 8)
            .map((item) => (
              <ListItem key={item.id}>
                <span>{item.date}</span>
                <FromTo>
                  <span> {item.start}</span>
                  <span> {`<- ${item.stops.length - 2} ->`}</span>
                  <span> {item.end}</span>
                </FromTo>
                <Driver>
                  {siteSize.x > screenSize.mobileXL
                    ? `${item.driver.name} ${item.driver.surname}`
                    : getNameInitials(item.driver.name, item.driver.surname)}
                </Driver>
                <Distance>{item.distance} km</Distance>
              </ListItem>
            ))
        )}
      </List>
    </StyledRecentList>
  );
};

export default RecentList;
