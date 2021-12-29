import { User } from "../models/User";

export class UserDTO{
  id?: number;
  login?: string;
  email?: string;
  username?: string;

  static fromUser(user: User): UserDTO {
    const dto = new UserDTO();
    dto.id = user.id;
    dto.username = user.username;
    dto.login = user.login;
    dto.email = user.email;

    return dto;
  }
}


