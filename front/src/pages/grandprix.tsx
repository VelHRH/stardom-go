import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import AddGrandPrixMatch from "../components/AddGrandPrixMatch";
import GpMenu from "../components/GpMenu";
import GrandPrixMatch from "../components/GrandPrixMatch";
import YearButton from "../components/YearButton";
import { fetcher } from "../utils";

const GrandPrixMatches: FC = () => {
 const navigate = useNavigate();
 const [searchParams, setSearchParams] = useSearchParams();
 const { data, isLoading, error, mutate } = useSWR<GrandPrix[]>(
  "/5Star",
  fetcher
 );
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
   <AddGrandPrixMatch />
   <div className="flex flex-col gap-3 py-3">
    {data!
     .sort((a, b) => b.rating - a.rating)
     .map((match, index) => (
      <GrandPrixMatch
       key={index}
       place={index + 1}
       year={match.year}
       wrestler1={match.wrestler1}
       wrestler2={match.wrestler2}
       rating={match.rating}
       mutate={mutate}
      />
     ))}
   </div>
  </>
 );
};

export default GrandPrixMatches;
