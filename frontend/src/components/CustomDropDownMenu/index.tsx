import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface CustomDropDownMenuInterface {
    button: React.ReactNode
    children: React.ReactNode;
}

const CustomDropDownMenu: React.FC<CustomDropDownMenuInterface> = ({button, children}) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton as='div' className="transition-all ease-linear hover:text-black cursor-pointer">{button}</MenuButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems anchor="bottom end" className="absolute mt-3 ml-3 p-2 bg-[rgba(0,0,0,.35)] backdrop-blur-md rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                    {children}
                </MenuItems>
            </Transition>
        </Menu>
    )
}

export default CustomDropDownMenu