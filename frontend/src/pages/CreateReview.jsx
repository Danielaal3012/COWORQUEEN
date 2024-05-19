import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/auth-context.jsx";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button.jsx";
import { Label } from "@/components/UI/label.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import ViewReview from "./ViewReview.jsx";


function CreateReview() {
  const { authState } = useContext(AuthContext);
  const { reservationId } = useParams();
   const [formData, setFormData] = useState({
    id: null,
    description: "",
    rate: "",
    reservationId: reservationId,
    userId: authState.user.id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value }));
  };

  const handleRateChange = (rating) => {
    setFormData({
      ...formData,
      rate: Number(rating),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description ||!formData.rate) {
      toast.error("Revisa los campos obligatorios");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/review/create/${reservationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const message = response.status === 409? "Error al crear la review.": "La review de esta reservación ya existe .";
        toast.error(message);
      } else {
        const responseData = await response.json();
      setFormData({...responseData, id: formData.id, description: formData.description, rate: formData.rate, reservationId: formData.reservationId, userId: formData.userId}); // Actualiza `formData` con el `id` recibido
      toast.success("Reseña creada exitosamente")
      }
    } catch (error) {
      toast.error("Ocurrió un error, intenta de nuevo.");
    }
  };
  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <h2>Agregar una revisión</h2>
      <div className="flex flex-col w-full gap-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-4 w-fulljustify-normal gap-x-4">
            <Label>Descripción:</Label>
            <Textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              />
          </div>

          <div className="flex items-center my-4 gap-x-4">
            <Label>Calificación:</Label>
            <Rating
              initialRating={formData.rate}
              onChange={handleRateChange}
              max={5}
              />
          </div>

          <Button type="submit" className="w-full">Enviar revisión</Button>
        </form>
        <ViewReview reservationId={reservationId} reviewId={formData.id} />      
        </div>
    </div>
  );
}


export default CreateReview;

