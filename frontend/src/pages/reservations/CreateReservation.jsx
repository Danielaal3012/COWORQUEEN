import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import { Calendar } from "@/components/UI/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { es } from "date-fns/locale";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button";

const CreateReservation = () => {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();
  const { id } = useParams();

  const [reservationData, setReservationData] = useState({
    roomId: id,
    reservationDateBeg: "",
    reservationDateEnd: "",
  });

  const currentDate = new Date();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleStartTimeSelect = (selectedTime) => {
    setStartTime(selectedTime);
    if (!endTime || endTime <= selectedTime) {
      setEndTime(selectedTime + 1);
    }
  };

  const handleEndTimeSelect = (selectedTime) => {
    setEndTime(selectedTime);
  };


  let hours = Array.from({ length: 15 }, (_, i) => i + 8);

  if (currentDate.getDate() === date?.getDate()) {
     hours = hours.filter(hour => hour > currentDate.getHours())
  }

  // Efecto para cargar las franjas horarias disponibles de un roomId en una reserva, en caso de estar lleno, deshabilitar el día/hora del calendario y darle las demás opciones al usuario

  const formatDateTime = (date, time) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hourString = time?.toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hourString}:00:00`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedReservationData = {
      ...reservationData,
      reservationDateBeg: formatDateTime(date, startTime),
      reservationDateEnd: formatDateTime(date, endTime),
    }
  
    try {

      const response = await fetch(`${host}/reservation/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify(formattedReservationData),
      });

      if (response.ok) {
        toast.success("Reserva creada con éxito");
        //navigate("/profile");
      } else {
        toast.error("Error al crear la reserva");

      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <Calendar
        mode="single"
        locale={es}
        selected={date}
        fromDate={new Date()}
        toMonth={new Date(currentDate.getFullYear(), currentDate.getMonth() + 3)}
        onSelect={handleDateSelect}
        className="border rounded-md h-fit"
      />

      <Select onValueChange={handleStartTimeSelect} disabled={date === null}>
        <SelectTrigger className="w-[175px]">
        <SelectValue placeholder={startTime !== null ? `${startTime?.toString().padStart(2, "0")}:00` : 'Hora de entrada'}>
            {startTime !== null ? `${startTime?.toString().padStart(2, "0")}:00` : 'Hora de entrada'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hours.slice(0, -1).map((hour) => {
            const hourString = hour.toString().padStart(2, "0");
            return (
              <SelectItem key={hour} value={hour}>
                {hourString}:00
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select onValueChange={handleEndTimeSelect} disabled={startTime === null}>
        <SelectTrigger className="w-[175px]">
          <SelectValue placeholder={endTime !== null ? `${endTime?.toString().padStart(2, "0")}:00` : 'Hora de salida'}>
            {endTime !== null ? `${endTime?.toString().padStart(2, "0")}:00` : null}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hours
            .slice(1)
            .filter((hour) => hour > startTime)
            .map((hour) => {
              const hourString = hour.toString().padStart(2, "0");
              return (
                <SelectItem key={hour} value={hour}>
                  {hourString}:00
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit}>Reservar</Button>
    </>
  );
};

export default CreateReservation;