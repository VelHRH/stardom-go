import { FC } from "react";

interface YearButtonProps extends React.HTMLAttributes<HTMLDivElement> {
 children: string;
 isClicked: boolean;
}

const YearButton: FC<YearButtonProps> = ({ children, isClicked, ...props }) => {
 return (
  <div
   {...props}
   className={`${
    !isClicked
     ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
     : "bg-transparent text-fuchsia-500"
   } py-1 px-3 font-semibold rounded-sm cursor-pointer`}
  >
   {children}
  </div>
 );
};

export default YearButton;
