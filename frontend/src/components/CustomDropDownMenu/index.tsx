import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface CustomDropDownMenuInterface {
    button: React.ReactNode
    children: React.ReactNode;
}

const CustomDropDownMenu: React.FC<CustomDropDownMenuInterface> = ({button, children}) => {
    return (
        <Menu>
        <MenuButton as='div' className="transition-all ease-linear hover:text-black cursor-pointer">{button}</MenuButton>
        <MenuItems anchor="bottom" className=" mt-3 ml-3 p-1 bg-slate-100 rounded-lg text-gray-800 text-sm font-medium">
            {children}
        </MenuItems>
        </Menu>
    )
}

export default CustomDropDownMenu