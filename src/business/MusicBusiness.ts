import { AuthenticationData, MusicInputDTO } from "../model/Music";
import { MusicDatabase } from "../data/MusicDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { CustomError } from "../error/CustomError";
import { getCreatedDate } from "../services/getCreatedDate";

export class MusicBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private musicDatabase: MusicDatabase
  ) {}

  async registryMusic(music: MusicInputDTO, authorization: string | undefined) {
    const tokenData: AuthenticationData = this.authenticator.getData(
      authorization!
    );

    if (!tokenData) {
      throw new CustomError(403, "Invalid Token");
    }

    if (
      !music.title ||
      !music.author ||
      !music.file ||
      !music.genre ||
      !music.album
    ) {
      throw new CustomError(
        400,
        "'title', 'author', 'file', 'genre' and 'album' must be informed!"
      );
    }

    const id = this.idGenerator.generate();

    const date = getCreatedDate(1);

    await this.musicDatabase.registryMusic(
      id,
      music.title,
      music.author,
      date,
      music.file,
      music.genre,
      music.album
    );

    return "Registry Done!";
  }

  async getMusicById(id: string, authorization: string | undefined) {
    const tokenData: AuthenticationData = this.authenticator.getData(
      authorization!
    );

    if (!tokenData) {
      throw new CustomError(403, "Invalid Token");
    }

    const music = await this.musicDatabase.getMusicById(id);

    if (!music) {
      throw new CustomError(404, "Music Not Found!");
    }

    return music;
  }

  async getAllMusics(authorization: string | undefined) {
    const tokenData: AuthenticationData = this.authenticator.getData(
      authorization!
    );

    if (!tokenData) {
      throw new CustomError(403, "Invalid Token");
    }

    const musics = await this.musicDatabase.getAllMusics();

    if (!musics) {
      throw new CustomError(404, "Music Not Found!");
    }

    return musics;
  }
}
