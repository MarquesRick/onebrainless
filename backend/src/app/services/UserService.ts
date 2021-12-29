import { UserDTO } from "../dtos/UserDTO";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";


interface IUserService {
  getAll(): Promise<UserDTO[] | null>;
  getUser(email: string): Promise<UserDTO | null>;
  getUserByLogin(login: string): Promise<User | null>;
  // save(userDTO: IUserDTO): Promise<number>;
}


export class UserService implements IUserService {
  private userRepository = new UserRepository();

  async getUserByLogin(login: string): Promise<User | null> {

    const user = await this.userRepository.getUserByLogin(login);

    if(user)
      return user;

    return null;
  }

  async getUser(email: string): Promise<UserDTO | null> {

    const user = await this.userRepository.getUser(email);

    if(user)
      return UserDTO.fromUser(user);

    return null;
  }

  async getAll(): Promise<UserDTO[] | null> {
    const users = await this.userRepository.getAll();

    if (users)
      return users.map((user) => (UserDTO.fromUser(user)));

    return null;
  }
}
