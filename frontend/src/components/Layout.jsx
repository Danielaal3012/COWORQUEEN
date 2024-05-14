import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/images/Logo.png";
import coworqueen from "../assets/images/coworqueen.svg";
import { AuthContext } from "../auth/auth-context";
import { ScrollArea } from "./UI/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Button } from "@/components/UI/button";
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
          <section className="w-1/5 px-4 ">
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

        <div className="flex flex-row w-full h-full py-4">

{authState.user.role === "admin" && (
          <div className="flex flex-col w-1/5 h-full px-4 min-w-[20%] bg-slate-200 rounded-r-lg gap-y-4">
            <Button variant="link" className="w-full text-lg text-black" asChild>
              <Link to="/">
                Inicio
              </Link>
            </Button>
            <Button variant="link" className="w-full text-lg text-black" asChild>
              <Link to="/admin">
                Panel de administración
              </Link>
            </Button>
          </div>
          )}

          <div className="flex flex-row w-full h-full p-4 mx-4 rounded-lg bg-secondary/15">
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
