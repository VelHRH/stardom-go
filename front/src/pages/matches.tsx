import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import AddMatch from "../components/AddMatch";
import Match from "../components/Match";
import YearButton from "../components/YearButton";
import { fetcher } from "../utils";

const Matches: FC = () => {
 const navigate = useNavigate();
 const [searchParams, setSearchParams] = useSearchParams();
 const { data, isLoading, error, mutate } = useSWR<Match[]>("/match", fetcher);
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
    {Array.from({ length: new Date().getFullYear() - 2010 + 1 }, (_, index) => (
     <YearButton
      key={`year_${index}`}
      onClick={() => {
       searchParams.set("year", (2010 + index).toString());
       setSearchParams(searchParams);
      }}
      isClicked={
       searchParams.get("year") === (2010 + index).toString() ? true : false
      }
     >
      {(2010 + index).toString()}
     </YearButton>
    ))}
    <YearButton
     onClick={() => {
      searchParams.delete("year");
      setSearchParams(searchParams);
     }}
     isClicked={!searchParams.get("year") ? true : false}
    >
     All time
    </YearButton>
   </div>
   <AddMatch
    curYear={
     searchParams.get("year") ? parseFloat(searchParams.get("year")!) : null
    }
   />
   <div className="flex flex-col gap-3 py-3">
    {data!
     .filter(
      (match) =>
       match.year ===
       parseFloat(searchParams.get("year") || match.year.toString())
     )
     .sort((a, b) => b.rating - a.rating)
     .map((match, index) => (
      <Match
       key={index}
       place={index + 1}
       year={match.year}
       name={match.match}
       show={match.show}
       rating={match.rating}
       mutate={mutate}
      />
     ))}
   </div>
  </>
 );
};

export default Matches;
