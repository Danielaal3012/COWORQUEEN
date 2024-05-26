import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/auth/auth-context";
import { DataContext } from "@/components/DataContext";
import { Badge } from "@/components/UI/badge";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const { rooms, updateRooms } = useContext(DataContext);

  const host = import.meta.env.VITE_APP_HOST;

  if (rooms.length === 0) {
    fetch(`${host}/rooms`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        updateRooms(data.message);
      });
  }

  return (
    <div className="w-full ">
      <section>filtros</section>
      <section className="w-full h-dvh">
        <section className="flex flex-wrap justify-center gap-4 my-4">
          {rooms.length > 0 &&
            rooms.map((room) => (
              <figure
                key={room.id}
                className="relative w-[45%] max-w-[45%] h-auto lg:w-[300px] lg:max-w-[300px] lg:h-[200px] overflow-hidden rounded-md hover:opacity-80"
              >
                <Link to={`/room/${room.id}`}>
                  <img
                    src={host + "/uploads/rooms/" + room.id + "/" + room.image}
                    alt={room.name}
                    className="w-full"
                  />
                  <div className="absolute bg-white bg-opacity-50 w-fit" />
                  <div className="absolute bottom-0 flex items-center justify-between w-full px-2 py-1 ">
                    <h3 className="font-bold">{room.name}</h3>
                    <Badge variant="outline" className="text-center bg-primary">
                      {room.typeOf}
                    </Badge>
                  </div>
                  <div className="absolute top-0 right-0 overflow-hidden text-center bg-white rounded-bl-xl min-w-11">
                    <p className="p-2">{room.capacity}</p>
                  </div>
                </Link>
              </figure>
              // <p className="hidden">{room.description}</p>
              // </div>
            ))}
        </section>
      </section>
    </div>
  );
};

export default HomePage;
