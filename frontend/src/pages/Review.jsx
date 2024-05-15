import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context.jsx'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/UI/label.jsx';
import { Input } from '@/components/UI/Input.jsx';
import { Textarea } from '@/components/UI/textarea.jsx';
import { Button } from '@/components/UI/button.jsx';

function ReviewUseForm() {
  const { authState } = useContext(AuthContext);
  const { id } = useParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rate) {
      toast.error("Es necesario introducir una puntuación");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/review/add/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: authState.token,
        },
        body: JSON.stringify({
          roomId: room.id,
          reservationId: reservation.id,
          // Otros campos necesarios
        }),
      });

      if (response.status!== 201) {
        toast.error("Error en los datos introducidos");
      } else {
        toast.success("Review hecha exitosamente");
        navigate("/profile"); 
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud");
    }
  };

  return (
    <div>
      <h1>Agregar una revisión</h1>
      <form onSubmit={handleSubmit}>
        <Label>
          Descripción:
          <Textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Label>
        <br />
        <Label>
          Rate:
          <Input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
          />
        </Label>
        <br />
        <Button type="submit">Enviar revisión</Button>
      </form>
    </div>
  );
}

export default ReviewUseForm;
