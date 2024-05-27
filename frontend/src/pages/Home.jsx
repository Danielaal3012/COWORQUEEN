import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/auth/auth-context";
import { DataContext } from "@/components/DataContext";
import { Badge } from "@/components/UI/badge";
import { Link } from "react-router-dom";
import { FaRegStar, FaRegStarHalf } from "react-icons/fa6";


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
      .then((res) => {
        if (!res.ok) {
          // throw new Error('Error al obtener las habitaciones');
          console.error("Error al obtener las habitaciones");
        }
        return res.json();
        console.log(res);
      })
      .then((data) => {
        updateRooms(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const formatAverageRate = (rate) => {
    if (rate === null || rate === undefined || isNaN(rate)) {
      return null;
    }
  
    const roundedRate = Math.round(rate * 2) / 2;
    const fullStars = Math.floor(roundedRate);
    const hasHalfStar = roundedRate % 1 !== 0;
  
    return (
      <div className="flex flex-row p-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
        {hasHalfStar && <FaRegStarHalf />}
      </div>
    );
  };

  console.log(rooms)

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
                  <div className="absolute top-0 right-0 overflow-hidden text-center bg-white rounded-bl-xl min-w-11 max-h-6">
                    <p className="">{room.capacity}</p>
                  </div>
                  <div className="absolute top-0 left-0 items-center overflow-hidden font-bold text-center min-w-11 max-h-6">
                  {formatAverageRate(room.averageRate)}
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
