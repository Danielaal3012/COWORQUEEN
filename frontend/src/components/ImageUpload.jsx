import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaX } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";

const ImageUpload = ({
  onFilesChange,
  maxFiles = 10,
  type = "multiple",
  existing,
  id,
}) => {
  const [files, setFiles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const host = import.meta.env.VITE_APP_HOST;
  const existingCover = existing
    ? `${host}/uploads/rooms/${id}/${existing}`
    : null;
    const eexistingAvatar = existing
    ? `${host}/uploads/avatar/${existing}`
    : null;

  console.log(existing);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setDialogMessage(
        "Solo se permiten archivos de imagen con extensiones png, jpg, jpeg o webp."
      );
      setIsDialogOpen(true);
      return;
    }

    const existingFiles = files.map((f) => f.name + f.size);
    const newFiles = acceptedFiles
      .filter((file) => !existingFiles.includes(file.name + file.size))
      .map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

    if (newFiles.length !== acceptedFiles.length) {
      setDialogMessage("Algunas imágenes ya están subidas y fueron omitidas.");
      setIsDialogOpen(true);
    }

    if (files.length + newFiles.length > maxFiles) {
      setDialogMessage(`Solo puedes subir hasta ${maxFiles} imágenes.`);
      setIsDialogOpen(true);
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (file) => () => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: true,
    onDropRejected: () => {
      setDialogMessage(
        "Solo se permiten archivos de imagen con extensiones png, jpg, jpeg o webp."
      );
      setIsDialogOpen(true);
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div
      className={` p-4 w-full ${
        type === "multiple"
          ? "flex flex-col"
          : "flex flex-row items-center justify-between gap-x-16"
      }`}
    >
      {type === "cover" && files.length == 1 ? (
        files?.map((file, index) => (
          <div
            className="select-none relative m-0 aspect-video min-h-[200px] min-w-[300px] max-h-[200px] max-w-[300px]"
            key={index}
          >
            <div className="w-full h-full overflow-hidden border border-[#D5D4D7] rounded-lg">
              <img
                src={file.preview}
                className="object-cover w-full h-full"
                alt="Preview"
              />
            </div>
            <button
              onClick={removeFile(file)}
              className="absolute top-0 right-0 p-2 mt-1 mr-1 text-white bg-red-700 border border-[#D5D4D7] rounded-full text-md hover:bg-red-800 transition-all ease-in-out duration-200"
            >
              <FaX />
            </button>
          </div>
        ))
      ) : type === "cover" && !existing && files.length == 0 ? (
        <div className="select-none  p-6 text-center border border-[#D5D4D7] aspect-video min-h-[200px] min-w-[300px] max-h-[200px] max-w-[300px] rounded-lg">
          <FaImage className="p-2 m-2 mx-auto text-6xl text-[#63646F] border-2 border-[#D5D4D7] border-dashed rounded-full" />
          <p className="text-[#71717A] font-medium">
            No se han subido archivos
          </p>
          <p className="text-[#9B9BA2] ">Sube una portada para verla aquí</p>
        </div>
      ) : type === "cover" && existing && files.length == 0 ? (
        <div className="select-none relative m-0 aspect-video min-h-[200px] min-w-[300px] max-h-[200px] max-w-[300px]">
          <div className="w-full h-full overflow-hidden border border-[#D5D4D7] rounded-lg">
            <img
              src={existingCover}
              className="object-cover w-full h-full"
              alt="Preview"
            />
          </div>
        </div>
      ) : null}

      <div
        {...getRootProps({ className: "dropzone" })}
        className="p-6 text-center border-2 border-[#D5D4D7] w-full min-h-[200px] max-h-[300px] border-dashed rounded-lg cursor-pointer hover:bg-black/[0.025] transition-all ease-in-out duration-300 select-none "
      >
        <input {...getInputProps()} />
        <MdOutlineFileUpload className="p-2 m-2 mx-auto text-6xl text-[#63646F] border-2 border-[#D5D4D7] border-dashed rounded-full" />
        <p className="text-[#71717A] font-medium ">
          Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos
        </p>
        <p className="text-[#9B9BA2]  ">
          Puedes subir hasta {maxFiles} imágen{maxFiles > 1 ? "es" : ""}
        </p>
      </div>

      {type === "multiple" && files.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          {files.map((file, index) => (
            <div className="relative m-2 h-36 w-36" key={index}>
              <div className="w-full h-full overflow-hidden border border-[#D5D4D7] rounded-lg">
                <img
                  src={file.preview}
                  className="object-cover w-full h-full"
                  alt="Preview"
                />
              </div>
              <button
                onClick={removeFile(file)}
                className="absolute top-0 right-0 p-2 mt-1 mr-1 text-white bg-red-700 border border-[#D5D4D7] rounded-full text-md hover:bg-red-800 transition-all ease-in-out duration-200"
              >
                <FaX />
              </button>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advertencia</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageUpload;
