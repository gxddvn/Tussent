import React from 'react'

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
    handleClick: (day: string, hour: number, date: string) => void;
    currentDate: Date;
}

function formatDateHoursMinutes(dateString: string): string {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

const CalendarItems: React.FC<CalendarItemsProps> = ({dayOfWeek, calendarData, getDatesOfWeek, handleClick, currentDate}) => {

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
                                    const currentDate1 = getDatesOfWeek(currentDate)[dayOfWeek.indexOf(day)];
                                    if (currentDate1 >= new Date(new Date().setHours(0, 0, 0, 0))) {
                                        handleClick(day, i, currentDate.toISOString());
                                    }
                                }} 
                                className={
                                    "flex flex-col bg-gray-200 px-2 py-4 cursor-pointer transition-all ease-linear hover:bg-gray-300 border-2 border-gray-300"
                                }
                            >
                                {arrayEvent.map((event, index2) => (
                                    <div key={index2} className='min-h-12 p-1 rounded-lg shadow-md bg-[rgba(0,0,0,.4)] flex justify-between my-1 ease-linear transition-all hover:bg-[rgba(0,0,0,.5)] cursor-pointer'>
                                        <div className='flex'>
                                            <span className='text-sm'>{event.name}</span>
                                        </div>
                                        <div className='flex justify-end items-end'>
                                            <span className='text-xs'>{formatDateHoursMinutes(event.date)}</span>
                                        </div>
                                    </div>
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