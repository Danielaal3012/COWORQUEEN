import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/auth-context";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Label } from "@/components/UI/label.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";

export async function EquipmentItem() {
  const { authState } = useContext(AuthContext);
  const [equipmentData, setEquipmentData] = useState([]);
  const { id } = useParams();
  console.log(id);

  function FechaVisual({ date }) {
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    return <div>{new Date(date).toLocaleDateString("es-ES", opciones)}</div>;
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEquipmentData({
  //     ...equipmentData,
  //     [name]: value,
  //   });
  // };
  console.log(equipmentData);

  useEffect(async () => {
    try {
      console.log(equipmentData);
      const response = await fetch(
        `http://localhost:3000/admin/equipment/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            AuthContext: authState.token,
          },
        }
      );

      if (!response.ok) throw new Error("No se ha podido cargar el usuario");

      const data = await response.json();
      setEquipmentData(data);
    } catch (error) {
      console.error("No se ha podido cargar el usuario");
    }
  }, []);

  // async function submitUpdate(e) {
  //   e.preventDefault();

  //   const updateData = await fetch(`http://localhost:3000/equipment/${id}`, {
  //     method: "patch",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //     body: JSON.stringify({
  //       name: equipmentData.name,
  //       description: equipmentData.description,
  //     }),
  //   });
  //   const { ok, error } = updateData;

  //   if (!ok) {
  //     toast.error(error);
  //   } else {
  //     toast.success("Artículo modificado correctamente");
  //   }
  // }
  return (
    <div className="flex flex-col">
      <Table className="w-fit">
        <TableCaption>Lita de usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre de usuario</TableHead>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Apellidos</TableHead>
            <TableHead className="w-[200px]">email</TableHead>
            <TableHead className="w-[50px]">Verificado</TableHead>
            <TableHead className="w-[50px]">Rol</TableHead>
            <TableHead className="w-[200px]">Creado</TableHead>
            <TableHead className="w-[200px]">Última modificación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipmentData && equipmentData.length > 0 ? (
            equipmentData.map((equipmentInfo) => (
              <TableRow key={equipmentInfo.id}>
                <TableCell>{equipmentInfo.name}</TableCell>
                <TableCell>{equipmentInfo.description}</TableCell>
                <TableCell>
                  <FechaVisual fecha={equipmentInfo.createdAt} />
                </TableCell>
                <TableCell>
                  <FechaVisual fecha={equipmentInfo.updatedAt} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay usuarios</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <Pagination
        totalRecords={equipmentList.length}
        limit={limit}
        onPageChange={(pageNumber) => {
          const newOffset = (pageNumber - 1) * limit;

          setEquipmentQueries((prevState) => ({
            ...prevState,
            offset: newOffset,
          }));
        }}
      /> */}
    </div>

    // <form
    //   // onSubmit={submitUpdate}
    //   className="flex flex-col p-4 mx-auto mt-4 rounded-md gap-y-4"
    // >
    //   {/* <Button asChild>
    //     <Link to="/admin/equipment">Volver</Link>
    //   </Button> */}
    //   <div>
    //     <Label>Nombre del artículo</Label>
    //     <Input
    //       type="text"
    //       name="name"
    //       placeholder='Ej: "Destornillador"'
    //       value={equipmentData.name}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <div>
    //     <Label>Descripción del artículo</Label>
    //     <Textarea
    //       type="text"
    //       name="description"
    //       placeholder='Descripción del artículo"'
    //       value={equipmentData.description}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <Button type="submit" className="w-full">
    //     Añadir artículo
    //   </Button>
    // </form>
  );
}
