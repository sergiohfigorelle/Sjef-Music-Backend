import { Request, Response } from "express";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";

const musicBusiness = new MusicBusiness(
  new IdGenerator(),
  new HashManager(),
  new Authenticator(),
  new MusicDatabase()
);

export class MusicController {
  async registryMusic(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      const input: MusicInputDTO = {
        title: req.body.title,
        author: req.body.author,
        file: req.body.file,
        genre: req.body.genre,
        album: req.body.album,
      };

      const registry = await musicBusiness.registryMusic(input, authorization);

      res.status(200).send({ registry });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async getMusicById(req: Request, res: Response) {
    const { authorization } = req.headers;

    try {
      const id = req.params.id;

      const music = await musicBusiness.getMusicById(id, authorization);

      res.status(200).send({ music });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async getAllMusics(req: Request, res: Response) {
    const { authorization } = req.headers;

    try {
      const musics = await musicBusiness.getAllMusics(authorization);

      res.status(200).send({ musics });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
