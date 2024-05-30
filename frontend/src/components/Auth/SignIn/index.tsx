import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const SignIn = () => {

    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            email: "",
            password: "",
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values:any) => {
        console.log(values)
        // reset();
        // const data = await dispatch(fetchAuth(values));
        // if (!data.payload) {
        //     alert("Не вдалось авторизуватися, не правильний пароль або пошта!");
        // }
    };

    return (
        <div className="flex items-center justify-center mt-16">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-7 py-6 rounded-2xl mx-auto shadow-lg border-4 border-white text-white bg-[rgba(0,0,0,.2)]">
                <h1 className="font-semibold text-2xl text-center mb-4">Sign In</h1>
                <div className="flex flex-col my-1">
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="email">Email</label>
                        <span className='text-xs font-medium text-rose-400'>{errors?.email && "Incorrect format!"}</span>
                    </div>
                    <input required type="email" id="email" className="shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]" {...register("email", { required: "Enter email!" })}/>
                </div>
                <div className="flex flex-col my-1">
                    <div className="flex items-center justify-between">
                        <label className="text-base font-medium" htmlFor="password">Password</label>
                        <span className='text-xs font-medium text-rose-400'>{errors?.password && "Incorrect format!"}</span>
                    </div>
                    <input required type="password" id="password" className="shadow-md border-2 border-white rounded-lg text-base px-3 py-1 bg-[rgba(0,0,0,0.1)]"  {...register("password", { required: "Enter password!" })}/>
                </div>
                <div className="flex justify-center items-center mt-4 mb-3">
                    <button type="submit" disabled={!isValid} className="bg-[rgba(0,0,0,0.1)] px-6 py-2 shadow-md border-2 border-white rounded-xl text-base font-medium cursor-pointer  transition-all ease-linear hover:bg-white hover:text-slate-800">Login</button>
                </div>
                <p className="text-sm font-normal text-center">Don't have an account? <NavLink className="text-sm font-medium text-cyan-400 transition-all ease-linear hover:text-cyan-950" to='/signup'>Sign Up</NavLink></p>
            </form>
        </div>
    )
}

export default SignIn