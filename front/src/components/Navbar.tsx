import { FC } from "react";

const Navbar: FC = () => {
 return (
  <div className="w-full flex justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 text-8xl uppercase py-10 font-black font-outline-4 text-slate-50/50">
   <div className="absolute w-full h-full top-0 left-0 bg-slate-900/50 -z-10"></div>
   Veldom
  </div>
 );
};

export default Navbar;
