import { AuthContext } from "@/auth/auth-context";
import { Dialog } from "@/components/Dialog.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
            <Dialog
              buttonVariant="outline"
              buttonContent="Cancelar reserva"
              title="¿Estás seguro?"
              description="Esta acción no se puede deshacer. Esto cancelará permanentemente tu reserva y deberás crear una nueva."
              handleButtonAction={handleReservationCancel}
              sureText="Sí, estoy seguro"
            />
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
