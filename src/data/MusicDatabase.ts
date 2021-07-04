import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";
import { CustomError } from "../error/CustomError";

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = "sjef_musics";

  private static toMusicModel(music: any): Music {
    return new Music(
      music.id,
      music.title,
      music.author,
      music.date,
      music.file,
      music.genre,
      music.album
    );
  }

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

  public async getMusicById(id: string): Promise<Music> {
    try {
      const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${MusicDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `);

      return MusicDatabase.toMusicModel(result[0][0]);
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }

  public async getAllMusics(): Promise<Music> {
    try {
      const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${MusicDatabase.TABLE_NAME};
         `);

      return result[0];
    } catch (error) {
      console.log(error);
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }
}
