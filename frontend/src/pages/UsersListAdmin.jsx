import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import { Input } from "@/components/UI/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/UI/select.jsx";
import { SelectValue } from "@radix-ui/react-select";
import { Label } from "@/components/UI/label.jsx";
import { Button } from "@/components/UI/button.jsx";
import { Pagination } from "@/components/Pagination.jsx";

export function UsersListAdmin() {
  const { authState } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);
  const [usersQueries, setUsersQueries] = useState({
    search: "",
    offset: 0,
    limit: 10,
    direction: "ASC",
  });
  const { search, offset, limit, direction } = usersQueries;

  function FechaVisual({ date }) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return <div>{new Date(date).toLocaleDateString("es-ES", options)}</div>;
  }

  useEffect(() => {
    fetch(
      `http://localhost:3000/admin/users?search=${search}&offset=${offset}&limit=${limit}&direction=${direction}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUsersList(data.message);
      })
      .catch((error) =>
        toast.error("Error al obtener los datos del equipamiento:", error)
      );
  }, [usersQueries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsersQueries({
      ...usersQueries,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-1.5 items-center">
        <Input
          className="w-[400px]"
          type="search"
          name="search"
          placeholder="Busca un usuario"
          onChange={handleChange}
        />
        <Label className="w-[150px]">Usuarios por página</Label>
        <Select
          onValueChange={(value) =>
            setUsersQueries((prevState) => ({
              ...prevState,
              limit: value,
            }))
          }
        >
          <SelectTrigger className="w-[75px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <Label>Orden</Label>
        <Select
          onValueChange={(value) =>
            setUsersQueries((prevState) => ({
              ...prevState,
              direction: value,
            }))
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Ascendente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASC">Ascendente</SelectItem>
            <SelectItem value="DESC">Descendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
          {usersList && usersList.length > 0 ? (
            usersList.map((user) => (
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
