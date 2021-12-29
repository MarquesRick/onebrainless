import { User } from "../models/User";

export class AuthDTO{
  id?: number;
  username?: string;
  email?: string;
  token?: string;
  message: string;

  static createAuthDto(message: string, token?: string, user?: User): AuthDTO {
    const auth = new AuthDTO();
    auth.id = user?.id ? user.id : 0;
    auth.username = user?.username ? user.username : '';
    auth.email = user?.email ? user.email : '';
    auth.token = token ? token : '';
    auth.message = message;

    return auth;
  }
}


