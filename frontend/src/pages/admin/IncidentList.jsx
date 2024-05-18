import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
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

const AdminIncidentList = () => {
  const { authState } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/incidents`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las incidencias:", error)
      );
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>Incidencias</h2>
        <Button variant="outline" size="icon">
          <Link to="/create-incident">
            <FaPlus />
          </Link>
        </Button>
      </div>
      <section className="flex flex-col w-full mx-auto mt-8">
        <Table className="w-full">
          {/* <TableCaption>Lita de incidencias recientes</TableCaption> */}
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px] hidden md:table-cell">ID</TableHead> */}
             
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell text-center">
                Estado
              </TableHead>
              <TableHead className="hidden md:table-cell w-[175px]">
                Espacio
              </TableHead>
              <TableHead className="hidden md:table-cell w-[100px]">
                Equipo
              </TableHead>
              {/* <TableHead>Acciones</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.incidentId}>
                {/* <TableCell className="hidden md:table-cell">{incident.incidentId}</TableCell> */}
                <TableCell>
                  <Link to={`/incident/${incident.incidentId}`}>
                  {incident.description}
                  </Link>
                  </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  <Badge>
                    {incident.status === "pending" ? "Pendiente" : "Resuelta"}
                  </Badge>
                </TableCell>{" "}
                <TableCell className="hidden md:table-cell">
                  {incident.roomName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {incident.equipmentName}
                </TableCell>
                {/* Enlace al equipo */}
                {/* <TableCell>acciones</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AdminIncidentList;
