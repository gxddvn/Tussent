import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div className=" min-h-full pt-20">
            <div className="flex justify-center items-center ">
                <div className="max-w-96">
                    <h1 className="text-2xl font-medium"><span className="font-semibold text-3xl text-slate-800">Tussent</span> enables you to bring together all your employees, tasks, and tools in one place.</h1>
                    <p className="text-lg font-normal my-1">Integrate everything, even if your team is spread across the globe!</p>
                    <div className="flex items-center my-3">
                        <NavLink className="px-3 py-2 text-base font-medium border-2 border-white rounded-lg transition-all ease-linear hover:bg-[rgba(0,0,0,.3)]" to='/signup'>Sign Up</NavLink>
                        <span className="font-normal text-base ml-2 text-slate-800">Register - it`s free!</span>
                    </div>
                </div>
                <img className='max-w-2xl' src="src/components/Home/img1.png" width={`700px`} alt="" />
            </div>
            
        </div>
    )
}

export default Home;