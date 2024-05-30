import { Outlet } from "react-router-dom"

function HomeIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    )
}

function FolderProjectsIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
    )
}

const UserWorkSpace = () => {
    
    return (
        <div className="flex min-h-screen">
            <div className="px-2 pt-2 pb-16 bg-[rgba(0,0,0,.3)] fixed h-full flex flex-col justify-between">
                <div>
                    <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer transition-all ease-linear hover:bg-slate-900">
                        <HomeIcon className="h-5 w-5 m-1" aria-hidden="true"/>
                    </div>
                </div>
                <div className="h-full">
                    <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer my-2 flex justify-center items-center transition-all ease-linear hover:bg-slate-900">
                        <span className=" text-base font-medium">F</span>
                    </div>
                    <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer my-2 flex justify-center items-center transition-all ease-linear hover:bg-slate-900">
                        <span className=" text-base font-medium">A</span>
                    </div>
                    <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer my-2 flex justify-center items-center transition-all ease-linear hover:bg-slate-900">
                        <span className=" text-base font-medium">K</span>
                    </div>
                </div>
                <div>
                    <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer transition-all ease-linear hover:bg-slate-900">
                        <FolderProjectsIcon className="h-5 w-5 m-1" aria-hidden="true"/>
                    </div>
                    <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer transition-all ease-linear hover:bg-slate-900 flex justify-center items-center mt-2">
                        <span className="text-base font-medium">+</span>
                    </div>
                </div>
            </div>
            <div className="w-full pt-10 pl-40 pr-20 h-screen overflow-y-scroll">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserWorkSpace