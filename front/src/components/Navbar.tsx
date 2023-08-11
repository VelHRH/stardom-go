import { LogIn, LogOut } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";

const Navbar: FC = () => {
 const [searchParams] = useSearchParams();
 const [isLogIn, setIsLogIn] = useState<boolean>(false);
 const [userData, setUserData] = useState<User>();

 const navigate = useNavigate();

 useEffect(() => {
  if (searchParams.get("unauthorised") === "true") setIsLogIn(true);
 }, [searchParams]);

 const logout = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/logout`, {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
  });
  const response = await res.json();
  if (response.message === "Success") {
   setUserData(undefined);
   localStorage.removeItem("user");
   navigate("/");
  }
 };

 useEffect(() => {
  const user = localStorage.getItem("user");
  if (user !== null) {
   setUserData(JSON.parse(user));
  }
 }, []);
 return (
  <>
   {isLogIn && (
    <div className="absolute w-screen h-screen">
     <div
      className="w-screen h-screen bg-slate-900/70 cursor-pointer absolute z-40"
      onClick={() => setIsLogIn(false)}
     ></div>
     <LoginForm />
    </div>
   )}
   <div className="w-full flex justify-around bg-gradient-to-r from-violet-500 to-fuchsia-500 text-8xl uppercase py-10 text-slate-50/50">
    <div className="absolute w-full h-full top-0 left-0 bg-slate-900/50 -z-10"></div>
    <a href="/" className="font-black font-outline-4 cursor-pointer">
     Veldom
    </a>
    <div className="flex gap-10 items-center">
     <a href="https://t.me/velikiyrestring">
      <svg
       className="rounded-xl cursor-pointer hover:scale-110 duration-300"
       fill="#FFFFFF"
       height="50px"
       width="50px"
       version="1.1"
       id="Layer_1"
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 455 455"
      >
       <g>
        <path
         d="M0,0v455h455V0H0z M384.814,100.68l-53.458,257.136
		c-1.259,6.071-8.378,8.822-13.401,5.172l-72.975-52.981c-4.43-3.217-10.471-3.046-14.712,0.412l-40.46,32.981
		c-4.695,3.84-11.771,1.7-13.569-4.083l-28.094-90.351l-72.583-27.089c-7.373-2.762-7.436-13.171-0.084-16.003L373.36,90.959
		C379.675,88.517,386.19,94.049,384.814,100.68z"
        />
        <path
         d="M313.567,147.179l-141.854,87.367c-5.437,3.355-7.996,9.921-6.242,16.068
		l15.337,53.891c1.091,3.818,6.631,3.428,7.162-0.517l3.986-29.553c0.753-5.564,3.406-10.693,7.522-14.522l117.069-108.822
		C318.739,149.061,316.115,145.614,313.567,147.179z"
        />
       </g>
      </svg>
     </a>

     {userData ? (
      <button
       onClick={() => logout()}
       className="flex gap-2 items-center text-4xl font-semibold text-slate-50 hover:scale-110 duration-300"
      >
       <LogOut size={50} />
       Logout
      </button>
     ) : (
      <button
       onClick={() => setIsLogIn(true)}
       className="flex gap-2 items-center text-4xl font-semibold text-slate-50 hover:scale-110 duration-300"
      >
       <LogIn size={50} />
       Login
      </button>
     )}
    </div>
   </div>
  </>
 );
};

export default Navbar;
