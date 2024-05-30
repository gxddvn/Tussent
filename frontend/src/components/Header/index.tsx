import { NavLink } from "react-router-dom"

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
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
    )
}



const Header = () => {
    return (
        <div className="flex justify-between px-10 py-2 shadow-md">
            {/* <button className="transition-all ease-linear hover:text-black"><MenuIcon className="h-5 w-5 m-1" aria-hidden="true"/></button> */}
            <NavLink to='/' className="font-medium">Tussent</NavLink>
            <NavLink to="/signin" className="flex items-center justify-center pr-6 transition-all ease-linear text-base font-medium hover:text-slate-900"><SignInIcon className="h-5 w-5 m-1" aria-hidden="true"/>Sign In</NavLink>
            {/* <div className="flex">
                <button className="h-8 border-2 border-black rounded-full mx-1"><BellIcon className="h-5 w-5 m-1" aria-hidden="true"/></button>
                <button className="h-8 border-2 border-black rounded-full mx-1"><UserIcon className="h-5 w-5 m-1" aria-hidden="true"/></button>
            </div> */}
        </div>
    )
}

export default Header