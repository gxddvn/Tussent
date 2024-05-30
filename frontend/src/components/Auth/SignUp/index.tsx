import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import CustomModal from "../../CustomModal";
import ConfirmEmail from "./ConfirmEmail";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface formValue {
    email: string;
    name: string;
    password: string;
    con_pass: string;
}

const SignUp = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isCode, setIsCode] = useState("")
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

    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            email: "",
            name: "",
            password: "",
            con_pass: "",
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (values:formValue) => {
        console.log(values)
        if(values.password == values.con_pass) {
            console.log("Send confirm message on email!")
            setIsCode("4556")
            setIsOpen(true);
        }
        else {
            notify("Wrong password")
        }
        // reset();
        // const data = await dispatch(fetchAuth(values));
        // if (!data.payload) {
        //     alert("Не вдалось авторизуватися, не правильний пароль або пошта!");
        // }
    };

    

    return (
        <div className=" relative flex items-center justify-center mt-16">
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} title="Confirm email">
                <ConfirmEmail isCode={isCode} onClose={() => setIsOpen(!isOpen)} notify={() => notify("Wrong Code!")}/>
            </CustomModal>
            <div className="text-base font-normal text-slate-800">
                <ToastContainer />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-7 py-6 rounded-2xl mx-auto shadow-lg border-4 border-white text-white bg-[rgba(0,0,0,.2)]">
                <h1 className="font-semibold text-2xl text-center mb-4">Sign Up</h1>
                <div className="flex justify-between">
                    <div className="flex flex-col mr-2 my-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium" htmlFor="email">Email</label>
                            <span className='text-xs font-medium text-rose-400'>{errors?.email && "Wrong format*"}</span>
                        </div>
                        <input type="email" id="email" aria-invalid={errors.email ? "true" : "false"} className="max-w-[330px] shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]" {...register("email", { required: "Enter email!" })}/>
                    </div>
                    <div className="flex flex-col ml-2 my-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium" htmlFor="name">Name</label>
                            <span className='text-xs font-medium text-rose-400'>{errors?.name && "Wrong format*"}</span>
                        </div>
                        <input type="text" id="name" aria-invalid={errors.name ? "true" : "false"} className=" max-w-[330px] shadow-md border-2 border-white rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0.1)]" {...register("name", { required: "Enter name!" })}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col mr-2 my-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <span className='text-xs font-medium text-rose-400'>{errors?.password && "Wrong format*"}</span>
                        </div>
                        <input type="password" id="password" aria-invalid={errors.password ? "true" : "false"} className="max-w-[330px] shadow-md border-2 border-white rounded-lg text-base px-3 py-1 bg-[rgba(0,0,0,0.1)]"  {...register("password", { required: "Enter password!", pattern: {value: /[A-Z a-z 0-9]{4}/, message:"Password min 4 symbols"} })}/>
                    </div>
                    <div className="flex flex-col ml-2 my-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium" htmlFor="con_password">Confirm Password</label>
                            <span className='text-xs font-medium text-rose-400'>{errors?.con_pass && "Wrong format*"}</span>
                        </div>
                        <input type="password" id="con_password" aria-invalid={errors.con_pass ? "true" : "false"} className=" max-w-[330px] shadow-md border-2 border-white rounded-lg text-base px-3 py-1 bg-[rgba(0,0,0,0.1)]"  {...register("con_pass", { required: "Enter confirm password!", pattern: {value: /[A-Z a-z 0-9]{4}/, message:"Password min 4 symbols"} })}/>
                    </div>
                </div>
                
                <div className="flex justify-center items-center mt-4 mb-3">
                    <button type="submit" disabled={!isValid} className=" bg-[rgba(0,0,0,0.1)] px-6 py-2 shadow-md border-2 border-white rounded-xl text-base font-medium cursor-pointer  transition-all ease-linear hover:bg-white hover:text-slate-800">Registration</button>
                </div>
                <p className="text-sm font-normal text-center">Already have an Tussent account? <NavLink className="text-sm font-medium text-cyan-400 transition-all ease-linear hover:text-cyan-950" to='/signin'>Sign In</NavLink></p>
            </form>
        </div>
    )
}

export default SignUp