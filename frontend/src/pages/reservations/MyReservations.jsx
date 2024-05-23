import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/auth/auth-context';
import { DataContext } from '@/components/DataContext';
import { Badge } from '@/components/UI/badge';
import { Link } from 'react-router-dom';

const MyReservations = () => {
    const { authState } = useContext(AuthContext);
    //const { rooms, updateRooms } = useContext(DataContext);
    const host = import.meta.env.VITE_APP_HOST;
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetch(`${host}/reservations/${authState.user.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((body) => {
                setReservations(body.reservations)
            })
    }
        , []);
        
        console.log(reservations)

    return (
        <div>
            <h2>Próximas reservas</h2>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        <Link to={`/reservation/${reservation.id}`}>
                            <h3>{reservation?.roomName}</h3>
                            <p>{reservation?.date}</p>
                            <p>{reservation?.startTime} - {reservation.endTime}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <h2>Reservas anteriores</h2>
        </div>
    )

}


export default MyReservations;