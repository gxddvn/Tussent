import React, { useEffect, useRef } from 'react'
import Event from './Event'

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

interface CalendarItemsProps {
    dayOfWeek: string[];
    calendarData: CalendarProps[] | [];
    getDatesOfWeek: (date: Date) => Date[];
    handleClick: (date: string) => void;
    currentDate: Date;
    setEventReload: React.Dispatch<React.SetStateAction<boolean>>;
    eventReload: boolean;
    refOpen: React.MutableRefObject<boolean>;
}

const CalendarItems: React.FC<CalendarItemsProps> = ({dayOfWeek, calendarData, getDatesOfWeek, handleClick, currentDate, setEventReload, eventReload, refOpen}) => {
    const refClose = useRef(false)

    return (
        <div>
            {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="grid grid-cols-7 gap-2 relative">
                    {dayOfWeek.map((day, index) => {
                        let arrayEvent: CalendarProps[] = calendarData.filter(event => new Date(event.date).getHours() === i && new Date(event.date).getDate() === getDatesOfWeek(currentDate)[index].getDate());
                        return (
                            <div 
                                key={index} 
                                attribute-day={day} 
                                onClick={() => {
                                    if (refOpen.current) { return; };
                                    if (!refClose.current && !refOpen.current) {
                                        const currentDate1 = getDatesOfWeek(currentDate)[dayOfWeek.indexOf(day)];
                                        if (currentDate1 >= new Date(new Date().setHours(0, 0, 0, 0))) {
                                            handleClick(currentDate.toISOString());
                                        }
                                        return;
                                    }
                                    refOpen.current = false
                                    refClose.current = false
                                }} 
                                className={
                                    "flex flex-col bg-gray-200 px-2 py-4 cursor-pointer transition-all ease-linear hover:bg-gray-300 border-2 border-gray-300"
                                }
                            >
                                {arrayEvent.map((event, index2) => (
                                    <Event key={index2} event={event} refOpen={refOpen} refClose={refClose} setEventReload={setEventReload} eventReload={eventReload} />
                                ))}
                            </div>
                        );
                    })}
                    <span className="absolute bottom-1 cursor-default text-sm font-medium text-gray-400">{i}</span>
                </div>
            ))}
        </div>
    )
}

export default CalendarItems