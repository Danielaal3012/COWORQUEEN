import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/images/Logo.png";
import coworqueen from "../assets/images/coworqueen.svg";
import { AuthContext } from "../auth/auth-context";
import { ScrollArea } from "./UI/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import Mobile from "@/components/Mobile";
import useMediaQuery from "@/utils/mediaquery";

const Layout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const location = useLocation();
  const { authState } = useContext(AuthContext);

  if (isDesktop) {
    return (
      <div className="relative flex flex-col w-full bg-transparent h-dvh">
        <nav className="flex items-center justify-between w-full h-14 bg-secondary/75">
          <section className="w-1/5 px-4 bg-slate-200">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-10" />
            </Link>
            </section>
            <section className="flex items-center px-4">
              <Link to="/profile">
              <Avatar className="h-11 w-11">
                <AvatarFallback>
                  <FaUserCircle />
                </AvatarFallback>
                <AvatarImage src={authState.user.avatar} alt="Avatar" />
              </Avatar>
              </Link>
              </section>
        </nav>

        <div className="flex flex-row h-full py-4 gap-x-4">
          <div className="flex flex-col w-1/5 h-full bg-slate-200">
            menu lateral admin
          </div>
          <div className="flex flex-row w-4/5 h-full p-4 mr-4 rounded-lg bg-secondary/15">
            {children}
          </div>

        </div>

        </div>
    );
  } else {
    return <Mobile>{children}</Mobile>;
  }
};

export default Layout;
