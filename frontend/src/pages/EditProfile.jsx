import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { AuthContext } from "../auth/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { FaPencilAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUpload from "@/components/ImageUpload";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [previousInfo, setPreviousInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const { authState, updateUser, updateAvatar } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const host = import.meta.env.VITE_APP_HOST;
  const avatar = authState?.user?.avatar ? host + "/uploads/avatar/" + authState.user.avatar : null;

  useEffect(() => {
    if (authState && authState.user) {
      setUser(authState.user);
      setPreviousInfo(authState.user);
    }
  }, [authState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", avatarUpload);

    const response = await fetch(`${host}/user/${authState.user.id}/media/add-avatar`,
      {
        method: "POST",
        headers: {
          Authorization: authState.token,
       },
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      updateAvatar(data.file);
      toast.success("Avatar actualizado correctamente");
      //navigate("/profile");
    } else {
      toast.error(data.message);
    }
  };

  const [avatarUpload, setAvatarUpload] = useState(null); 

  const handleAvatarUpdate = (newFiles) => {
    if (newFiles.length > 0) {
      setAvatarUpload(newFiles[0]); 
    }
  };

  const handleSaveChanges = async () => {

    if (avatarUpload) {
      try {
        handleFileUpload();
      } catch {
        handleFileUpload();
      }
    }

    try {
      const response = await fetch(`${host}/user/update/profile/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      } else {
        updateUser(user);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="w-full">
      {user && (
        <div className="flex flex-col w-full px-4 md:px-0 ">
            {/* <Avatar className="w-[96px] h-[96px] aspect-square">
            <AvatarImage src={previewUrl ? previewUrl : avatar} />
                          <AvatarFallback className="text-4xl bg-secondary/75">
                {authState?.user?.firstName?.split("")[0]}
              </AvatarFallback>
            </Avatar> */}
            <ImageUpload onFilesChange={handleAvatarUpdate} maxFiles={1} type="avatar" existing={avatar} id={user.id} disabledState={!editing} />
            {/* <Input
              type="file"
              className="w-2/3"
              disabled={!editing}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setPreviewUrl(URL.createObjectURL(e.target.files[0]));
              }}
            /> */}
            {/* Mostrar preview de la imagen, quitar texto del nombre de archivo */}
          <div className="flex flex-col w-full mt-8 gap-y-4">
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Nombre de usuario</Label>
              <Input
                name="username"
                placeholder="Nombre de usuario"
                className="w-2/3"
                value={user.username}
                onChange={handleInputChange}
                disabled={!editing} // Si no estamos editando, deshabilitamos el input
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Email</Label>
              <Input
                name="email"
                placeholder="Email"
                className="w-2/3"
                value={user.email}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Nombre</Label>
              <Input
                name="firstName"
                placeholder="Nombre"
                className="w-2/3"
                value={user.firstName}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Apellido</Label>
              <Input
                name="lastName"
                placeholder="Apellido"
                className="w-2/3"
                value={user.lastName}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </div>
            {editing ? (
              <div className="flex flex-row gap-x-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditing(false);
                    setUser(previousInfo);
                    setAvatarUpload(null);
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
                  Editar perfil
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;