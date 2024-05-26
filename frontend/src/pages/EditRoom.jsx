import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { toast } from "react-toastify";
import { Textarea } from "@/components/UI/textarea";

function CreateEditRoomForm() {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const { id } = useParams();

  const [roomData, setRoomData] = useState({
    roomId: id,
    name: "",
    description: "",
    capacity: 1,
    typeOf: "",
  });

  const [equipment, setEquipment] = useState(null);

  const [roomEquipment, setRoomEquipment] = useState({ equipmentIds: [] });

  useEffect(() => {
    fetch(`${host}/room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((roomData) => {
        setRoomData(roomData.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [id]);

  useEffect(() => {
    fetch(`${host}/rooms/${id}/equipment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body)
        //mapear los ids del equipo del espacio en room equipment
        setRoomEquipment({ equipmentIds: body.equipment.map((equip) => equip.id) });
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [id]);

  useEffect(() => {
    fetch(`${host}/equipment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setEquipment(body.data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, []);

  // console.log(equipment);

  // console.log(roomEquipment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    fetch(`${host}/room/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify(roomData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al actualizar los datos de la habitación.");
        } else {
          toast.success("Datos de la habitación actualizados correctamente");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      fetch(`${host}/rooms/${id}/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify(roomEquipment),
      })
        .then((response) => {
          if (!response.ok) {
            toast.error("Error al actualizar el equipo de la habitación.");
          } else {
            toast.success("Equipo de la habitación actualizado correctamente");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <form
      onSubmit={handleUpdateRoom}
      className="flex flex-col w-full p-4 mx-auto mt-4 rounded-md gap-y-4"
    >
      <div>
        <Label>Nombre</Label>
        <Input
          type="text"
          name="name"
          placeholder="Nombre del espacio"
          value={roomData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Descripción</Label>
        <Textarea
          type="text"
          name="description"
          placeholder="Descripción del espacio"
          value={roomData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Capacidad</Label>
        <Input
          type="number"
          name="capacity"
          value={roomData.capacity}
          onChange={handleChange}
          min="1"
          max="256"
        />
      </div>
      <div>
        <Label>Tipo</Label>
        <Select
          value={roomData.typeOf}
          onValueChange={(value) =>
            setRoomData((prevState) => ({ ...prevState, typeOf: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un tipo de habitación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pública">Pública</SelectItem>
            <SelectItem value="Privada">Privada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
  <label>Equipo de la sala</label>
  <section className="flex flex-row flex-wrap w-full px-2 my-4 gap-x-4 min-h-6">
    {roomEquipment?.equipmentIds.map((id) => {
      const equip = equipment?.find((equip) => equip.id === id);
      return <Badge key={id}>{equip?.name}</Badge>;
    })}
  </section>

  <Select
    value={roomEquipment.equipmentIds}
    onValueChange={(value) =>
      setRoomEquipment((prevState) => {
        if (value && !prevState.equipmentIds.includes(value)) {
          return { equipmentIds: [...prevState.equipmentIds, value] };
        } else {
          return prevState;
        }
      })
    }
  >
    <SelectTrigger>
      <SelectValue>
        {roomEquipment.equipmentIds.length > 0 ? (
          roomEquipment.equipmentIds.map((id) => {
            const equip = equipment?.find((equip) => equip.id === id);
            return equip ? equip.name : id;
          }).join(', ')
        ) : (
          <span>Selecciona el equipo disponible en el espacio</span>
        )}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {equipment?.filter(
        (equip) => !roomEquipment.equipmentIds.includes(equip.id)
      ).length > 0 ? (
        equipment
          ?.filter((equip) => !roomEquipment.equipmentIds.includes(equip.id))
          .map((equip) => (
            <SelectItem key={equip.id} value={equip.id}>
              {equip.name}
            </SelectItem>
          ))
      ) : (
        <p className="mx-auto w-fit">No hay más equipos disponibles</p>
      )}
    </SelectContent>
  </Select>
</div>
      <Button type="submit" className="w-full">
        Guardar cambios
      </Button>
    </form>
  );
}

export function EditRoom() {
  return (
    <div className="flex flex-col w-full">
      <h2>Editar espacio </h2>
      <div>
        <CreateEditRoomForm />
      </div>
    </div>
  );
}

export default EditRoom;
