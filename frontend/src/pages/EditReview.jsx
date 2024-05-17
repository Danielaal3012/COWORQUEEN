import { AuthContext } from '@/auth/auth-context.jsx';
import { Button } from '@/components/UI/button.jsx';
import { Label } from '@/components/UI/label.jsx';
import React, { useContext, useState } from 'react';
import Rating from 'react-rating';
import { toast } from 'react-toastify';

const EditReview = ({ reviewId }) => {
  const { authState } = useContext(AuthContext);
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rate || !description) {
      toast.error('Por favor, complete todos los campos');
      return;
    }
    if (rate < 1 || rate > 5) {
      toast.error('La calificación debe ser entre 1 y 5');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/review/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authState.token,
        },
        body: JSON.stringify({ rate, description }),
      });

      if (!response.ok) {
        toast.error("Error al actualizar");
      }

      toast.success("Review actualizada exitosamente");

    } catch (error) {
      console.error(error);
      toast.error("Problema al actualizar");
    }

    setLoading(false);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center my-4 gap-x-4">
        <Label>Calificación:</Label>
        <Rating
          value={rate}
          onChange={setRate}
          max={5}
        />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <Label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </Label>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Actualizando...' : 'Actualizar'}
      </Button>
    </form>
  );

};


export default EditReview;