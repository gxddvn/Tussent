import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../Hooks"
import { logout, selectAuthData } from "../../store/Slices/auth"
import CustomDropDownMenu from "../CustomDropDownMenu"
import { MenuItem } from "@headlessui/react"
import { deleteWorkspace } from "../../store/Slices/workspace"

function MenuIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    )
}

function UserIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    )
}

function BellIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
    )
}

function SignInIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
    )
}


function UnreadIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    )
}

function ReadedIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  strokeWidth={1.5}>
            <path d="M7 12l5 5l10 -10"></path>
            <path d="M2 12l5 5m5 -5l5 -5"></path>
        </svg>
    )
}


const Header = () => {
    const user = useAppSelector(selectAuthData)
    const dispatch = useAppDispatch();

    const onClickLogout = () => {
        if (window.confirm("Do you want to logout?")) {
            dispatch(logout())
            dispatch(deleteWorkspace())
        }
    }
    return (
        <div className="flex justify-between px-10 py-2 shadow-md">
            {!user.IsAuth ? (
                <>
                    <NavLink to='/' className="text-xl font-medium">Tussent</NavLink>
                    <NavLink to="/signin" className="flex items-center justify-center pr-6 transition-all ease-linear text-base font-medium hover:text-slate-900"><SignInIcon className="h-5 w-5 m-1" aria-hidden="true"/>Sign In</NavLink>
                </>
            ) : (
                <>
                    <CustomDropDownMenu button={<MenuIcon className="h-5 w-5 m-1" aria-hidden="true"/>}>
                        <MenuItem>
                            <NavLink className="block transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-sm" to={`userworkspace/${user.user?.workspaceId}`}>
                                Workspaces
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink className="block transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-sm" to={`user/${user.user?.id}/calendar`}>
                                Calendar
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink className="block transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-sm" onClick={onClickLogout} to="/">
                                Log Out
                            </NavLink>
                        </MenuItem>
                    </CustomDropDownMenu>
                    <NavLink to='/' className="text-xl font-medium text-center">Tussent</NavLink>
                    <div className="flex">
                        <CustomDropDownMenu button={<BellIcon className="h-5 w-5 m-1" aria-hidden="true"/>}>
                            <MenuItem>
                                <div className="relative max-h-28 p-1">
                                    <div className="max-w-[300px] flex flex-col items-center justify-center overflow-y-auto">
                                        {/* <span className="opacity-70 py-4">No notifications</span> */}
                                        <div className="w-full px-1 py-2 pl-2 mb-2 bg-[rgba(255,255,255,0.3)] rounded-lg shadow-md flex max-h-20">
                                            <span className="text-xs max-w-40">Встреча "Статус-калл" перенесена на 15:00.</span>
                                            <div className="flex flex-grow flex-col items-end justify-between">
                                                {/* <UnreadIcon className="h-3 w-3" aria-hidden="true"/> */}
                                                <ReadedIcon className="h-3 w-3" aria-hidden="true"/>
                                                <span className="text-xs font-semibold text-[rgba(255,255,255,0.5)]">2:23</span>
                                            </div>
                                        </div>
                                        <div className="w-full px-1 py-2 pl-2 mb-2 bg-[rgba(255,255,255,0.3)] rounded-lg shadow-md flex max-h-20">
                                            <span className="text-xs max-w-40">Встреча "Статус-калл" перенесена на 16:00.</span>
                                            <div className="flex flex-grow flex-col items-end justify-between">
                                                {/* <UnreadIcon className="h-3 w-3" aria-hidden="true"/> */}
                                                <ReadedIcon className="h-3 w-3" aria-hidden="true"/>
                                                <span className="text-xs font-semibold text-[rgba(255,255,255,0.5)]">2:23</span>
                                            </div>
                                        </div>
                                        <div className="w-full px-1 py-2 pl-2 mb-2 bg-[rgba(255,255,255,0.3)] rounded-lg shadow-md flex max-h-20">
                                            <span className="text-xs max-w-40">
                                                Вас приглашают присоедениться к проекту 
                                                <button className="flex items-center justify-center mt-1 px-2 py-1 bg-[rgba(0,0,0,0.4)] rounded-lg shadow-md">Перейти</button>
                                            </span>
                                            <div className="flex flex-grow flex-col items-end justify-between">
                                                {/* <UnreadIcon className="h-3 w-3" aria-hidden="true"/> */}
                                                <ReadedIcon className="h-3 w-3" aria-hidden="true"/>
                                                <span className="text-xs font-semibold text-[rgba(255,255,255,0.5)]">2:23</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MenuItem>
                        </CustomDropDownMenu>
                        <NavLink to={`user/${user.user?.id}/profile`} className="transition-all ease-linear hover:text-black"><UserIcon className="h-5 w-5 m-1" aria-hidden="true"/></NavLink>
                    </div>
                </>
            )}
        </div>
    )
}

export default Header