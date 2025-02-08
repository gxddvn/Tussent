import React, { useState } from 'react'
import CustomModal from '../../../../CustomModal'
import axios from '../../../../../axios'
import { toast } from 'react-toastify'

interface User {
    createdAt: string
    email: string
    exp: number
    iat: number
    id: string
    name: string
    updatedAt: string
    workspaceId: string

}

interface CalendarProps {
    id: string;
    name: string;
    date: string;
    user: User
    createdAt: Date;
    updatedAt: Date;

}

interface EventProps {
    event: CalendarProps;
    refOpen: React.MutableRefObject<boolean>;
    refClose: React.MutableRefObject<boolean>;
    setEventReload: React.Dispatch<React.SetStateAction<boolean>>;
    eventReload: boolean;
}

function formatDateHoursMinutes(dateString: string): string {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

const Event: React.FC<EventProps> = ({event, refOpen, refClose, setEventReload, eventReload, }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

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

    const handleClick = () => {
        refOpen.current = true
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        refOpen.current = false
        refClose.current = true
        setIsOpen(!isOpen)
    }

    const handleDelete = () => {
        try {
            axios.delete(`/calendar/${event.id}`)
            refOpen.current = false
            refClose.current = true
            setEventReload(!eventReload)
        } catch (e) {
            console.error("Failed delete event:", e);
            notify("Failed delete event!")
        } 
    }
    return (
        <div>
            <div onClick={handleClick} className='min-h-12 p-1 rounded-lg shadow-md bg-[rgba(0,0,0,.4)] flex justify-between my-1 ease-linear transition-all hover:bg-[rgba(0,0,0,.5)] cursor-pointer'>
                <div className='flex'>
                    <span className='text-sm'>{event?.name}</span>
                </div>
                <div className='flex justify-end items-end'>
                    <span className='text-xs'>{formatDateHoursMinutes(event?.date)}</span>
                </div>
            </div>
            <CustomModal isOpen={isOpen} onClose={handleClose} title="Event info">
                <div className="flex flex-col max-w-52">
                    <div className='flex mb-2'>
                        <span className='text-lg font-medium break-all'>Text: {event?.name}</span>
                    </div>
                    <div className='flex'>
                        <span className='text-base font-medium'>Date: {formatDateHoursMinutes(event?.date)}</span>
                    </div>
                    <div className='flex justify-end mt-5'>
                        <button onClick={handleDelete} className='px-4 py-2 bg-slate-800 text-white rounded-lg transition-all ease-linear hover:bg-slate-900 cursor-pointer text-sm font-medium'>Delete</button>
                    </div>
                </div>
            </CustomModal>
        </div>
        
    )
}

export default Event