import React from 'react';
import { compareDates } from '../../../utils/dateUtils';
import { getNameInitials } from '../../../utils/stringUtils';
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
  return (
    <StyledRecentList>
      <TopPanel>
        <Title>{title}</Title>
        <ShowMore>pokaż więcej...</ShowMore>
      </TopPanel>
      <List>
        {list
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
                {getNameInitials(item.driver.name, item.driver.surname)}
              </Driver>{' '}
              <Distance>{item.distance} km</Distance>
            </ListItem>
          ))}
      </List>
    </StyledRecentList>
  );
};

export default RecentList;
