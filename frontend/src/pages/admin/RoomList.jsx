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
  } from "@/components/UI/table"
  import { FaPlus } from "react-icons/fa";

const AdminRoomList = () => {
    const { authState } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const host = import.meta.env.VITE_APP_HOST;

    useEffect(() => {
      fetch(`${host}/rooms`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setRooms(data.message);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de las incidencias:", error)
            );
    }, []);

  console.log(rooms);

    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-between px-4 md:px-0">
          <h2>Espacios</h2>
          <Button variant="outline" size="icon">
            <Link to="/create-room">
              <FaPlus />
            </Link>
          </Button>
        </div>
        <section className="flex flex-col w-full mx-auto mt-8">
          <Table className="w-full">
            {/* <TableCaption>Lita de incidencias recientes</TableCaption> */}
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[350px]">ID</TableHead> */}
                <TableHead className="w-[175px]">Nombre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripción
                </TableHead>
                <TableHead className="w-[100px] hidden md:table-cell">
                  Capacidad
                </TableHead>
                <TableHead className="w-[100px] text-center ">Tipo</TableHead>
                {/* <TableHead>Acciones</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms?.map((room) => (
                <TableRow key={room?.id}>
                  {/* <TableCell className="hidden md:table-cell">{room.id}</TableCell> */}
                  <TableCell className="font-bold">
                    <Link to={`/admin/room/${room?.id}`}>{room?.name}</Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {room?.description}
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {room?.capacity}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="text-center bg-secondary"
                    >
                      {room?.typeOf}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>acciones</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* <Carousel className="w-1/2 bg-red-500">
  <CarouselContent>
  {rooms.map((room) => (
            <div className="flex flex-col" >
            <CarouselItem key={room.id} className="relative w-[300px] max-w-[300px] h-[200px] overflow-hidden rounded-md hover:opacity-80">
              <img
                src={host + "/uploads/rooms/" + room.id + "/" + room.image}
                alt={room.name}
                className="w-full"
              />
              <div className="absolute w-full bg-white bg-opacity-50" />
                <div className="absolute bottom-0 flex items-center justify-between w-full px-2 py-1 ">
                <h3 className="font-bold">{room.name}</h3>
                <Badge
                      variant="outline"
                      className="text-center bg-primary"
                    >
                      {room.typeOf}
                    </Badge>
                </div>
                <div className="absolute top-0 right-0 overflow-hidden text-center bg-white rounded-bl-xl min-w-11">
                  <p className="p-2">{room.capacity}</p>
                </div>

            </CarouselItem>
              <p className="hidden">{room.description}</p>
              </div>
          ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel> */}


        <section className="flex flex-wrap gap-4 my-8">
          {rooms.map((room) => (
            <div className="flex flex-col" >
            <figure key={room.id} className="relative w-[300px] max-w-[300px] h-[200px] overflow-hidden rounded-md hover:opacity-80">
              <img
                src={host + "/uploads/rooms/" + room.id + "/" + room.image}
                alt={room.name}
                className="w-full"
              />
              <div className="absolute w-full bg-white bg-opacity-50" />
                <div className="absolute bottom-0 flex items-center justify-between w-full px-2 py-1 ">
                <h3 className="font-bold">{room.name}</h3>
                <Badge
                      variant="outline"
                      className="text-center bg-primary"
                    >
                      {room.typeOf}
                    </Badge>
                </div>
                <div className="absolute top-0 right-0 overflow-hidden text-center bg-white rounded-bl-xl min-w-11">
                  <p className="p-2">{room.capacity}</p>
                </div>

            </figure>
              <p className="hidden">{room.description}</p>
              </div>
          ))}
        </section>
      </div>
    );
}

export default AdminRoomList;
