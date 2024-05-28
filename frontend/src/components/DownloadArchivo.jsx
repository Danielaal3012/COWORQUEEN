import React from 'react';

const DownloadButton = ({ fileUrl, fileName }) => {

  const handleDownload = () => {
    // Crear un elemento <a>
    const link = document.createElement('a');
    link.href = fileUrl; // Establecer la URL del archivo
    link.download = fileName; // Establecer el nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Eliminar el elemento <a> después de hacer clic
  };

  return (
    <button onClick={handleDownload}>
     Sobre Nosotros
    </button>
  );
};

export default DownloadButton;
