import styled from 'styled-components'

export const StyledLayout = styled.div`
    background: ${({ theme }) => theme.mainSoft};
    display: flex;
    min-height: 100vh;
`;

export const Menu = styled.div`
    display:flex;
    width: 20%;
`;

export const Body = styled.div`
    background: white;
    margin: 10px 10px 10px 0px;
    border-radius: 60px;
    width: 80%;
`;

