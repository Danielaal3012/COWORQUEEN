import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/auth-context.jsx'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/UI/label.jsx';
import { Input } from '@/components/UI/Input.jsx';
import { Textarea } from '@/components/UI/textarea.jsx';
import { Button } from '@/components/UI/button.jsx';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.rate) {
      toast.error("Revisa los campos obligatorios");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/review/add", formData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: authState.token,
        },
      });

      if (response.status!== 201) {
        toast.error("Error en los datos introducidos");
      } else {
        toast.success("Review hecha exitosamente");
        navigate("/rooms"); 
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
