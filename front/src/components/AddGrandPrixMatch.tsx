import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const AddGrandPrixMatch: FC = () => {
 const [isForm, setIsForm] = useState<boolean>(false);
 const [isLoading, setIsLoading] = useState<boolean>(false);

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<GrandPrix>({ mode: "onBlur" });

 const onSubmit = async (data: GrandPrix) => {
  setIsLoading(true);
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/5Star`, {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
  });
  const response = await res.json();
  if (response.message === "Success") {
   window.location.reload();
  }
  setIsLoading(false);
 };

 return (
  <>
   {isForm && (
    <div className="fixed w-screen h-screen top-0 left-0 z-10">
     <div
      className="w-screen h-screen bg-slate-900/70 cursor-pointer absolute z-40"
      onClick={() => setIsForm(false)}
     ></div>
     <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-1/3 bg-slate-50 flex items-center p-5 flex-col gap-5"
     >
      <div className="w-full flex flex-col items-center">
       <input
        {...register("wrestler1", { required: "Enter wrestler1" })}
        className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
        placeholder="Wrestler1"
       />
       <div className="h-2">
        {errors.wrestler1 && (
         <p className="text-red-600">{errors.wrestler1.message || "Error"}</p>
        )}
       </div>
      </div>
      <div className="w-full flex flex-col items-center">
       <input
        {...register("wrestler2", { required: "Enter wrestler2" })}
        className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
        placeholder="Wrestler2"
       />
       <div className="h-2">
        {errors.wrestler2 && (
         <p className="text-red-600">{errors.wrestler2.message || "Error"}</p>
        )}
       </div>
      </div>
      <div className="w-full flex flex-col items-center">
       <input
        {...register("year", { valueAsNumber: true, required: "Enter a year" })}
        className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
        defaultValue={2022}
        placeholder={"Year"}
       />
       <div className="h-2">
        {errors.year && (
         <p className="text-red-600">{errors.year.message || "Error"}</p>
        )}
       </div>
      </div>
      <div className="w-full flex flex-col items-center">
       <select
        {...register("rating", {
         valueAsNumber: true,
         required: "Choose rating",
        })}
        className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
       >
        <option disabled selected></option>
        {Array.from({ length: 7 }, (_, index) => (
         <option key={index}>{(20 - index) / 4}</option>
        ))}
       </select>
       {errors.rating && (
        <p className="text-red-600">{errors.rating.message || "Error"}</p>
       )}
      </div>
      <button className="w-full py-2 text-2xl font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-50 rounded-xl cursor-pointer hover:scale-105 duration-300 flex justify-center items-center gap-2">
       {isLoading && <Loader2 className="animate-spin" />}
       Add
      </button>
     </form>
    </div>
   )}
   <button
    onClick={() => setIsForm(true)}
    className="w-full rounded-xl bg-gradient-to-r from-green-600 to-lime-500 uppercase text-center py-2 font-bold hover:scale-105 duration-300"
   >
    Add match
   </button>
  </>
 );
};

export default AddGrandPrixMatch;
