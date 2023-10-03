import { FC } from "react";

const GpMenu: FC = () => {
 return (
  <div className="flex my-5 gap-3 justify-center">
   <a
    href="/matches/grandprix"
    className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-sm font-semibold"
   >
    Rating
   </a>
   <a
    href="/matches/grandprix/chart"
    className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-sm font-semibold"
   >
    Chart
   </a>
   <a
    href="/matches/grandprix/wrestlers"
    className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-sm font-semibold"
   >
    Wrestlers
   </a>
  </div>
 );
};

export default GpMenu;
