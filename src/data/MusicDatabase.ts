import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = "sjef_musics";

  public async registryMusic(
    id: string,
    title: string,
    author: string,
    date: string,
    file: string,
    genre: [],
    album: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          title,
          author,
          date,
          file,
          genre,
          album,
        })
        .into(MusicDatabase.TABLE_NAME);
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }
}
