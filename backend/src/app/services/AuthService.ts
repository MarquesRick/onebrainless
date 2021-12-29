import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import { AuthDTO } from "../dtos/AuthDTO";
import { SECRET } from '../../connections/requests';


interface IAuthService {
  getAuthenticate(password: string, userDto: User): Promise<AuthDTO>;
}


export class AuthService implements IAuthService {

  async getAuthenticate(password: string, user: User): Promise<AuthDTO> {

    const isValidPassword = await bcrypt.compare(password, user.password);

     if(!isValidPassword){
         return AuthDTO.createAuthDto('incorrectPass');
     }

     const token = jwt.sign({id: user.id}, SECRET, {expiresIn: '1d'});

     const authResponse = AuthDTO.createAuthDto('success', token, user);

     return authResponse;
  }
}
