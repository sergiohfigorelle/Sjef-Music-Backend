export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly nickname: string,
    public readonly password: string
  ) {}
}

export interface UserInputDTO {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface AuthenticationData {
  id: string;
  role?: string;
}
