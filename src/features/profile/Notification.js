import React, { useRef } from 'react';

import { ItemDesc, ItemTitle, ListItem } from './ProfilebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faCloudMoonRain,
  faSnowboarding,
} from '@fortawesome/free-solid-svg-icons';

import { useDropdown } from '../../hooks/useDropdown';
import NotificationButton from './NotificationButton';

const Notification = () => {
  const button = useRef();
  const { List, isOpen } = useDropdown(button);

  return (
    <>
      <NotificationButton isActive={isOpen} buttonRef={button} />

      <List>
        <ListItem>
          <ItemTitle>
            Nowa wersja! <FontAwesomeIcon icon={faCloudMoonRain} />
          </ItemTitle>
          <ItemDesc>Dodano edycję danych firmy!</ItemDesc>
        </ListItem>

        <ListItem>
          <ItemTitle>
            Dodano kierowcę <FontAwesomeIcon icon={faChartPie} />
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
            Aplikacja wciąż jest rozwijana{' '}
            <FontAwesomeIcon icon={faSnowboarding} />
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
