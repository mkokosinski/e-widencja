import React from 'react';
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
} from './DetailsViewStyles';

const RecentList = ({ title, list }) => {
  return (
    <StyledRecentList>
      <TopPanel>
        <Title>{title}</Title>
        <ShowMore>pokaż więcej...</ShowMore>
      </TopPanel>
      <List>
        {list.map((item) => (
          <ListItem>
            <FromTo>
              <span> {item.from}</span>
              <span> {'<->'}</span>
              <span> {item.to}</span>
            </FromTo>
            <Driver>{item.driver}</Driver> <Distance>{item.distance}</Distance>
          </ListItem>
        ))}
      </List>
    </StyledRecentList>
  );
};

export default RecentList;
