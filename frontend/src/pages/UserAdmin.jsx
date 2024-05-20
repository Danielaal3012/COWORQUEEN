import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button.jsx";
import { Pagination } from "@/components/Pagination.jsx";

export function UserAdmin() {
  const { authState } = useContext(AuthContext);
  const [userDetail, setUserDetail] = useState([]);
  const { id } = useParams();

  function FechaVisual({ fecha }) {
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    return <div>{new Date(fecha).toLocaleDateString("es-ES", opciones)}</div>;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/admin/users/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data.message);
      })
      .catch((error) =>
        toast.error("Error al obtener los datos del equipamiento:", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsersQueries({
      ...usersQueries,
      [name]: value,
    });
  };
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
          {userDetail && userDetail.length > 0 ? (
            userDetail.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-bold">
                  <Link to={`/admin/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.firstName ? user.firstName : "---"}</TableCell>
                <TableCell>{user.lastName ? user.lastName : "---"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.verified ? "Sí" : "No"}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <FechaVisual fecha={user.createdAt} />
                </TableCell>
                <TableCell>
                  <FechaVisual fecha={user.updatedAt} />
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
  );
}
