import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateReservationId } from "../../../validations/validateReservationId.js";
import { validateReviewId } from "../../../validations/validateReviewId.js";
import {
  viewReviewSchema,
  viewReviewByUserSchema,
  viewReviewByRoomSchema,
  viewReviewByReservationSchema,
  addReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
} from "../../schemas/reviewSchemas.js";
import { createError } from "../../../utils/error.js";

const pool = getPool();

export const reviewRouter = Router();

// Ver reviews
reviewRouter.get("/reviews/list", async (req, res, next) => {
  try {
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate , reviews.description, reviews.reservationId FROM reviews"
    );
    if (!reviews) {
      throw createError(404, "Reviews no encontradas");
    }
    res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// Listado de reviews por usuario
reviewRouter.get("/reviews/by-userId/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { error } = viewReviewByUserSchema.validate({ userId });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate, reviews.description, reviews.reservationId FROM reviews JOIN reservations ON reviews.reservationId = reservations.id WHERE reservations.userId = ?",
      [userId]
    );
    if (!reviews) {
      throw createError(404, "Reviews no encontradas");
    }
    res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// Listado de reviews por sala
reviewRouter.get("/reviews/by-roomId/:roomId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const { error } = viewReviewByRoomSchema.validate({ roomId });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [reviews] = await pool.execute(
      "SELECT reviews.id, reviews.rate, reviews.description, reviews.reservationId FROM reviews JOIN reservations ON reviews.reservationId = reservations.id WHERE reservations.roomId = ?",
      [roomId]
    );
    if (!reviews) {
      throw createError(404, "Reviews no encontradas");
    }
    res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// Listado de reviews por reserva
reviewRouter.get(
  "/reviews/by-reservationId/:reservationId",
  authenticate,
  async (req, res, next) => {
    try {
      const reservationId = req.params.reservationId;
      const { error } = viewReviewByReservationSchema.validate({ reservationId });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const [reviews] = await pool.execute(
        "SELECT reviews.id, reviews.rate, reviews.description, reviews.reservationId FROM reviews WHERE reviews.reservationId = ?",
        [reservationId]
      );
      if (!reviews) {
        throw createError(404, "Reviews no encontradas");
      }
      res.status(200).json({
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Crear review
reviewRouter.post('/review/create/:reservationId',
 authenticate, 
 async (req, res, next) => {
const { description, rate} = req.body;
const {reservationId} = req.params;
const { error } = addReviewSchema.validate({
    description,
    rate,
    reservationId,
  });

  if (error) {
    throw createError(400, "Datos de entrada no válidos");
  }

  const userId = req.user.id;

  try {
    const [reservation] = await pool.execute(
      `SELECT * FROM reservations WHERE id =? AND userId =?`,
      [reservationId, userId]
    );

    if (!reservation[0]) {
      return res.status(404).json({
        message: "Reserva no encontrada o no pertenece al usuario",
      });
    }

    const roomId = reservation[0].roomId;

    const [existingReview] = await pool.execute(
      "SELECT * FROM reviews WHERE reservationId =?",
      [reservationId]
    );

    if (existingReview.length > 0) {
      throw createError(400, "La review ya existe");
    }

    const reservationCheck = await validateReservationId(reservationId);
    if (!reservationCheck.reservationCheckin) {
      throw createError(400, "Reserva no utilizada");
    }

    await pool.execute(
      "INSERT INTO reviews(id, rate, description, reservationId) VALUES (?,?,?,?)",
      [crypto.randomUUID(), rate, description, reservationId]
    );

    res.status(201).json({
      message: "Review creada correctamente",
    });
  } catch (err) {
    next(err);
  }
});

// Borrar review
reviewRouter.delete(
  "/review/delete/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const { error } = deleteReviewSchema.validate({ reviewId });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const review = await validateReviewId(reviewId);
      await pool.execute("DELETE FROM reviews WHERE id = ?", [reviewId]);
      res.status(200).json({
        message: "Review eliminada correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Editar review
reviewRouter.patch(
  "/review/edit/:reviewId",
  authenticate,
  async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const { rate, description } = req.body;
      const { error } = updateReviewSchema.validate({
        reviewId,
        rate,
        description,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      const review = await validateReviewId(reviewId);
      await pool.execute(
        "UPDATE reviews SET rate = ?, description = ?, updatedAt = CURRENT_TIME() WHERE id = ?",
        [
          rate ? rate : review.rate,
          description ? description : review.description,
          reviewId,
        ]
      );
      res.status(200).json({
        message: "Review modificada correctamente",
      });
    } catch (err) {
      next(err);
    }
  }
);


// Peticion para obtener el id de las reviews de una Reservaciòn

reviewRouter.get('/review/reservation/:reservationId', 
authenticate,
validateReviewId, 
async (req, res,next) => {

  try {
    const reservationId = req.params;

    if (!reservationId) {
      return res.status(400).send('Falta el parámetro reservationId');
    }

    const [result] = await pool.execute(
      "SELECT id FROM reviews WHERE reservationId=? ", 
      [reservationId]
    );

    if (result.length === 0) {
      throw createError(404, "Review noooooo encontrada");
    }
    res.status(200).json({
      id:result[0].id
    });
  } catch (err) {
    next(err);
  }
}
);
