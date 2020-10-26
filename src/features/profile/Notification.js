import React, { useState, useRef } from 'react';

import {
  ItemDesc,
  ItemTitle,
  ListItem,
  NotificationButton,
} from './ProfilebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChartPie, faCloudMoonRain, faSnowboarding } from '@fortawesome/free-solid-svg-icons';

import { useDropdown } from '../hooks/useDropdown';

const Notification = () => {
  const [isNewNotification, setIsNewNotification] = useState(true);

  const button = useRef(null);
  const {List, isOpen} = useDropdown(button);

  const handleClick = () => {
    setIsNewNotification(false);
  };

  return (
    <>
      <NotificationButton
        ref={button}
        onClick={handleClick}
        active={isOpen}
        isNewNotification={isNewNotification}
      >
        <FontAwesomeIcon icon={faBell} />
      </NotificationButton>

      <List>
        <ListItem>
          <ItemTitle>
            Nowa wersja! <FontAwesomeIcon icon={faCloudMoonRain} />
          </ItemTitle>
          <ItemDesc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            voluptates reiciendis tempora quisquam veniam. Eum vel Lorem ipsum
            dolor sit amet consectetur adipisicing elit.
          </ItemDesc>
        </ListItem>

        <ListItem>
          <ItemTitle>
            Dodano kierowcę <FontAwesomeIcon icon={faChartPie} />{' '}
          </ItemTitle>
          <ItemDesc>
            Explicabo commodi omnis illo minus similique eos minima labore,
            perspiciatis quas natus facilis in ducimus numquam ab quia provident
            possimus id reprehenderit aspernatur quae illum quidem velit
            voluptatem quo?
          </ItemDesc>
        </ListItem>

        <ListItem>
          <ItemTitle>
            Ciągle ni ma API <FontAwesomeIcon icon={faSnowboarding} />
          </ItemTitle>
          <ItemDesc>
            Modi beatae neque sequi ratione accusantium nemo? Vitae doloremque
            unde aliquid impedit ut?
          </ItemDesc>
        </ListItem>
      </List>
    </>
  );
};

export default Notification;
