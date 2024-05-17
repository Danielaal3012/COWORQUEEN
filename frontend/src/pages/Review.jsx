import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/UI/label.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import { Button } from "@/components/UI/button.jsx";
import Rating from "react-rating";

function ReviewUseForm() {
  const { authState } = useContext(AuthContext);
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    rate: "",
    reservationId: id,

  });

  formData.rate = Number(formData.rate);

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
      if (editing) {
        // Actualizar review
        const reviewId = req.params.review.id
        const response = await fetch(`http://localhost:3000/review/${reviewId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          toast.error("Error al actualizar la review");
        } else {
          toast.success("Review actualizada exitosamente");
          setEditing(false);
        }
      } else {
        // Crear review
        const response = await fetch(`http://localhost:3000/review/add/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          toast.error("La review de esta reserva ya esta hecha");
        } else {
          toast.success("Review hecha exitosamente");
          navigate("/rooms");
        }
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud");
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setFormData(review);
  };

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`http://localhost:3000/review/${id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
          }
      });
      const data = await response.json();
      setReview(data);
    };
    fetchReview();
  }, [id]);

  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <h2>{!editing ? "Editar revisión" : "Agregar una revisión"}</h2>
      <div className="flex flex-col w-full gap-y-4">
        {review && (
          <div className="flex flex-col my-4 w-full justify-normal gap-x-4">
            <Label>Descripción:</Label>
            <Textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={editing}
            />
          </div>
        )}
        {review && (
          <div className="flex items-center my-4 gap-x-4">
            <Label>Calificación:</Label>
            <Rating
              initialRating={formData.rate}
              onChange={handleRateChange}
              max={5}
              disabled={editing}
            />
          </div>
        )}
        {editing ? (
          <Button type="button"  onClick={handleChange} className="w-full">
            Actualizar revisión
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} className="w-full">
            Enviar revisión
          </Button>
        )}
        {review && (
          <Button onClick={handleEdit} className="w-full">
            Editar revisión
          </Button>
        )}
      </div>
    </div>
  );
}

export default ReviewUseForm;