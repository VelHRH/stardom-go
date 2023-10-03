import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import RatingChart from "../components/Chart";
import GpMenu from "../components/GpMenu";
import YearButton from "../components/YearButton";

import { fetcher } from "../utils";

const GrandPrixMatchesChart: FC = () => {
 const navigate = useNavigate();
 const [searchParams, setSearchParams] = useSearchParams();
 const { data, isLoading, error } = useSWR<{ rating: number; count: number }[]>(
  "/5Star/byRating",
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
   <div className="w-1/2 h-1/2 mx-auto">
    <RatingChart data={data!} />
   </div>
  </>
 );
};

export default GrandPrixMatchesChart;
