import { FC } from "react";
import { ratingColor } from "../utils";

interface MatchProps {
 place: number;
 name: string;
 show: string;
 rating: number;
}

const Match: FC<MatchProps> = ({ place, name, show, rating }) => {
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
   </div>
  </div>
 );
};

export default Match;
