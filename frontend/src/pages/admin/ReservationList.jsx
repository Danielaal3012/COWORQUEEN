import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "@/auth/auth-context";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { FaPlus } from "react-icons/fa";

const AdminReservationList = () => {
  const { authState } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const host = import.meta.env.VITE_APP_HOST;

  useEffect(() => {
    fetch(`${host}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setReservations(body.reservations);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las reservas:", error)
      );
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);
    };

  console.log(reservations)

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>Reservas</h2>
      </div>
      <section className="flex flex-col w-full mx-auto mt-8">
        <Table className="w-full">
          {/* <TableCaption>Lita de incidencias recientes</TableCaption> */}
          <TableHeader>
            <TableRow> 
              <TableHead className="w-[200px]">Descripción</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell text-center">
                Espacio
              </TableHead>
              <TableHead className="hidden md:table-cell w-[175px]">
                Usuario
              </TableHead>
              <TableHead className="hidden md:table-cell w-[150px]">
                Check in
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  {formatDate(reservation.reservationDateBeg)}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                    <Link to={`/admin/room/${reservation.roomId}`}>Ver espacio</Link>
                </TableCell>{" "}
                <TableCell className="hidden md:table-cell">
                    usuario
                </TableCell>
                <TableCell className="hidden md:table-cell">
                {reservation.reservationCheckin === 0 ? (<Badge>No realizado</Badge>) : (<Badge>Realizado</Badge>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AdminReservationList;