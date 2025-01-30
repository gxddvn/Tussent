import { useAppDispatch, useAppSelector } from '../../Hooks'
import { fetchUpdateUser, ObjDataInterface, selectAuthData } from '../../../store/Slices/auth'
import CustomModal from '../../CustomModal'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
    const authData = useAppSelector(selectAuthData);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch();


    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            name: "",
            email: "",
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
        if (authData.status === "loaded") {
            const profileData = {
                name: authData.user?.name,
                email: authData.user?.email,
            };
        
            reset(profileData);
        }
    }, [reset, authData.status]);

    const onSubmit = async (values: {name: string, email: string}) => {
        if (authData.user === null) return; 
        const updatedUser:ObjDataInterface = {
            ...authData.user,
            ...values,
            updatedAt: new Date().toISOString(),
        };
        console.log(typeof authData.user)
        try {
            await dispatch(fetchUpdateUser(updatedUser))
            setIsOpen(false)
        } catch (e) {
            console.error("Failed update user:", e);
            notify("Failed update user!")
        }
        reset();
    };

    return (
        <div className='flex-grow flex flex-col items-center pt-10'>
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} title="Change Profile">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="name">Name</label>
                        <span className='text-xs font-medium text-rose-500'>{errors?.name && "Wrong format!"}</span>
                    </div>
                    <input type="text" id="name" className="shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 mb-3 bg-[rgba(0,0,0,0.1)]" {...register("name", { required: "Enter name!" })}/>
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="email">Email</label>
                        <span className='text-xs font-medium text-rose-500'>{errors?.email && "Wrong format!"}</span>
                    </div>
                    <input type="text" id="email" className="shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]" {...register("email", { required: "Enter email!" })}/>
                    <div className="flex justify-center items-center pt-6">
                        <button type="submit" disabled={!isValid} className="px-4 py-2 bg-slate-800 text-white rounded-lg transition-all ease-linear hover:bg-slate-900 cursor-pointer text-sm font-medium">Change</button>
                    </div>
                </form>
            </CustomModal>
            <ToastContainer />
            <div className='flex px-5 py-4 bg-[rgba(0,0,0,.3)] rounded-2xl shadow-md'>
                <div className='flex flex-col items-center'>
                    <span className='rounded-full w-24 h-24 border border-[rgba(255,255,255,.5)] bg-lime-500 flex items-center justify-center text-2xl uppercase mb-2 select-none'>{authData.user?.name[0]}</span>
                    <span className='text-xs font-medium'>@{authData.user?.name}</span>
                </div>
                <div className='flex flex-col mx-5 py-2'>
                    <span className='text-sm font-medium'>Email: {authData.user?.email}</span>
                    <span className='text-sm font-medium'>Name: {authData.user?.name}</span>
                </div>
                <div className='flex flex-col py-2 pl-10'>
                    <button onClick={() => setIsOpen(!isOpen)} className="flex ml-2 px-4 py-1 bg-[rgba(0,0,0,.3)] shadow-md text-white rounded-lg transition-all ease-linear hover:bg-[rgba(0,0,0,.5)] cursor-pointer text-sm font-medium">Change Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile