import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";

interface ConfirmEmailProps {
    isCode: string;
    onClose: () => void;
    notify: (mess:string) => void;
}

interface formValue2 {
    code: string;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({isCode, onClose, notify}) => {
    const {
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({ 
        defaultValues: {
            code: ""
        }, 
        mode: "onBlur",
    });

    const onSubmit = async (value:formValue2) => {
        console.log(value)
        if (value.code == isCode) {
            console.log("Confirmed!")
        }
        else {
            console.log("Wrong Code!")
            notify("Wrong Code!");
        }
        onClose();
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mr-2 my-1">
                <div className="flex items-center justify-between">
                    <label className="text-base font-medium" htmlFor="code">Enter Confirm Code</label>
                    <span className='ml-2 text-xs font-medium text-rose-400'>{errors?.code && "Wrong format*"}</span>
                </div>
                <input type="text" id="code" aria-invalid={errors.code ? "true" : "false"} className=" shadow-md border-2 border-slate-800 rounded-lg text-base font-medium px-3 py-1 bg-[rgba(0,0,0,0)]" {...register("code", { required: "Enter code!" })}/>
            </div>
            <div className="flex justify-center items-center mt-4 mb-3">
                <button type="submit" disabled={!isValid} className="px-6 py-2 shadow-md border-2 border-slate-800 rounded-xl text-base font-medium cursor-pointer  transition-all ease-linear hover:bg-slate-800 hover:text-white">Confirm</button>
            </div>
            {/* <ToastContainer /> */}
        </form>
    )
}

export default ConfirmEmail