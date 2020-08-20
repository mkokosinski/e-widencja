import React from 'react'

import { Li } from './NavbarStyles'
 

export const Item = ({children}) => {
    return (
        <Li>
           {children}
        </Li>
    )
}

export default Item