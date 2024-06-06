import { useState, useEffect } from "react";

const Calendar = () => {
    const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [selectedTime, setSelectedTime] = useState<{ day: string, hour: number } | null>(null);
    const [blockTexts, setBlockTexts] = useState<{ day: string, hour: number, text: string }[]>([]);

    const getDaysInMonth = (month: number, year: number): string[] => {
        const items: string[] = [];
        let numDays = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < numDays; i++) {
            items.push(`${i}`);
        }
        return items;
    };

    const getWeeksInMonth = (month: number, year: number): number[] => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const fullWeeks = Math.ceil(daysInMonth / 7);
        const items: number[] = [];
        for (let i = 0; i < fullWeeks; i++) {
            items.push(i);
        }
        return items;
    };

    const getDatesOfWeek = (date: Date): Date[] => {
        const startOfWeek = new Date(date);
        const dayOfWeek = (startOfWeek.getDay() + 6) % 7; // Переместить воскресенье в конец
        const diffToStart = startOfWeek.getDate() - dayOfWeek;
        const startDate = new Date(startOfWeek.setDate(diffToStart));

        const datesOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            datesOfWeek.push(currentDay);
        }
        return datesOfWeek;
    };

    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState<string[]>([]);

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear()));
    }, [currentDate]);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(Number(e.target.value));
        setCurrentDate(newDate);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(currentDate);
        newDate.setDate(Number(e.target.value));
        setCurrentDate(newDate);
    };

    const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== "Week") {
            const weekIndex = Number(e.target.value) - 1;
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            if (weekIndex === 0) {
                setCurrentDate(startOfMonth);
            } else {
                const firstDayOfWeek = (startOfMonth.getDay() + 6) % 7; // Переместить воскресенье в конец
                const firstDateOfWeek = new Date(startOfMonth.setDate(startOfMonth.getDate() - firstDayOfWeek + (weekIndex * 7)));
                setCurrentDate(firstDateOfWeek);
            }
        }
    };

    const handleClick = (day: string, hour: number) => {
        setSelectedTime({ day, hour });
        const currentDate = getDatesOfWeek(new Date())[dayOfWeek.indexOf(day)];
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        
        const existingBlockIndex = blockTexts.findIndex(block => block.day === day && block.hour === hour);
        
        if (existingBlockIndex !== -1) {
            // Если блок уже содержит текст, можно его изменить или оставить без изменений
            setBlockTexts(prevBlocks => {
                const updatedBlocks = [...prevBlocks];
                updatedBlocks[existingBlockIndex] = { ...updatedBlocks[existingBlockIndex], text: `${date}.${month + 1}, ${hour}:00` };
                return updatedBlocks;
            });
        } else {
            // Если блок не содержит текст, добавить новый
            setBlockTexts(prevBlocks => [...prevBlocks, { day, hour, text: `${date}.${month + 1}, ${hour}:00` }]);
        }
    };

    const CalendarTime = () => {
        let items = [];
        for (let i = 0; i < 24; i++) {
            items.push(
                <div key={i} className="grid grid-cols-7 gap-2 relative">
                    {dayOfWeek.map((day, index) => {
                        const blockText = blockTexts.find(block => block.day === day && block.hour === i);
                        return (
                            <div 
                                key={index} 
                                attribute-day={day} 
                                onClick={() => handleClick(day, i)} 
                                className={
                                    selectedTime?.day === day && selectedTime?.hour === i 
                                    ? "bg-red-200 px-2 py-4 cursor-pointer transition-all ease-linear hover:bg-red-300 border-2 border-red-300" 
                                    : "bg-gray-200 px-2 py-4 cursor-pointer transition-all ease-linear hover:bg-gray-300 border-2 border-gray-300"
                                }
                            >
                                {blockText?.text}
                            </div>
                        );
                    })}
                    <span className="absolute bottom-1 cursor-default text-sm font-medium text-gray-400">{i}</span>
                </div>
            );
        }
        return items;
    };

    return (
        <div className="flex flex-col h-screen px-5 pt-5 pb-16 overflow-y-scroll">
            <div className="flex items-center bg-[rgba(0,0,0,.3)] px-5 py-4 rounded-2xl shadow-md">
                <select value={currentDate.getMonth()} onChange={handleMonthChange} className="text-lg font-medium p-1 rounded-lg text-white bg-[rgba(0,0,0,.3)] shadow-md">
                    <option className="text-sm font-medium text-white bg-none" value="0">January</option>
                    <option className="text-sm font-medium text-white" value="1">February</option>
                    <option className="text-sm font-medium text-white" value="2">March</option>
                    <option className="text-sm font-medium text-white" value="3">April</option>
                    <option className="text-sm font-medium text-white" value="4">May</option>
                    <option className="text-sm font-medium text-white" value="5">June</option>
                    <option className="text-sm font-medium text-white" value="6">July</option>
                    <option className="text-sm font-medium text-white" value="7">August</option>
                    <option className="text-sm font-medium text-white" value="8">September</option>
                    <option className="text-sm font-medium text-white" value="9">October</option>
                    <option className="text-sm font-medium text-white" value="10">November</option>
                    <option className="text-sm font-medium text-white" value="11">December</option>
                </select>
                <select value={currentDate.getDate()} onChange={handleDateChange} className="ml-2 text-lg font-medium p-1 rounded-lg text-white bg-[rgba(0,0,0,.3)] shadow-md">
                    {daysInMonth.map((day, index) => (
                        <option key={index} value={Number(day) + 1} className="text-sm font-medium text-white bg-none">{Number(day) + 1 == new Date().getDate() && currentDate.getMonth() == new Date().getMonth() ? `Today` : `${Number(day) + 1}`}</option>
                    ))}
                </select>
                <select onChange={handleWeekChange} className="ml-2 text-lg font-medium p-1 rounded-lg text-white bg-[rgba(0,0,0,.3)] shadow-md">
                    <option defaultValue={"Week"} className="text-sm font-medium text-white bg-none">Week</option>
                    {getWeeksInMonth(currentDate.getMonth(), currentDate.getFullYear()).map((week, index) => (
                        <option key={index} value={week + 1} className="text-sm font-medium text-white bg-none">{week + 1}</option>
                    ))}
                </select>
            </div>
            <div className="grid bg-[rgba(0,0,0,.3)] rounded-xl mt-2 shadow-md p-2">
                <div className=" grid grid-cols-7 gap-2">
                    {dayOfWeek.map((day, index) => {
                        const isToday = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
                        return (
                            <div key={index} className={isToday === index ? "flex flex-col items-center bg-[rgba(255,255,255,.3)] rounded-lg shadow-md" : "flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md"}>
                                <span className="text-base font-medium">{day}</span>
                                <span className="text-base font-medium">{getDatesOfWeek(currentDate)[index].getDate()}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="grid mt-2 rounded-lg overflow-hidden">
                    {CalendarTime().map((item, index) => (
                        <div className="shadow-md" key={index}>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
