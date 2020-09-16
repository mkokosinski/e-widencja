import React from 'react'
import { StyledDropdown } from './DropdownStyles'

const Dropdown = ({isOpen, children, position}) => {
    return (
        <StyledDropdown isOpen={isOpen} top={position.top}>
            {children}
        </StyledDropdown>
    )
}

export default Dropdown
