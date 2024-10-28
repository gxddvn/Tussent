import axios from "../../../axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../Hooks"
import { selectAuthData } from "../../../store/Slices/auth"
import CustomModal from "../../CustomModal";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface TodoInterface {
    id:string;
    todo_name: string;
    todo_stage: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    project: string;
}

interface ProjectInterface {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    workspace: string;
}

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
    const { id } = useParams(); 
    const [projectItems, setProjectItems] = useState([])
    const [project, setProject] = useState<ProjectInterface>()
    const authData = useAppSelector(selectAuthData)
    const [isOpen, setIsOpen] = useState(false)
    const [todoStage, setTodoStage] = useState("")
    const [restartEffect, setRestartEffect] = useState(false)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`projects/${id}`)
                setProject(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

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
        
    }, [authData.IsAuth, restartEffect]);
    

    const onOpenModal = (todo_stage:string) => {
        setTodoStage(todo_stage)
        setIsOpen(!isOpen)
    }

    const onSubmit = async (values: {name: string}) => {
        await axios.post("projects-todo/", {todo_name: values.name, todo_stage: todoStage, user: String(authData.user?.id), project: String(id)})
        setIsOpen(false)
        setRestartEffect(!restartEffect)
        reset();
    };

    const deleteCard = async (id:string) => {
        await axios.delete(`projects-todo/delete/${id}`)
        setRestartEffect(!restartEffect)
    }

    const updateCard = async (item: TodoInterface, todo_stage: string) => {
        item.todo_stage = todo_stage
        console.log(item)
        await axios.put(`projects-todo/update/`, item)
        setRestartEffect(!restartEffect)
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
            <div className="flex items-center justify-between px-4 py-3 mb-2 rounded-xl bg-[rgba(0,0,0,.2)]">
                <h1 className="text-2xl font-medium">{project?.name}</h1>
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
                    {projectItems?.map((item:TodoInterface, index) => (
                        item.todo_stage == "todo" &&  (
                            <div key={index} className="flex items-center justify-between px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                                <span className=" max-w-[250px] break-all text-sm font-normal text-white">{item.todo_name}</span>
                                <div className="flex items-center">
                                    <button onClick={() => updateCard(item, "doing")} className="transition-all ease-linear text-yellow-300 hover:text-yellow-600"><DoingIcon className="h-4 w-4"/></button>
                                    <button onClick={() => deleteCard(item.id)} className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                                </div>
                            </div>
                        )
                    ))}
                    <button onClick={() => onOpenModal("todo")} className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
                <div className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-base font-medium">Doing</h1>
                        <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                    </div>
                    {projectItems?.map((item:TodoInterface, index) => (
                        item.todo_stage == "doing" &&  (
                            <div key={index} className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                                <div className="flex items-center justify-between">
                                    <span className=" max-w-[250px] break-all text-sm font-normal text-white">{item.todo_name}</span>
                                    <div className="flex items-center">
                                    <button onClick={() => updateCard(item, "done")} className="transition-all ease-linear text-green-400 hover:text-green-700"><CheckIcon className="h-4 w-4"/></button>
                                    <button onClick={() => deleteCard(item.id)} className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">{item.updatedAt}</span>
                                    <div className="p-2 border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full cursor-pointer"></div>
                                </div>
                            </div>
                        )
                    ))}
                    <button onClick={() => onOpenModal("doing")} className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
                <div className="flex flex-col mx-2 bg-[rgba(0,0,0,.5)] px-6 py-3 rounded-xl shadow-md">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-base font-medium">Done</h1>
                        <button className="p-1 rounded-lg transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)]"><OptionIcon/></button>
                    </div>
                    {projectItems?.map((item:TodoInterface, index) => (
                        item.todo_stage == "done" &&  (
                            <div key={index} className="flex flex-col px-2 py-1 bg-[rgba(0,0,0,.3)] shadow-md rounded-lg my-1">
                                <div className="flex items-center justify-between">
                                    <span className=" max-w-[250px] break-all text-sm font-normal text-white">{item.todo_name}</span>
                                    <div className="flex items-center">
                                        <button onClick={() => deleteCard(item.id)} className="transition-all ease-linear text-red-500 hover:text-red-800"><CancelIcon className="h-4 w-4"/></button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className=" text-xs font-normal text-[rgba(255,255,255,.6)]">{item.updatedAt}</span>
                                    <div className="p-2 border border-[rgba(255,255,255,.5)] bg-sky-500 rounded-full cursor-pointer"></div>
                                </div>
                            </div>
                        )
                    ))}
                    <button onClick={() => onOpenModal("done")} className="mt-6 flex items-center text-left text-sm font-medium p-1 transition-all ease-linear hover:bg-[rgba(255,255,255,0.2)] rounded-lg"><PlusIcon className="h-5 w-5 mr-1"/>Add card</button>
                </div>
            </div>
        </div>
    )
}

export default Project