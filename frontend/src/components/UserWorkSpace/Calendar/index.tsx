import { useState, useEffect, useRef } from "react";
import CustomModal from "../../CustomModal";
import { useForm } from "react-hook-form";
import { selectAuthData } from "../../../store/Slices/auth";
import { useAppSelector } from "../../Hooks";
import axios from "../../../axios";
import { toast, ToastContainer } from "react-toastify";
import CalendarItems from "./CalendarItems";

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

const Calendar = () => {
    const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDate, setIsDate] = useState<string>();
    const [calendarData, setCalendarData] = useState<CalendarProps[]>([]);
    const [eventReload, setEventReload] = useState<boolean>(false);
    const authData = useAppSelector(selectAuthData);
    const refOpen = useRef(false)

    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            name: "",
            time: "",
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
        const dayOfWeek = (startOfWeek.getDay() + 6) % 7;
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

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear()));
    }, [currentDate]);

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`/calendar/user/${authData.user?.id}`)
            console.log(data.data)
            setCalendarData(data.data)
        }
        if (authData.status === "loaded") {
            fetchData()
        }
    }, [authData.status, eventReload]);

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
                const firstDayOfWeek = (startOfMonth.getDay() + 6) % 7;
                const firstDateOfWeek = new Date(startOfMonth.setDate(startOfMonth.getDate() - firstDayOfWeek + (weekIndex * 7)));
                setCurrentDate(firstDateOfWeek);
            }
        }
    };

    const handleClick = (date: string) => {
        setIsDate(date)
        setIsOpen(!isOpen);
    };

    const onSubmit = async (data: { name: string, time: string }) => {
        setIsOpen(!isOpen)
        const updatedDate = new Date(isDate as string);
        const dateNow = new Date()
        const [hours, minutes] = data.time.split(":").map(Number);
        updatedDate.setHours(hours, minutes);
        if (updatedDate < dateNow) {
            notify("Time already left")
            return;
        }
        try {
            await axios.post("/calendar/", {name: data.name, date: updatedDate.toISOString(), user: authData.user})
            setEventReload(!eventReload)
        } catch (e) {
            console.error("Failed create event:", e);
            notify("Failed create event!")
        }
        reset();
    }
    return (
        <div className="flex flex-col h-screen px-5 pt-5 pb-3 overflow-y-auto">
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} title="Create Event">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="name">Text</label>
                        <span className='text-xs font-medium text-rose-500'>{errors?.name && "Wrong format!"}</span>
                    </div>
                    <input type="text" id="name" className="shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 mb-3 bg-[rgba(0,0,0,0.1)]" {...register("name", { required: "Enter name!" })}/>
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="time">Time</label>
                        <span className='text-xs font-medium text-rose-500'>{errors?.time && "Wrong format!"}</span>
                    </div>
                    <input type="time" id="time" className="shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]" {...register("time", { required: "Enter time!" })}/>
                    <div className="flex justify-center items-center pt-6">
                        <button type="submit" disabled={!isValid} className="px-4 py-2 bg-slate-800 text-white rounded-lg transition-all ease-linear hover:bg-slate-900 cursor-pointer text-sm font-medium">Create</button>
                    </div>
                </form>
            </CustomModal>
            <ToastContainer />
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
                    <CalendarItems 
                        dayOfWeek={dayOfWeek} 
                        calendarData={calendarData} 
                        getDatesOfWeek={getDatesOfWeek} 
                        handleClick={handleClick} 
                        currentDate={currentDate}
                        setEventReload={setEventReload}
                        eventReload={eventReload}
                        refOpen={refOpen}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calendar;
