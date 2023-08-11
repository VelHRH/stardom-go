import { XCircle } from "lucide-react";
import { FC } from "react";
import { KeyedMutator } from "swr";
import { ratingColor } from "../utils";

interface MatchProps {
 place: number;
 name: string;
 show: string;
 rating: number;
 mutate: KeyedMutator<Match[]>;
}

const Match: FC<MatchProps> = ({ place, name, show, rating, mutate }) => {
 const deleteMatch = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/match`, {
   method: "DELETE",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    match: name,
    show,
   }),
  });
  const result = await res.json();
  if (result.message === "Success") mutate();
 };
 return (
  <div className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-1">
   <div className="w-full flex justify-between bg-slate-900 p-3 rounded-xl text-2xl font-semibold items-center">
    <div className="flex gap-2 text-slate-50 items-center w-11/12">
     <p className="text-center w-16">{place}.</p>
     <div className="flex flex-col gap-1 flex-1">
      <p>{name}</p>
      <p className="text-xl text-slate-300">{show}</p>
     </div>
    </div>
    <p
     style={{ color: ratingColor({ rating }) }}
     className="text-center flex-1"
    >
     {rating}
    </p>
    <XCircle
     onClick={() => deleteMatch()}
     className="text-red-500/50 cursor-pointer hover:scale-110 duration-300 hover:text-red-500"
    />
   </div>
  </div>
 );
};

export default Match;
