import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { AuthContext } from "@/auth/auth-context";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/alert-dialog";

const ViewReservation = () => {
  const { authState } = useContext(AuthContext);
  const [reservationData, setReservationData] = useState({});
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${host}/reservations/by-reservationId/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservationData(data.reservation);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la reserva:", error)
      );
  }, [id]);

  const handleReservationCancel = () => {
    fetch(`${host}/reservation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
          //navigate("/);
          toast.success("Reserva cancelada correctamente");
        }
      })
      .catch((error) => console.error("Error al cancelar la reserva:", error));
  };

  console.log(reservationData);

  return (
    <div className="flex flex-col w-full">
      {reservationData && (
        <div>
          <div className="flex justify-between px-4 md:px-0">
            <h2>Reserva</h2>
            <div className="flex items-center gap-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Cancelar reserva</Button>
                    </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto cancelará
                      permanentemente tu reserva y deberás crear una nueva.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      asChild
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      <Button onClick={handleReservationCancel}>
                        Sí, estoy seguro
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <ul className="flex flex-col gap-y-4">
            <li>
              <span className="font-bold">Espacio:</span>{" "}
              {reservationData.roomId}
            </li>
            <li>
              <span className="font-bold">Fecha:</span>{" "}
              {reservationData.reservationDateBeg} -{" "}
              {reservationData.reservationDateEnd}
            </li>
            <li>
              <span className="font-bold">Fecha de creación:</span>{" "}
              {reservationData.createdAt}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewReservation;