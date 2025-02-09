import axios from "../../../axios"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Hooks"
import { selectAuthData } from "../../../store/Slices/auth"
import CustomModal from "../../CustomModal";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useParams } from "react-router-dom";
import CustomDropDownMenu from "../../CustomDropDownMenu";
import { MenuItem } from "@headlessui/react";
import { fetchDeleteProject, fetchUpdateProject } from "../../../store/Slices/workspace";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


interface userInivites {
    id: string;
    name: string;
}

interface TodoInterface {
    id:string;
    todo_name: string;
    todo_stage: string;
    createdAt: string;
    updatedAt: string;
    user: userInivites;
    project: string;
}

interface ProjectInterface {
    id: string;
    name: string;
    favorite: boolean;
    createdAt: string;
    updatedAt: string;
    user: string;
    workspace: string;
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,.3)',
        boxShadow: theme.shadows[1],
    },
}));

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

function TrashIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 pr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}

function FavoritesIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 pr-1">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
    )
}

function UserIcon(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 pr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    )
}

function CopyToClipboard(props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 pr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
    )
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
}

const Project = () => {
    const { id } = useParams<string>(); 
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [projectItems, setProjectItems] = useState<TodoInterface[]>([])
    const [project, setProject] = useState<ProjectInterface>()
    const [projectInvities, setProjectInvities] = useState<userInivites[]>()
    const authData = useAppSelector(selectAuthData)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenInvite, setIsOpenInvite] = useState<boolean>(false)
    const [isInviteUrl, setIsInviteUrl] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null);
    const [todoStage, setTodoStage] = useState("")
    const [restartEffect, setRestartEffect] = useState(false)
    const [deleteProj, setDeleteProject] = useState(false)
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`projects/${id}`)
                const dataInv = await axios.get(`project-invites/allbyproject/${data.id}`)
                console.log(data)
                setProjectInvities(dataInv.data)
                setProject(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [location.pathname])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`projects-todo/allbyid/${id}`);
                console.log(data)
                setProjectItems(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (authData.user) {
            fetchData();
        }
        
    }, [authData.IsAuth, restartEffect, location.pathname]);
    

    const onOpenModal = (todo_stage:string) => {
        setTodoStage(todo_stage)
        setIsOpen(!isOpen)
    }

    const onSubmit = async (values: {name: string}) => {
        const updatedAt = new Date().toISOString();
        const updatedProject = { ...project, updatedAt };
        try {
            await axios.post("projects-todo/", {todo_name: values.name, todo_stage: todoStage, user: authData.user?.id, project: id})
            await axios.put("projects/update", updatedProject)
            setIsOpen(false)
            setRestartEffect(!restartEffect)
        } catch (e) {
            console.error("Failed create Item in list:", e);
        }
        reset();
    };

    const deleteCard = async (id:string) => {
        const updatedAt = new Date().toISOString();
        const updatedProject = { ...project, updatedAt };
        try {
            await axios.delete(`projects-todo/delete/${id}`)
            await axios.put("projects/update", updatedProject)
            setRestartEffect(!restartEffect)
        } catch (e) {
            console.error("Failed delete item in list:", e)
        }
    }

    const updateCard = async (item: TodoInterface, todo_stage: string) => {
        const updatedAt = new Date().toISOString();
        const updatedProject = { ...project, updatedAt };
        item.todo_stage = todo_stage
        console.log(item)
        try {
            await axios.put(`projects-todo/update/`, item)
            await axios.put("projects/update", updatedProject)
            setRestartEffect(!restartEffect)
        } catch (e) {
            console.error("Failed update item in list:", e)
        }
    }

    const addToFavorite = async () => {
        if (project) {
            const { favorite, ...proj } = project;
            const updatedProject = {...proj, favorite: !favorite, workspace: authData.user?.workspaceId}
            // await axios.put(`projects/update/`, updatedProject)
            await dispatch(fetchUpdateProject(updatedProject))
        }
    }

    const openModalAddNewPerson = async () => {
        try {
            const resData = await axios.post("project-invites/create-invite", project)
            setIsInviteUrl(resData.data.url)
            setIsOpenInvite(!isOpenInvite)
        } catch (e) {
            console.error("Failed to create invite:", e)
            notify("Failed to create invite")
        }
    }

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand('copy');
        }
    };

    const DeleteProject = async () => {
        if (project) {
            await dispatch(fetchDeleteProject({...project, workspace: authData.user?.workspaceId}))
            setDeleteProject(true)
        }
    } 

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId !== source.droppableId) {
            console.log(`Item ${draggableId} moved to ${destination.droppableId}`);
            const item = projectItems?.find(item => item.id === draggableId)
            if (item) {
                await updateCard(item , destination.droppableId);
            }
        }
    };

    const handleOptionCol = async (column: string) => {
        if (column) {
            try {
                await axios.delete(`projects-todo/deleteallbystage/`, { data: { todo_stage: column, user: { id: authData.user?.id }, project: { id: id } } })
                setRestartEffect(!restartEffect)
            } catch (e) {
                console.error("Failed to clear column")
            }
        }
    }

    if (deleteProj) {
        return <Navigate to={`/userworkspace/${authData.user?.workspaceId}`}/>
    }

    return (
        <div className="pt-5">
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} title="Add Card">
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
            <CustomModal isOpen={isOpenInvite} onClose={() => setIsOpenInvite(!isOpenInvite)} title="Invite new person">
                {/* <h1 className="text-base font-medium mb-2">Invite link</h1> */}
                <p className="text-base mb-4">
                    Copy the link below and send it to the person you want to invite. Do not share this link with anyone else.
                </p>
                <div className="flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={isInviteUrl}
                        readOnly
                        className="flex-grow shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]"
                    />
                    <button onClick={() => handleCopy()} className="flex ml-2 px-3 py-1 bg-slate-800 text-white rounded-lg transition-all ease-linear hover:bg-slate-900 cursor-pointer">
                        <CopyToClipboard /> Copy
                    </button>
                </div>
            </CustomModal>
            <ToastContainer />
            <div className="flex items-center justify-between px-4 py-3 mb-2 rounded-xl bg-[rgba(0,0,0,.2)]">
                <h1 className="text-2xl font-medium">{project?.name}</h1>
                <div className="flex items-center">
                    {projectInvities?.map((item, index) => (
                        <CustomTooltip key={index} title={`${item.name}`} placement="bottom">
                            <div className=" w-5 h-5 flex justify-center items-center p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full mr-1 cursor-pointer"><span className="text-xs">{item.name[0]}</span></div>
                        </CustomTooltip>
                    ))}
                    <CustomTooltip title={`${authData.user?.name}`} placement="bottom">
                        <div className=" w-5 h-5 flex justify-center items-center p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full mr-1 cursor-pointer"><span className="text-xs">{authData.user?.name[0]}</span></div>
                    </CustomTooltip>
                    <CustomDropDownMenu button={<button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>}>
                        <MenuItem>
                            <button onClick={() => addToFavorite()} className="flex w-full items-center transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-xs">
                                <FavoritesIcon />{project?.favorite ? 'Remove from favorites' : 'Add to favorites'}
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => openModalAddNewPerson()} className="flex w-full items-center transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-xs">
                                <UserIcon />Add new person
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => DeleteProject()} className="flex w-full items-center transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-xs">
                                <TrashIcon />Delete project
                            </button>
                        </MenuItem>
                    </CustomDropDownMenu>
                    {/* <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button> */}
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 items-start">
                    <Droppable droppableId="todo">
                    {(provided) => (
                        <div
                            className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ overflow: 'auto' }}
                        >
                            <div className="w-full flex justify-between items-center mb-4">
                                <h1 className="text-base font-medium">To do</h1>
                                <CustomDropDownMenu button={<button  className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>}>
                                    <MenuItem>
                                        <button onClick={() => handleOptionCol("todo")} className="flex w-full items-center transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-xs">
                                            Clear All
                                        </button>
                                    </MenuItem>
                                </CustomDropDownMenu>
                                {/* <button onClick={() => handleOptionCol("todo")} className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button> */}
                            </div>
                            {projectItems?.map((item: TodoInterface, index) => (
                                item.todo_stage === "todo" && (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="max-w-[250px] break-all text-sm font-normal text-white">{item.todo_name}</span>
                                                    <div className="flex items-center">
                                                        <button onClick={() => updateCard(item, "doing")} className="transition-all ease-linear text-yellow-300 hover:text-yellow-600"><DoingIcon className="h-4 w-4"/></button>
                                                        <button onClick={() => deleteCard(item.id)} className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-normal text-[rgba(255,255,255,.6)]">{formatDate(item.updatedAt)}</span>
                                                    <CustomTooltip title={item.user.name} placement="bottom">
                                                        <div className="w-5 h-5 flex justify-center items-center p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full mr-1 cursor-pointer"><span className="text-xs">{item.user.name[0]}</span></div>
                                                    </CustomTooltip>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            ))}
                            {provided.placeholder}
                            <button onClick={() => onOpenModal("todo")} className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="doing">
                    {(provided) => (
                        <div
                            className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ overflow: 'auto' }}
                        >
                            <div className="w-full flex justify-between items-center mb-4">
                                <h1 className="text-base font-medium">Doing</h1>
                                <CustomDropDownMenu button={<button  className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>}>
                                    <MenuItem>
                                        <button onClick={() => handleOptionCol("doing")} className="flex w-full items-center transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-xs">
                                            Clear All
                                        </button>
                                    </MenuItem>
                                </CustomDropDownMenu>
                                {/* <button onClick={() => handleOptionCol("doing")} className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button> */}
                            </div>
                            {projectItems?.map((item: TodoInterface, index) => (
                                item.todo_stage === "doing" && (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="max-w-[250px] break-all text-sm font-normal text-white">{item.todo_name}</span>
                                                    <div className="flex items-center">
                                                        <button onClick={() => updateCard(item, "done")} className="transition-all ease-linear text-green-400 hover:text-green-700"><CheckIcon className="h-4 w-4"/></button>
                                                        <button onClick={() => deleteCard(item.id)} className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-normal text-[rgba(255,255,255,.6)]">{formatDate(item.updatedAt)}</span>
                                                    <CustomTooltip title={item.user.name} placement="bottom">
                                                        <div className="w-5 h-5 flex justify-center items-center p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full mr-1 cursor-pointer"><span className="text-xs">{item.user.name[0]}</span></div>
                                                    </CustomTooltip>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            ))}
                            {provided.placeholder}
                            <button onClick={() => onOpenModal("doing")} className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="done">
                    {(provided) => (
                        <div
                            className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ overflow: 'auto' }}
                        >
                            <div className="w-full flex justify-between items-center mb-4">
                                <h1 className="text-base font-medium">Done</h1>
                                <CustomDropDownMenu button={<button  className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>}>
                                    <MenuItem>
                                        <button onClick={() => handleOptionCol("done")} className="flex w-full items-center transition-all ease-linear hover:data-[focus]:bg-[rgba(255,255,255,.2)] rounded-lg p-1 text-xs">
                                            Clear All
                                        </button>
                                    </MenuItem>
                                </CustomDropDownMenu>
                                {/* <button onClick={() => handleOptionCol("done")} className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button> */}
                            </div>
                            {projectItems?.map((item: TodoInterface, index) => (
                                item.todo_stage === "done" && (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="max-w-[250px] break-all text-sm font-normal text-white">{item.todo_name}</span>
                                                    <div className="flex items-center">
                                                        <button onClick={() => deleteCard(item.id)} className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-normal text-[rgba(255,255,255,.6)]">{formatDate(item.updatedAt)}</span>
                                                    <CustomTooltip title={item.user.name} placement="bottom">
                                                        <div className="w-5 h-5 flex justify-center items-center p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full mr-1 cursor-pointer"><span className="text-xs">{item.user.name[0]}</span></div>
                                                    </CustomTooltip>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            ))}
                            {provided.placeholder}
                            <button onClick={() => onOpenModal("done")} className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                        </div>
                    )}
                </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default Project
