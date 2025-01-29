import { NavLink } from "react-router-dom";
import { useAppSelector } from "../Hooks";
import { selectAuthData } from "../../store/Slices/auth";

const Home = () => {
    const authData = useAppSelector(selectAuthData)
    return (
        <div className=" pt-20">
            <div className="flex justify-center items-center ">
                <div className="max-w-96">
                    <h1 className="text-2xl font-medium"><span className="font-semibold text-3xl text-slate-800">Tussent</span> enables you to bring together all your employees, tasks, and tools in one place.</h1>
                    <p className="text-lg font-normal my-1">Integrate everything, even if your team is spread across the globe!</p>
                    <div className="flex items-center my-3">
                        {authData.IsAuth ? (
                            <NavLink className="px-3 py-2 text-base font-medium border-2 border-white rounded-lg transition-all ease-linear hover:bg-[rgba(0,0,0,.3)]" to={`userworkspace/${authData.user?.id}`}>Go to Workspaces</NavLink>
                        ) : (
                            <NavLink className="px-3 py-2 text-base font-medium border-2 border-white rounded-lg transition-all ease-linear hover:bg-[rgba(0,0,0,.3)]" to='/signup'>Sign Up</NavLink>
                        )}
                        {!authData.IsAuth && (
                            <span className="font-normal text-base ml-2 text-slate-800">Register - it`s free!</span>
                        )}
                    </div>
                </div>
                <img className='max-w-[700px] h-auto' src="src/components/Home/img1.png"  alt="" />
            </div>
            
        </div>
    )
}

export default Home;