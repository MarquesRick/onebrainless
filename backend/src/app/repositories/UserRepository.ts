import axios from 'axios';
import { BASE_URL_JSON_SERVER } from '../../connections/requests';
import { User } from '../models/User';

interface IUserRepository {
  getAll(): Promise<User[] | null>;
  getUser(email: string): Promise<User | null>;
  getUserByLogin(login: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  // save(user: IUserDTO): Promise<number>;
}

export class UserRepository implements IUserRepository{

  async getUserById(id: number): Promise<User | null> {
    const response = await axios.get<User[]>(`${BASE_URL_JSON_SERVER}/user?id=${id}`)
    .then(response => response.data);

    return response[0];
  }

  async getUserByLogin(login: string): Promise<User | null> {

    const response = await axios.get<User[]>(`${BASE_URL_JSON_SERVER}/user?login=${login}`)
    .then(response => response.data);

    return response[0];
  }


  async getAll(): Promise<User[] | null> {
    const response = await axios.get<User[]>(`${BASE_URL_JSON_SERVER}/user`)
    .then(response => response.data);

  return response;
  }

  async getUser(email: string): Promise<User | null> {

    const response = await axios.get<User[]>(`${BASE_URL_JSON_SERVER}/user?email=${email}`)
    .then(response => response.data);

    return response[0];
  }
}
