export class Music {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly date: string,
    public readonly file: string,
    public readonly genre: [],
    public readonly album: string
  ) {}
}

export interface MusicInputDTO {
  title: string;
  author: string;
  file: string;
  genre: [];
  album: string;
}

export interface AuthenticationData {
  id: string;
}
