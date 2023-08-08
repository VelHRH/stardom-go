import { FC } from "react";

interface SectionButtonProps {
 imgUrl: string;
 link: string;
 children: string;
}

const SectionButton: FC<SectionButtonProps> = ({ imgUrl, link, children }) => {
 return (
  <a
   href={link}
   className="rounded-2xl p-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-1/3 aspect-square relative box-border group"
  >
   <img
    src={imgUrl}
    alt={"Moment"}
    className="w-full h-full rounded-2xl group-hover:scale-110 duration-300 cursor-pointer object-cover absolute"
   ></img>
   <div className="absolute w-full h-full rounded-2xl group-hover:scale-110 duration-300 cursor-pointer bg-slate-900/50 flex justify-center items-center uppercase font-black font-outline-2 text-slate-50/50 text-6xl z-30">
    {children}
   </div>
  </a>
 );
};

export default SectionButton;
