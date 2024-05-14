import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import {
  viewUserReservationsSchema,
  addReservationSchema,
  deleteReservationSchema,
} from "../../schemas/reservationSchemas.js";
import isAdmin from "../../middleware/isAdmin.js";
import { createError } from "../../../utils/error.js";

const pool = getPool();

export const reservationRouter = Router();

// Listado de reservas de un usuario
reservationRouter.get(
  "/reservations/:userId",
  authenticate,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { error } = viewUserReservationsSchema.validate({
        userId,
      });
      console.log(userId);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      
      
      const [reservations] = await pool.execute(
        "SELECT * FROM reservations WHERE userId = ?",
        [userId]
      );
      if (!reservations) {
        throw createError(404, "Reservas no encontradas");
      }
      res.status(200).json({
        reservations
      });
    } catch (error) {
      next(error);
    }
  }
);

// Creación de reserva
reservationRouter.post(
  "/reservation/add/:roomId",
  authenticate,
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      const userId = req.user.id;
      const { reservationDateBeg, reservationDateEnd } = req.body;

      const { error } = addReservationSchema.validate({
        roomId,
        reservationDateBeg,
        reservationDateEnd,
      });

      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const [room] = await pool.execute(
        `SELECT * FROM rooms WHERE id = ?`,
        [roomId]
      );

      if (!room || room.length === 0) {
        throw createError(404, "Sala no encontrada");
      }
      
      const { typeOf, capacity } = room[0];
      
      let [existingReservations] = await pool.execute(
        `SELECT * FROM reservations
            WHERE roomId = ? AND
            (reservationDateBeg <= ? AND reservationDateEnd >= ?) OR
            (reservationDateBeg <= ? AND reservationDateEnd >= ?)`,
        [
          roomId,
          reservationDateBeg,
          reservationDateBeg,
          reservationDateEnd,
          reservationDateEnd,
        ]
      );
      
      const userReservationInSameSlot = existingReservations.some(
        (reservation) => reservation.userId === userId
      );
      
      if (userReservationInSameSlot) {
        throw createError(
          400,
          "Ya tienes una reserva en la misma franja horaria"
        );
      }
      
      if (typeOf === "Pública" && existingReservations.length >= capacity) {
        throw createError(
          404,
          "La sala ya está completa para las fechas seleccionadas"
        );
      } else if (typeOf === "Privada" && existingReservations.length > 0) {
        throw createError(
          404,
          "La sala ya está reservada para las fechas seleccionadas"
        );
      }
      
      const reservationsId = crypto.randomUUID();
      await pool.execute(
        `INSERT INTO reservations (id, roomId, userId, reservationDateBeg, reservationDateEnd) VALUES (?,?,?,?,?)`,
        [reservationsId, roomId, userId, reservationDateBeg, reservationDateEnd]
      );
      res.status(201).json({
        message: "Reserva realizada con exito",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Cancelación reserva
reservationRouter.delete(
  "/rooms/:roomId/reservations/:reservationId",
  async (req, res, next) => {
    try {
      const roomId = req.params.roomId;
      const reservationId = req.params.reservationId;
      const { error } = deleteReservationSchema.validate({
        roomId,
        reservationId,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const [reservation] = await pool.execute(
        `SELECT * FROM reservations WHERE id = ? AND roomId = ?`,
        [reservationId, roomId]
      );
      if (reservation.length === 0) {
        throw createError(404, "Reserva no encontrada");
      }
      await pool.execute(
        `DELETE FROM reservations WHERE id = ? AND roomId = ?`,
        [reservationId, roomId]
      );
      res.status(200).json({
        message: "Reserva cancelada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);