import { useContext, useState } from "react";
import { AuthContext } from "../auth/auth-context";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export async function EquipmentItem() {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  console.log(token);

  const [equipmentData, setEquipmentData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({
      ...equipmentData,
      [name]: value,
    });
  };

  const idArtículo = window.location.pathname.split("/").pop(); // Suponiendo que la URL es /producto/123
  console.log("Id del artículo", idArtículo);

  const getData = await fetch(`http://localhost:3000/equipment/${idArtículo}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      AuthContext: token,
    },
  });
  console.log("Get data: ", new Promise(getData.json()));

  async function submitUpdate(e) {
    e.preventDefault();

    const updateData = await fetch(
      `http://localhost:3000/equipment/${idArtículo}`,
      {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: equipmentData.name,
          description: equipmentData.description,
        }),
      }
    );
    const { ok, error } = updateData;

    if (!ok) {
      toast.error(error);
    } else {
      toast.success("Artículo modificado correctamente");
    }
  }
  return (
    <form
      onSubmit={submitUpdate}
      className="flex flex-col p-4 mx-auto mt-4 rounded-md gap-y-4"
    >
      <Button asChild>
        <Link to="/admin/equipment">Volver</Link>
      </Button>
      <div>
        <Label>Nombre del artículo</Label>
        <Input
          type="text"
          name="name"
          placeholder='Ej: "Destornillador"'
          value={equipmentData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Descripción del artículo</Label>
        <Textarea
          type="text"
          name="description"
          placeholder='Descripción del artículo"'
          value={equipmentData.description}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Añadir artículo
      </Button>
    </form>
  );
}
