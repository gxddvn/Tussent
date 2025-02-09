import { Navigate, NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../Hooks"
import { selectAuthData } from "../../store/Slices/auth"
import { useEffect, useState } from "react"
import { fetchCreateProject, fetchWorkspaceMe, selectFavoriteData } from "../../store/Slices/workspace"
import Tooltip from '@mui/material/Tooltip';
import { styled, tooltipClasses, TooltipProps } from "@mui/material"
import { useForm } from "react-hook-form"
import CustomModal from "../CustomModal"
import { toast, ToastContainer } from "react-toastify"


const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,.3)',
        boxShadow: theme.shadows[1],
    },
}));

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
    const dispatch = useAppDispatch();
    const authData = useAppSelector(selectAuthData)
    const favoriteData = useAppSelector(selectFavoriteData) || []
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (authData?.user) {
            dispatch(fetchWorkspaceMe({workspaceId: `${authData.user?.workspaceId}`, limit: 15}))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authData.user])

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

    const notify = (mess:string) => {
        toast.error(mess, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const onSubmit = async (values:{name:string}) => {
        setIsOpen(false)
        reset();
        const data = await dispatch(fetchCreateProject({name: values.name, user: String(authData.user?.id), workspace: String(authData.user?.workspaceId)}));
        if (data.payload && typeof data.payload === 'object' && 'error' in data.payload) {
            notify(data.payload.error as string)
        }
        if (!data.payload) {
            alert("Error");
        }
    };

    if (!authData.IsAuth && (authData.status == "loaded" || authData.status == "error")) {
        return <Navigate to='/' />
    }

    return (
        <div className="flex flex-grow">
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
            <ToastContainer />
            <div className="px-2 pt-2 pb-16 bg-[rgba(0,0,0,.3)] fixed flex h-full flex-col justify-between">
                <div>
                    <NavLink to={`/userworkspace/${authData.user?.workspaceId}`} className=" flex p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer transition-all ease-linear hover:bg-slate-900">
                        <HomeIcon className="h-5 w-5 m-1" aria-hidden="true"/>
                    </NavLink>
                </div>
                <div className="h-full">
                    {favoriteData.userFavorite?.map((project, index) => (
                        <CustomTooltip key={index} title={project.name} placement="right">
                            <NavLink to={`project/${project.id}`} className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer my-2 flex justify-center items-center transition-all ease-linear hover:bg-slate-900">
                                <span className=" text-base font-medium">{project.name[0]}</span>
                            </NavLink>
                        </CustomTooltip>
                    ))}
                </div>
                <div>
                    <CustomTooltip title="Folder" placement="right">
                        <div className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer transition-all ease-linear hover:bg-slate-900">
                            <FolderProjectsIcon className="h-5 w-5 m-1" aria-hidden="true"/>
                        </div>
                    </CustomTooltip>
                    <div onClick={() => setIsOpen(!isOpen)} className="p-3 bg-slate-800 shadow-md rounded-xl cursor-pointer transition-all ease-linear hover:bg-slate-900 flex justify-center items-center mt-2">
                        <span className="text-base font-medium">+</span>
                    </div>
                </div>
            </div>
            <div className=" flex-grow w-full pl-40 pr-20">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserWorkSpace