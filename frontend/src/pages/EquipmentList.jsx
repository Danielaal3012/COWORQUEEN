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

export const EquipmentList = () => {
  const { authState } = useContext(AuthContext);
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentTotal, setEquipmentTotal] = useState();
  const [equipmentQueries, setEquipmentQueries] = useState({
    search: "",
    offset: 0,
    limit: 10,
    direction: "ASC",
  });
  const { search, offset, limit, direction } = equipmentQueries;
  useEffect(() => {
    console.log({ equipmentQueries });
    fetch(
      `http://localhost:3000/equipment/searchlist?search=${search}&offset=${offset}&limit=${limit}&direction=${direction}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      }
    )
      .then((res) => res.json())
      .then((body) => {
        setEquipmentList(body.data);
        setEquipmentTotal(body.totalResults);
      })
      .catch((error) =>
        toast.error("Error al obtener los datos del equipamiento:", error)
      );
  }, [equipmentQueries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentQueries({
      ...equipmentQueries,
      [name]: value,
    });
  };

  console.log("equipment list: ", equipmentList);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center">
        <Input
          type="search"
          name="search"
          placeholder="Busca un equipamiento"
          onChange={handleChange}
        />
        <Label>Artículos por página</Label>
        <Select
          onValueChange={(value) => {
            console.log({ value });
            setEquipmentQueries((prevState) => ({
              ...prevState,
              limit: value,
            }));
          }}
        >
          <SelectTrigger>
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
            setEquipmentQueries((prevState) => ({
              ...prevState,
              direction: value,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Ascendente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASC">Ascendente</SelectItem>
            <SelectItem value="DESC">Descendente</SelectItem>
          </SelectContent>
        </Select>
        <Button asChild>
          <Link to="/admin/equipment/add">Añadir</Link>
        </Button>
      </div>

      <Table className="w-full">
        <TableCaption>Lita del equipamiento</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead className="w-[450px]">Descripción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipmentList && equipmentList.length > 0 ? (
            equipmentList.map((equipment) => (
              <TableRow key={equipment.id}>
                <TableCell className="font-bold">
                  <Link to={`/admin/equipment/${equipment.id}`}>
                    {equipment.name}
                  </Link>
                </TableCell>
                <TableCell>{equipment.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay artículos</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        totalRecords={equipmentTotal}
        limit={limit}
        offset={offset}
        onPageChange={(pageNumber) => {
          const newOffset = (pageNumber - 1) * limit;

          setEquipmentQueries((prevState) => ({
            ...prevState,
            offset: newOffset,
          }));
        }}
      />
    </div>
  );
};