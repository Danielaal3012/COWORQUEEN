import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import { Button } from "@/components/UI/button";
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/UI/skeleton";

function ViewRoom() {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const [roomData, setRoomData] = useState({});
  const { id } = useParams();
  const roomId = id;
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${host}/room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setRoomData(body.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [roomId]);

  const cover = roomData.image
    ? host + "/uploads/rooms/" + roomId + "/" + roomData.image
    : "";

  return (
    <div className="flex flex-col text-center ">
      {roomData && (
        <div className="relative px-4">
          <h2 className="mb-4 text-xl font-bold ">{roomData.name}</h2>
          <ul className="flex flex-col gap-y-4">
            {roomData.image ? (
              <img src={cover} alt="room" className="w-[300px] h-auto justify-center mx-auto flex" />
            ) : (
              <Skeleton className="w-[300px] h-[200px] justify-center mx-auto flex " />
            )
          }

            <li>
              <span className="font-bold">Descripción:</span>{" "}
              {roomData.description}
            </li>
            <li>
              <span className="font-bold">Capacidad:</span> {roomData.capacity}
            </li>
            <li>
              <span className="font-bold">Tipo:</span> {roomData.typeOf}
            </li>
          </ul>
        </div>
      )}
      <Button className="sticky bottom-0 z-10 mx-auto" onClick={() => navigate(`/room/${id}/reserve`)}>Reservar</Button>
    </div>
  );
}

export default ViewRoom;