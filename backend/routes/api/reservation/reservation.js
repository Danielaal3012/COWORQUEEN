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

// Listado de todas las reservas
reservationRouter.get("/reservations", authenticate, isAdmin, async (req, res, next) => {
  try {
    const [reservations] = await pool.execute("SELECT * FROM reservations");

    if (!reservations) {
      throw createError(404, "Reservas no encontradas");
    }

    res.status(200).json({
      reservations,
    });
    
  } catch (error) {
    next(error);
  }
});

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
  "/reservation/:roomId",
  authenticate,
  async (req, res, next) => {
    try {
      const userId = req.user.Id;
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
  "/reservation/:reservationId",
  async (req, res, next) => {
    try {
      const reservationId = req.params.reservationId;
      const { error } = deleteReservationSchema.validate({
        reservationId,
      });
      
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const [result] = await pool.execute(
        `DELETE FROM reservations WHERE id = ? AND reservationCheckin = 0`,
        [reservationId]
      );

      if (result.affectedRows === 0) {
        throw createError(404, "Reserva no encontrada o check-in no realizado");
      }

      res.status(200).json({
        message: "Reserva cancelada con éxito",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Reserva por id de reserva
reservationRouter.get(
  "/reservations/by-reservationId/:reservationId",
  authenticate,
  async (req, res, next) => {
    try {
      const reservationId = req.params.reservationId;
      const [[reservation]] = await pool.execute(
        `SELECT * FROM reservations WHERE id = ?`,
        [reservationId]
      );
      if (reservation.length === 0) {
        throw createError(404, "Reserva no encontrada");
      }
      res.status(200).json({
        reservation,
      });
    } catch (err) {
      next(err);
    }
  }
);