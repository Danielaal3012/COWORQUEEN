import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../auth/auth-context.jsx";
import { toast } from "react-toastify";
import { Link, useLocation, useParams } from "react-router-dom";
import Rating from "react-rating";
import { Button } from "@/components/UI/button.jsx";

function ViewReview({ reviewId, reservationId}) {
  const location = useLocation(); // Usa useLocation para obtener la ubicación actual
  const { authState } = useContext(AuthContext);
  const [review, setReview] = useState({});

  const fetchReviewId = async () => {
    try {
      const response = await fetch(`http://localhost:3000/review/reservation/${reservationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      });
      const data = await response.json();
      setReview(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar la reseña.");
    }
  };
  
  useLayoutEffect(() => {
    if (reviewId ) {
      fetchReviewId();
    }
  }, [reviewId ]);
  
  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <h2> Review </h2>
      <div className="flex flex-col w-full gap-y-4">
        <form>
          <div className="flex flex-col my-4 w-full justify-normal gap-x-4">
            <p>Username : {review.username || "No hay username disponible"}</p>
          </div>
          <div className="flex flex-col my-4 w-full justify-normal gap-x-4">

            <p>Description: {review.description || "No hay descripcion disponible"}</p>
          </div>
  
          <div className="flex items-center my-4 gap-x-4">
            <Rating
              initialRating={review.rate || 0} 
              max={5}
            />
            {review.rate && <span>{review.rate.toFixed(1)}</span>}
          </div>
  
          <Button> <Link to={`/edit-review/${reviewId}`}>Editar</Link></Button>
        </form>
      </div>
    </div>
  );
  } 
  

export default ViewReview;
