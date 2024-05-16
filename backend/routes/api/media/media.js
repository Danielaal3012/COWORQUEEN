import "dotenv/config.js";
import express, { Router } from "express";
import { promises as fs } from 'fs';
import { getPool } from "../../../database/getPool.js";
import { createError } from "../../../utils/error.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import path from "node:path";
import process from "node:process";
import fileUpload from "express-fileupload";
import { addMediaAvatarSchema } from "../../schemas/mediaSchema.js";
import handleFileUpload from "../../middleware/handleFileUpload.js";
import isAdmin from "../../middleware/isAdmin.js";
import serveStatic from "../../middleware/serveStatic.js";
import { dirname, resolve, basename } from 'path';
import { unlinkSync } from 'fs';
import { cwd } from 'process';

const dbPool = getPool();
export const mediaRouter = Router();

mediaRouter.use(fileUpload({
  createParentPath: true, 
}));

// Añadir un avatar
mediaRouter.post(
  "/user/:id/media/add-avatar",
  authenticate,
  handleFileUpload,
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      const avatarId = crypto.randomUUID();
      const { fileName } = req.body;

      const [avatar] = await dbPool.execute(
        `SELECT avatar FROM users WHERE id = ?`,
        [userId]
      );

      if (avatar[0].avatar) {
        const avatarUrl = avatar[0].avatar;
        const avatarFileName = basename(avatarUrl);
        const avatarPath = resolve(
          cwd(),
          "..",
          "frontend",
          "public",
          "uploads",
          "avatar",
          avatarFileName
        );
        unlinkSync(avatarPath);
      }

      const uploadedFilePath = req.body.filePath;
      const avatarFileName = basename(fileName);
      const avatarPath = resolve(
        cwd(),
        "..",
        "frontend",
        "public",
        "uploads",
        "avatar",
        avatarFileName
      );

      await fs.rename(uploadedFilePath, avatarPath);
        
      await dbPool.execute(
        `INSERT INTO media(id, url, userId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = ?, id = ?`,
        [avatarId, fileName, userId, fileName, avatarId]
      );

      await dbPool.execute(
        `UPDATE users SET avatar = ? WHERE id = ?`,
        [fileName, userId]
      );

      res.status(201).json({
        message: `Se ha actualizado el avatar correctamente`,
        file: fileName,
      });
    } catch (err) {
      next(err);
    }
  }
);

mediaRouter.post(
  "/room/:id/media/add-media",
  authenticate,
  isAdmin,
  handleFileUpload,
  async (req, res, next) => {
    try {
      const { id: roomId } = req.params;
      const mediaId = crypto.randomUUID();
      const { fileName } = req.body;

      const [room] = await dbPool.execute(
        `SELECT image FROM rooms WHERE id = ?`,
        [roomId]
      );

       if (room[0].image) {
         const imageUrl = room[0].image;
         const imageFileName = basename(imageUrl);
         const imagePath = resolve(
           cwd(),
           "..",
           "frontend",
           "public",
           "uploads",
           "rooms",
           roomId,
           imageFileName
         );
         unlinkSync(imagePath);
       }

      const uploadedFilePath = req.body.filePath;
      const imageFileName = basename(fileName);
      const imagePath = resolve(
        cwd(),
        "..",
        "frontend",
        "public",
        "uploads",
        "rooms",
        roomId,
        imageFileName
      );

      const imageDir = dirname(imagePath);
      await fs.mkdir(imageDir, { recursive: true });

      await fs.rename(uploadedFilePath, imagePath);

      await dbPool.execute(
        `INSERT INTO media(id, url, roomId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = ?, id = ?`,
        [mediaId, fileName, roomId, fileName, mediaId]
      );

      await dbPool.execute(
        `UPDATE rooms SET image = ? WHERE id = ?`,
        [fileName, roomId]
      );

      res.status(201).json({
        message: `Se ha añadido el archivo correctamente`,
        file: fileName,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Añadir imagen a incidencia
mediaRouter.post(
  "/incidence/:id/media/add-media",
  authenticate,
  handleFileUpload,
  async (req, res, next) => {
    try {
      const { id: incidentId } = req.params;
      const { API_HOST } = process.env;
      const mediaId = crypto.randomUUID();
      const { fileName } = req.body;

      const url = `${API_HOST}/uploads/media/${fileName}`;

      await dbPool.execute(
        `INSERT INTO media(id, url, incidenceId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = ?, id = ?`,
        [mediaId, url, incidentId, url, mediaId]
      );

      // la tabla incidents no tiene una columna media

      res.status(201).json({
        message: `Se ha añadido el archivo correctamente`,
        url: url,
      });
    } catch (err) {
      next(err);
    }
  }
);