import "dotenv/config.js";
import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import isAdmin from "../../middleware/isAdmin.js";

import { getUser } from "../../../utils/getUser.js";
import { createError } from "../../../utils/error.js";
import { searchFiltersSchema } from "../../schemas/searchSchemas.js";

const dbPool = getPool();
export const adminUsers = Router();

// Ver el listado de usuarios
adminUsers.get(
  "/admin/users",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { search, offset, limit, direction } = req.query;

      const { error } = searchFiltersSchema.validate({
        search,
        offset,
        limit,
        direction,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const validateDirection = ["ASC", "DESC"];
      const orderDirection = validateDirection.includes(direction)
        ? direction
        : "ASC";

      const validateLimit = [10, 25, 50, 100];
      const limitSet = validateLimit.includes(limit) ? limit : 10;

      const [users] = await dbPool.execute(
        `SELECT * FROM users
            WHERE username LIKE ? OR firstName LIKE ? OR lastName LIKE ? OR email LIKE ?
            ORDER BY username ${orderDirection}
            LIMIT ${limitSet} OFFSET ${offset}`,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
      );
      if (!users) {
        throw createError(400, "Impiosible cargar la lista de usuarios");
      }

      res.status(200).json({
        message: users,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Ver el perfil de usuario seleccionado
// userRouter.get("/user/profile", authenticate, async (req, res, next) => {
//   try {
//     const user = await getUser(req.headers.authorization);
//     res.status(200).json({
//       profile: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// Modificar el propio perfil de usuario
adminUsers.get(
  "/admin/users/:userId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const [userData] = await dbPool.execute(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      console.log(userData);
      if (!userData) {
        throw createError(400, "Usuario no encontrado");
      }

      res.status(200).json({
        message: userData,
      });
    } catch (err) {
      next(err);
    }
  }
);
