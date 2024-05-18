import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";

const ViewIncident = () => {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const [incidentData, setIncidentData] = useState({});
  const { id } = useParams();
  const incidentId = id;
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
  }, [incidentId]);

  console.log(incidentData);

  return (
    <div className="flex flex-col w-full">
      {incidentData && incidentData && (
        <div>
          <h2 className="mb-8 text-xl font-bold">Incidencia</h2>
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
                {incidentData.roomId}
              </Link>
            </li>
            <li>
              <span className="font-bold">Equipo:</span>
              <Link to={`/equipment/${incidentData.equipmentId}`}>
                {incidentData.equipmentId}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewIncident;
