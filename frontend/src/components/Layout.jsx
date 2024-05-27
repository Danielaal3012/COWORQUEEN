import Mobile from "@/components/Mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Button } from "@/components/UI/button";
import useMediaQuery from "@/utils/mediaquery";
import { useContext, useEffect } from "react";
import { FaArrowRight, FaHome, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { AuthContext } from "../auth/auth-context";
import {
  FaUsers,
  FaBorderAll,
  FaBox,
  FaTriangleExclamation,
  FaTicket,
  FaStarHalfStroke,
  FaCalendarCheck,
} from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";

import { DataContext } from "@/components/DataContext";

const Layout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const avatar = authState?.user?.avatar
    ? host + "/uploads/avatar/" + "/" + authState.user.avatar
    : null;

  const { navigationData, updateNavigationData } = useContext(DataContext);

  useEffect(() => {
    updateNavigationData({
      ...navigationData,
      path: location.pathname,
      scroll: window.scrollY,
    });
  }, [location.pathname]);

  if (isDesktop) {
    return (
      <div className="relative flex flex-col w-full bg-transparent h-dvh ">
        <nav className="flex items-center justify-between w-full h-14 bg-secondary/75">
          <section className="w-1/5 px-4 ">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 min-h-10 min-w-[220px]"
              />
            </Link>
          </section>
          <section className="flex items-center px-4">
            {authState?.token ? (
              <Link to="/profile">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={avatar} alt="Avatar" />
                  <AvatarFallback>
                    <FaUserCircle />
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link to="/login">
                <FaUserCircle className="text-3xl" />
              </Link>
            )}
          </section>
        </nav>

        <div className="flex flex-row w-full h-full py-4">
          {authState?.user?.role === "admin" && (
            <div className="flex flex-col min-w-[200px] h-full px-4  bg-slate-200 rounded-r-lg gap-y-4 py-4">
             
              <Button variant="link" className="w-full text-lg text-black" asChild>
                <Link to="/admin/users">
                  <FaUsers />
                  Usuarios
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-black"
                asChild
              >
                <Link to="/admin/rooms">
                  <BsPersonWorkspace />
                  Espacios
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-black"
                asChild
              >
                <Link to="/admin/equipment">
                  <FaBox />
                  Equipo
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-black"
                asChild
              >
                <Link to="/admin/incidents">
                  <FaTriangleExclamation />
                  Incidencias
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-black"
                asChild
              >
                <Link to="/admin/reservations">
                  <FaCalendarCheck />
                  Reservas
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-black"
                asChild
              >
                <Link to="/admin/reviews">
                  <FaStarHalfStroke />
                  Reseñas
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
