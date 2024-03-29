import express from "express";
import { MusicController } from "../controller/MusicController";

export const musicRouter = express.Router();

const musicController = new MusicController();

musicRouter.post("/registry", musicController.registryMusic);
musicRouter.get("/", musicController.getAllMusics);
musicRouter.get("/:id", musicController.getMusicById);
