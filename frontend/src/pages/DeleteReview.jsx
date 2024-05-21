import React, { useContext } from "react";
import { AuthContext } from "../auth/auth-context.jsx";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button.jsx";

function DeleteReview({ reviewId }) {
  const { authState } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/review/delete/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      });
      if (!response.ok) {
        toast.error("Error al eliminar la reseña");
      } else {
        toast.success("Reseña eliminada exitosamente");
      }
    } catch (error) {
      toast.error("Ocurrió un error, intenta de nuevo.");
    }
  };

  return (
    <div>
      <Button type="button" onClick={handleDelete}>Eliminar Reseña</Button>
    </div>
  );
}

export default DeleteReview;
