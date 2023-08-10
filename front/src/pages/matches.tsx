import { FC } from "react";
import useSWR from "swr";
import { fetcher } from "../utils";

const Matches: FC = () => {
 const { data, isLoading } = useSWR("/match", fetcher);
 if (isLoading) return <div className="text-white">Loading...</div>;
 return <div className="text-white">{JSON.stringify(data)}</div>;
};

export default Matches;
