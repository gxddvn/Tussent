
function OptionIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>

    )
}

function PlusIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}

function CheckIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    )
}

function CancelIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    )
}

function DoingIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    ) 
}

const Project = () => {
    return (
        <div className=" pt-5">
            <div className="flex items-center justify-between px-4 py-3 mb-2 rounded-xl bg-[rgba(0,0,0,.2)]">
                <h1 className="text-2xl font-medium">Main Project1</h1>
                <div className="flex items-center">
                    <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full mr-1 cursor-pointer"></div>
                    <div className="p-2 border border-[rgba(255,255,255,.5)] bg-yellow-500 rounded-full mr-1 cursor-pointer"></div>
                    <div className="p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full mr-1 cursor-pointer"></div>
                    <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                </div>
            </div>
            <div className="grid grid-cols-3 items-start h-full">
                <div className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-base font-medium">To do</h1>
                        <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                        <div className="flex items-center">
                            <button className="transition-all ease-linear text-yellow-300 hover:text-yellow-600"><DoingIcon className="h-4 w-4"/></button>
                            <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                        </div>
                    </div>
                    <button className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
                <div className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-base font-medium">Doing</h1>
                        <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                            <button className="transition-all ease-linear text-green-400 hover:text-green-700"><CheckIcon className="h-4 w-4"/></button>
                            <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                            <button className="transition-all ease-linear text-green-400 hover:text-green-700"><CheckIcon className="h-4 w-4"/></button>
                            <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                            <button className="transition-all ease-linear text-green-400 hover:text-green-700"><CheckIcon className="h-4 w-4"/></button>
                            <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                            <button className="transition-all ease-linear text-green-400 hover:text-green-700"><CheckIcon className="h-4 w-4"/></button>
                            <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <button className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
                <div className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-base font-medium">Done</h1>
                        <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                                <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                                <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                                <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                                <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                        <div className="flex items-center justify-between">
                            <span className=" max-w-[250px] break-all text-sm font-normal text-white">Card1</span>
                            <div className="flex items-center">
                                <button className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">16:45 May 31</span>
                            <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                    <button className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
            </div>
        </div>
    )
}

export default Project