import { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat" , "Sun"]
    
    const handleMonthChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(Number(e.target.value));
        setCurrentDate(newDate);
    };

    const handleDateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(currentDate);
        newDate.setDate(Number(e.target.value));
        setCurrentDate(newDate);
    };

    const getDaysInMonth = (month:number, year:number) => {
        const items:string[] = [];
        let numDays = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < numDays; i++) {
            items.push(`${i}`)
        }
        return items;
    };

    const getWeeksInMonth = (month: number, year: number) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const fullWeeks = Math.ceil(daysInMonth/7);
        const items:number[] = [];
        for (let i = 0; i < fullWeeks; i++) {
            items.push(i)
        }
        return items;
    };

    // console.log(getWeeksInMonth(currentDate.getMonth(), currentDate.getFullYear()))

    return (
        <div className="flex flex-col h-screen px-5 pt-5 pb-16">
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
                    {getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear()).map((day, index) => (
                        <option key={index} value={Number(day)+1} className="text-sm font-medium text-white bg-none">{Number(day)+1==new Date().getDate() ? `Today` : `${Number(day)+1}`}</option>
                    ))}
                </select>
                <select className="ml-2 text-lg font-medium p-1 rounded-lg text-white bg-[rgba(0,0,0,.3)] shadow-md">
                    <option defaultValue={"Week"} className="text-sm font-medium text-white bg-none">Week</option>
                    {getWeeksInMonth(currentDate.getMonth(), currentDate.getFullYear()).map((week, index) => (
                        <option key={index} value={week+1} className="text-sm font-medium text-white bg-none">{week+1}</option>
                    ))}
                </select>
            </div>
            <table className="bg-slate-200 rounded-xl mt-2 shadow-md w-full">
                <thead>
                    <tr className="grid grid-cols-7 gap-2">
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="grid grid-cols-7 gap-2">
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                    </tr>
                    <tr className="grid grid-cols-7 gap-2">
                        <th className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                            <span className="text-base font-medium">Mon</span>
                            <span className="text-base font-medium">3</span>
                        </th>
                    </tr>
                </tbody>
            </table>
            {/* <div className="h-full grid grid-cols-7 bg-slate-200 rounded-xl mt-2 shadow-md">
                <div className="p-2">
                    <div className="flex flex-col items-center bg-[rgba(0,0,0,.3)] rounded-lg shadow-md">
                        <span className="text-base font-medium">Mon</span>
                        <span className="text-base font-medium">3</span>
                    </div>
                    <div className="grid py-5">
                        <div className="border border-slate-800 min-h-10"></div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Calendar