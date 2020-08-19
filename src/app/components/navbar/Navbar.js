import React from 'react';

import * as Styled from './NavbarStyles';

const Navbar = () => {
  return (
    <Styled.Menu>
      <Styled.Ul>
        <Styled.Li active={true}>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
        <Styled.Li>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
        <Styled.Li>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
        <Styled.Li>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
        <Styled.Li>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
        <Styled.Li>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
        <Styled.Li>
          <Styled.A>
            <img src='https://dummyimage.com/30' alt='' />
            <span>label</span>
          </Styled.A>
        </Styled.Li>
      </Styled.Ul>
    </Styled.Menu>
  );
};

export default Navbar;
