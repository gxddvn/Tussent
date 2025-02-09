import { toast, ToastContainer } from 'react-toastify';
import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Hooks';
import { selectAuthData } from '../../store/Slices/auth';

interface ProjectInterface {
    id: string;
    name: string;
    favorite: boolean;
    createdAt: string;
    updatedAt: string;
    user: {id: string, name: string};
    workspace: {id: string, createdAt: string, updatedAt: string};
}

const ProjectInvities = () => {
    const [project, setProject] = React.useState<ProjectInterface>()
    const [invite, setInvite] = React.useState<string>()
    const [isDecline, setIsDecline] = useState(false);
    const authData = useAppSelector(selectAuthData)
    const navigate = useNavigate();

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
        if (authData.status === 'loaded' && !authData.IsAuth) {navigate('/')}
        else {
            const query = new URLSearchParams(window.location.search)
            const fetchData = async () => {
                try {
                    const { data } = await axios.get(`projects/${query.get('project')}`)
                    console.log(data)
                    setProject(data)
                    setInvite(query.get('invite') || '')
                } catch (error) {
                    console.error("Error fetching project data:", error)
                    notify("Error fetching project data")
                }
            }
            fetchData()
        }
    }, [])

    const acceptInvite = async () => {
        console.log(authData.user)
        try {
            const res = await axios.post(`project-invites/accept/`, {project: project, invite: invite, user: authData.user})
            console.log(res.data)
            notify("Invite accepted")
        } catch (error) {
            console.error("Error accepting invite:", error)
            notify("Error accepting invite")
        }
    }

    if (isDecline) return <Navigate to='/' />

    if (!authData.IsAuth && (authData.status == "loaded" || authData.status == "error")) {
        return <Navigate to='/' />
    }
    
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <ToastContainer />
            <div className='max-w-80 flex flex-col items-center bg-[rgba(0,0,0,.35)] backdrop-blur-md rounded-lg shadow-lg p-4'>
                <h1 className='font-bold text-2xl'>Invite</h1>
                <p className='select-none my-5 flex justify-center items-center w-14 h-14 text-2xl border border-[rgba(255,255,255,.5)] bg-lime-500 rounded-full'>{project?.user.name[0]}</p>
                {project && (
                    <p className='text-center text-xs'>
                        User <span className='font-bold text-xs'>{project?.user?.name}</span> has invited you to join the project "<span className='font-bold text-xs'>{project?.name}</span>".
                    </p>
                )}
                {!project && (
                    <p>Loading project details...</p>
                )}
                <div className='flex justify-center items-center w-full mt-5'>
                    <button onClick={() => acceptInvite()} className='flex ml-2 px-3 py-1 bg-slate-800 text-slate-100 font-bold text-sm rounded-lg transition-all ease-linear hover:bg-slate-900 cursor-pointer'>Accept</button>
                    <span className='mx-2'> or </span>
                    <button onClick={() => setIsDecline(!isDecline)} className='flex ml-2 px-3 py-1 bg-red-500 text-slate-1s00 font-bold text-xs rounded-lg transition-all ease-linear hover:bg-red-700 cursor-pointer'>Decline</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectInvities