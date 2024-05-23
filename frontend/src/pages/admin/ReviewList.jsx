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

const AdminReviewList = () => {
  const { authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${host}/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setReviews(body.data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las reseñas:", error)
      );
  }, []);

  console.log(reviews)

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>Reseñas</h2>
        {/* <Button variant="outline" size="icon">
          <Link to="/create-incident">
            <FaPlus />
          </Link>
        </Button> */}
      </div>
      <section className="flex flex-col w-full mx-auto mt-8">
        <Table className="w-full">
          {/* <TableCaption>Lita de incidencias recientes</TableCaption> */}
          <TableHeader>
            <TableRow> 
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell text-center">
                Puntuación
              </TableHead>
              <TableHead className="hidden md:table-cell w-[175px]">
                Reserva
              </TableHead>
              <TableHead className="hidden md:table-cell w-[100px]">
                Usuario
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  {review.description}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                    {review.rate}
                </TableCell>{" "}
                <TableCell className="hidden md:table-cell">
                    <Link to={`/reservation/${review.reservationId}`}>
                        Ver reserva
                    </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                nombre + apellido usuario
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AdminReviewList;
