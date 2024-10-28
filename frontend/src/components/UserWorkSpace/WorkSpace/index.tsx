import { useState } from "react"
import CustomModal from "../../CustomModal"
import { useForm } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../Hooks"
import { fetchCreateProject, selectWorkspaceData } from "../../../store/Slices/workspace"
import { selectAuthData } from "../../../store/Slices/auth"

function RecentlyViewedIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}

function WorkSpaceIcom(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
    )
}

const WorkSpace = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const workspaceData = useAppSelector(selectWorkspaceData)
    const authData = useAppSelector(selectAuthData)

    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            name: "",
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values:{name:string}) => {
        setIsOpen(false)
        reset();
        const data = await dispatch(fetchCreateProject({name: values.name, user: String(authData.user?.id), workspace: String(authData.user?.workspaceId)}));
        if (!data.payload) {
            alert("Error");
        }
    };
    return (
        <div className="pb-28 pt-10">
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} title="Create project">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="name">Name</label>
                        <span className='text-xs font-medium text-rose-500'>{errors?.name && "Wrong format!"}</span>
                    </div>
                    <input type="text" id="name" className="shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]" {...register("name", { required: "Enter name!" })}/>
                    <div className="flex justify-center items-center pt-6">
                        <button type="submit" disabled={!isValid} className="px-5 py-2 bg-slate-800 text-white rounded-lg transition-all ease-linear hover:bg-slate-900 cursor-pointer">Create</button>
                    </div>
                </form>
            </CustomModal>
            <h1 className="text-3xl font-semibold mb-5">Your Workspace</h1>
            <h2 className="flex items-center text-lg font-medium"><RecentlyViewedIcon className="h-6 w-6 mr-1" aria-hidden="true"/>Recently Viewed</h2>
            <div className="flex items-center py-6">
                <NavLink to='project/gdff' className="flex justify-center items-center p-6 bg-slate-800 rounded-xl mx-2 transition-all ease-linear hover:bg-slate-900 cursor-pointer">
                    <span className="text-base font-medium">Main project1</span>
                </NavLink>
                <div className="flex justify-center items-center p-6 bg-slate-800 rounded-xl mx-2 transition-all ease-linear hover:bg-slate-900 cursor-pointer">
                    <span className="text-base font-medium">Main project2</span>
                </div>
                <div className="flex justify-center items-center p-6 bg-slate-800 rounded-xl mx-2 transition-all ease-linear hover:bg-slate-900 cursor-pointer">
                    <span className="text-base font-medium">Main project3</span>
                </div>
            </div>
            <h2 className="flex text-lg font-medium mt-7"><WorkSpaceIcom className="h-6 w-6 mr-1" aria-hidden="true"/>All projects</h2>
            <div className="grid gap-4 grid-cols-5 py-6">
                <button onClick={() => setIsOpen(!isOpen)} className="flex justify-center items-center p-6 bg-slate-800 rounded-xl transition-all ease-linear hover:bg-slate-900 cursor-pointer">
                    <span className="text-base font-medium">+</span>
                </button>
                {workspaceData.userWorkspace?.map((project, index) => (
                    <NavLink to={`project/${project.id}`} key={index} className="flex justify-center items-center p-6 bg-slate-800 rounded-xl transition-all ease-linear hover:bg-slate-900 cursor-pointer">
                        <span className="text-base font-medium">{project.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default WorkSpace