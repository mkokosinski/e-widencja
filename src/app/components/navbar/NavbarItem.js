import React from 'react'

import { StyledItem } from './NavbarStyles'
 

export const Item = ({children}) => {
    return (
        <li>
            <a href="#">{children}</a>
        </li>
    )
}

export default Item