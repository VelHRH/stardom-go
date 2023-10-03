import { Edit, Loader2, XCircle } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { ratingColor } from "../utils";

interface MatchProps {
 place: number;
 wrestler1: string;
 wrestler2: string;
 year: number;
 rating: number;
 mutate: KeyedMutator<GrandPrix[]>;
}

const GrandPrixMatch: FC<MatchProps> = ({
 place,
 wrestler1,
 wrestler2,
 year,
 rating,
 mutate,
}) => {
 const [isForm, setIsForm] = useState(false);
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<GrandPrix>({ mode: "onBlur" });

 const [isLoading, setIsLoading] = useState<boolean>(false);

 const deleteMatch = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/5star`, {
   method: "DELETE",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    wrestler2,
    wrestler1,
    rating,
    year,
   }),
  });
  const result = await res.json();
  if (result.message === "Success") mutate();
 };

 const onSubmit = async (data: GrandPrix) => {
  setIsLoading(true);
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/5star`, {
   method: "PUT",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    wrestler2,
    wrestler1,
    rating,
    year,
    newWrestler1: data.wrestler1,
    newWrestler2: data.wrestler2,
    newYear: data.year,
    newRating: data.rating,
   }),
  });
  const response = await res.json();
  if (response.message === "Success") {
   setIsForm(false);
   mutate();
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
        {...register("wrestler1", { required: "Enter wrestler1 name" })}
        className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
        defaultValue={wrestler1}
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
        {...register("wrestler2", { required: "Enter wrestler2 name" })}
        className="border-slate-900 border-2 w-full rounded-md p-2 text-2xl"
        defaultValue={wrestler2}
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
        defaultValue={year}
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
        {Array.from({ length: 7 }, (_, index) => (
         <option
          key={index}
          selected={(20 - index) / 4 === rating ? true : false}
         >
          {(20 - index) / 4}
         </option>
        ))}
       </select>
       {errors.rating && (
        <p className="text-red-600">{errors.rating.message || "Error"}</p>
       )}
      </div>
      <button className="w-full py-2 text-2xl font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-50 rounded-xl cursor-pointer hover:scale-105 duration-300 flex justify-center items-center gap-2">
       {isLoading && <Loader2 className="animate-spin" />}
       Edit
      </button>
     </form>
    </div>
   )}
   <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-1">
    <div className="w-full flex justify-between bg-slate-900 p-3 rounded-xl text-2xl font-semibold items-center">
     <div className="flex gap-2 text-slate-50 items-center w-11/12">
      <p className="text-center w-16">{place}.</p>
      <div className="flex flex-col gap-1 flex-1">
       <p>
        {wrestler1} vs. {wrestler2}
       </p>
      </div>
     </div>
     <p
      style={{ color: ratingColor({ rating }) }}
      className="text-center flex-1"
     >
      {rating}
     </p>
     <Edit
      onClick={() => setIsForm(true)}
      className="text-yellow-500/60 cursor-pointer hover:scale-110 duration-300 hover:text-yellow-500 ml-3"
     />
     <XCircle
      onClick={() => deleteMatch()}
      className="text-red-500/60 cursor-pointer hover:scale-110 duration-300 hover:text-red-500 ml-3"
     />
    </div>
   </div>
  </>
 );
};

export default GrandPrixMatch;
