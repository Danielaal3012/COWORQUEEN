import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/auth-context.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/UI/label.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import { Button } from "@/components/UI/button.jsx";
import Rating from "react-rating";

function ReviewUseForm() {
  const { authState } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    description: "",
    rate: "",
    roomId: "",
    reservationId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRateChange = (rating) => {
    setFormData({
      ...formData,
      rate: rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.rate) {
      toast.error("Revisa los campos obligatorios");
      return;
    }
    try {

      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify({
          description: formData.description,
          rate: formData.rate,
          roomId: room.id,
          reservationId: reservation.id,
        }),
      });
      if (response.status !== 201) {
        toast.error("Error en los datos introducidos");
      } else {
        toast.success("Review hecha exitosamente");
        navigate("/rooms");
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud");
    }
  };
console.log(formData); 
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
              // emptySymbol="★"
              // fullSymbol="★★★★★"
              max={5}
            />
          </div> 

          <Button type="submit" className="w-full">Enviar revisión</Button>
        </form>
      </div>
    </div>
  );
}

export default ReviewUseForm;
