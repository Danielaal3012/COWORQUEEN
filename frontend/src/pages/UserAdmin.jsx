import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/UI/button.jsx";
import { Switch } from "@/components/UI/switch.jsx";
import { FaTrash } from "react-icons/fa";

export function UserAdmin() {
  const [userDetail, setUserDetail] = useState([]);
  const [editing, setEditing] = useState(false);
  const { authState } = useContext(AuthContext);
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();

  function FechaVisual({ date }) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    if (date) {
      return <div>{new Date(date).toLocaleDateString("es-ES", options)}</div>;
    } else {
      return <div>---</div>;
    }
  }

  useEffect(() => {
    fetch(`${host}/admin/users/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setUserDetail(body.data);
      })
      .catch((error) =>
        toast.error("Error al obtener los datos del equipamiento:", error)
      );
  }, []);

  const onChangeCheck = () => {
    if (userDetail.role === "normal") {
      setUserDetail({
        ...userDetail,
        role: "admin",
      });
    } else if (userDetail.role === "admin") {
      setUserDetail({
        ...userDetail,
        role: "normal",
      });
    }
  };

  async function handleSaveChanges(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${host}/admin/users/role/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify({
          role: userDetail.role,
        }),
      });
      console.log({ response });
      if (!response.ok) {
        toast.error("Error al actualizar el rol de usuario");
      } else {
        toast.success(`Rol de usuario cambiado a ${userDetail.role}`);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  }

  const handleIncidentDeletion = () => {
    fetch(`${host}/admin/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
          navigate("/admin/users");
          toast.success("Artículo eliminado correctamente");
        }
      })
      .catch((error) =>
        console.error("Error al eliminar la incidencia:", error)
      );
  };

  const showConfirmationNotification = () => {
    toast.warn(
      <div className="flex flex-col gap-3">
        <p>¿Deseas eliminar el usuario?</p>

        <div className="flex justify-between px-4 md:px-0">
          <Button onClick={() => handleIncidentDeletion()}>Aceptar</Button>
          <Button onClick={() => toast.dismiss()}>Rechazar</Button>
        </div>
      </div>,
      {
        autoClose: false,
      }
    );
  };

  console.log({ rol: userDetail.role });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-4 md:px-0">
        <h2>{userDetail.username}</h2>
        {authState.user.role === "admin" && (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <Link to="/admin/users">Volver</Link>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={showConfirmationNotification}
            >
              <FaTrash />
            </Button>
            <ToastContainer position="top-center" theme="colored" />
          </div>
        )}
      </div>
      <Table className="w-fit">
        <TableCaption>Lita de usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Apellidos</TableHead>
            <TableHead className="w-[200px]">email</TableHead>
            <TableHead className="w-[50px]">Verificado</TableHead>
            <TableHead className="w-[50px]">Admin</TableHead>
            <TableHead className="w-[200px]">Creado</TableHead>
            <TableHead className="w-[200px]">Última modificación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userDetail ? (
            <TableRow>
              <TableCell>
                {userDetail.firstName ? userDetail.firstName : "---"}
              </TableCell>
              <TableCell>
                {userDetail.lastName ? userDetail.lastName : "---"}
              </TableCell>
              <TableCell>{userDetail.email}</TableCell>
              <TableCell>{userDetail.verified ? "Sí" : "No"}</TableCell>
              <TableCell>
                <Switch
                  checked={userDetail.role === "admin"}
                  onCheckedChange={onChangeCheck}
                  disabled={!editing}
                />
              </TableCell>
              <TableCell>
                <FechaVisual date={userDetail.createdAt} />
              </TableCell>
              <TableCell>
                <FechaVisual date={userDetail.updatedAt} />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>No hay usuarios</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editing ? (
        <div className="flex flex-row gap-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              setEditing(false);
            }}
            className="flex justify-center w-1/2 mx-auto mt-4 text-center"
          >
            Cancelar
          </Button>{" "}
          <Button
            onClick={handleSaveChanges}
            className="flex justify-center w-1/2 mx-auto mt-4 text-center"
          >
            Guardar cambios
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 gap-y-2 ">
          <Button onClick={() => setEditing(true)} className="w-full ">
            Editar artículo
          </Button>
        </div>
      )}
    </div>
  );
}
