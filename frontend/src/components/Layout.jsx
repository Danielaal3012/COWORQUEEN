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
      <div className="relative w-full bg-transparent h-dvh">
        <nav className="flex px-4 h-14 bg-secondary/75 ">
          
          <section className="flex items-center justify-between w-full">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-10" />
            </Link>
            <section className="flex items-center gap-4">
              <Link to="/profile">
              <Avatar className="h-11 w-11">
                <AvatarFallback>
                  <FaUserCircle />
                </AvatarFallback>
                <AvatarImage src={authState.user.avatar} alt="Avatar" />
              </Avatar>
              </Link>
              </section>
            </section>
        </nav>
        {children}
        </div>
    );
  } else {
    return <Mobile>{children}</Mobile>;
  }
};

export default Layout;
