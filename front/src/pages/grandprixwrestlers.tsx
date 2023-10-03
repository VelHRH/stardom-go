import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import GpMenu from "../components/GpMenu";
import YearButton from "../components/YearButton";

import { fetcher } from "../utils";

const GrandPrixWrestlers: FC = () => {
 const navigate = useNavigate();
 const [searchParams, setSearchParams] = useSearchParams();
 const { data, isLoading, error } = useSWR<
  { wrestlerName: string; avgRating: number }[]
 >("/5Star/byWrestler", fetcher);
 if (isLoading) return <div className="text-white">Loading...</div>;
 if (error || !data) {
  navigate("/");
 } else if ("message" in data) {
  searchParams.set("unauthorised", "true");
  setSearchParams(searchParams);
  return <div></div>;
 }

 return (
  <>
   <div className="flex my-5 gap-3 justify-center">
    <YearButton
     onClick={() => {
      searchParams.delete("year");
      setSearchParams(searchParams);
     }}
     isClicked={!searchParams.get("year") ? true : false}
    >
     2022
    </YearButton>
   </div>
   <GpMenu />
   <>
    {data?.map((wrestler, i) => (
     <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-1 mt-2">
      <div className="w-full flex justify-between bg-slate-900 p-3 rounded-xl text-2xl font-semibold items-center">
       <div className="flex gap-2 text-slate-50 items-center w-11/12">
        <p className="text-center w-16">{i + 1}.</p>
        <div className="flex flex-col gap-1 flex-1">
         <p>{wrestler.wrestlerName}</p>
        </div>
       </div>
       <p style={{ color: "white" }} className="text-center flex-1">
        {wrestler.avgRating.toFixed(2)}
       </p>
      </div>
     </div>
    ))}
   </>
  </>
 );
};

export default GrandPrixWrestlers;
