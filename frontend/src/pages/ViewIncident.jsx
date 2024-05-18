import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

const ViewIncident = () => {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const [incidentData, setIncidentData] = useState({});
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;

  useEffect(() => {
    fetch(`${host}/incidents/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIncidentData(data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la incidencia:", error)
      );
  }, [id]);


  const handleIncidentResolve = () => {

    fetch(`${host}/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status: "resolved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
            toast.success("Incidencia resuelta correctamente");
            setIncidentData({ ...incidentData, status: "resolved", updatedAt: data.updatedAt })
        }
      })
      .catch((error) =>
        console.error("Error al resolver la incidencia:", error)
      );
  };

  console.log(incidentData);

  return (
    <div className="flex flex-col w-full">
      {incidentData && incidentData && (
        <div>
            <div className="flex justify-between px-4 md:px-0">
          <h2>Incidencia</h2>
          <Button onClick={handleIncidentResolve}>
              Marcar incidencia como resuelta
          </Button>
        </div>
          {/* <h2 className="mb-8 text-xl font-bold">Incidencia</h2>
            {incidentData.status === "pending" && (
                <Button
                    variant="destructive"
                    onClick={handleIncidentResolve}
                >
                    Marcar como resuelta
                </Button>
                )}
                 */}
          <ul className="flex flex-col gap-y-4">
            <li>
              <span className="font-bold">Descripción:</span>{" "}
              {incidentData.description}
            </li>
            <li>
              <span className="font-bold">Estado:</span>{" "}
              <Badge>
                {incidentData.status === "pending" ? "Pendiente" : "Resuelta"}
              </Badge>
            </li>
            <li>
              <span className="font-bold">Fecha de creación:</span>{" "}
              {incidentData.createdAt}
            </li>
            <li>
              <span className="font-bold">Fecha de resolución:</span>{" "}
              {incidentData.updatedAt}
            </li>
            <li>
              <span className="font-bold">Sala:</span>
              <Link to={`/rooms/${incidentData.roomId}`}>
                {incidentData.roomName}
              </Link>
            </li>
            <li>
              <span className="font-bold">Equipo:</span>
              <Link to={`/equipment/${incidentData.equipmentId}`}>
                {incidentData.equipmentName}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewIncident;
