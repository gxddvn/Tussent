
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

const Project = () => {
    return (
        <div className="h-full pb-16">
            <div className="flex items-start h-full overflow-x-scroll">
                <div className="flex flex-col min-w-[400px] mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-base font-medium">List1</h1>
                        <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                    </div>
                    <div className="px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg">
                        <span className="text-sm font-normal text-white">Lgllsdflsdflsdf</span>
                    </div>
                    <button className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
            </div>
        </div>
    )
}

export default Project