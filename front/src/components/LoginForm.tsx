import { FC } from "react";
import { useForm } from "react-hook-form";

interface FormData {
 email: string;
 password: string;
}

const LoginForm: FC = () => {
 const { register, handleSubmit } = useForm<FormData>();

 const onSubmit = async (data: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/login`, {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
  });
  const user = await res.json();
  if (user.message === "Success") {
   localStorage.setItem("user", JSON.stringify(user.user));
   window.location.reload();
  }
 };

 return (
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-1/3 bg-slate-50 flex items-center p-5 flex-col gap-5"
  >
   <input
    {...register("email")}
    className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
   />
   <input
    {...register("password")}
    className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
   />
   <input
    type="submit"
    value="Log In"
    className="w-full text-center py-2 text-2xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-50 rounded-xl cursor-pointer hover:scale-105 duration-300"
   />
  </form>
 );
};

export default LoginForm;
