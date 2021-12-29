import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ResponseStatus } from "../enum/ResponseStatus";
import { UserDTO } from "../dtos/UserDTO";

class UserController {

  private _userService = new UserService();

  async getAll(
    req: Request,
    res: Response
  ): Promise<Response | UserDTO[] | undefined> {
    try {
      console.log(req.userId);
      const users = await this._userService.getAll();

      return res.json(users);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.query.email as string;

      const user = await this._userService.getUser(email);

      if (user) {
        return res.json(user);
      }

      return res.sendStatus(ResponseStatus.NotFound);
    } catch (err) {
      console.log(err);
      return res.sendStatus(ResponseStatus.BadRequest);
    }
  }

  // async getLogin(
  //   email: string,
  //   password: string,
  //   res: Response
  // ): Promise<Response> {
  //   try {
  //     const responseMessage = await this.userService.getLogin(email, password);

  //     return res.status(ResponseStatus.Sucess).send(responseMessage);
  //   } catch (err) {
  //     console.log(err);
  //     return res.sendStatus(ResponseStatus.BadRequest);
  //   }
  // }

  // index(req: Request, res: Response) {
  //   return res.send("ok");
  // }

  // // async store(req: Request, res: Response){
  // //     const repository = getRepository(User);
  // //     const {email, senha} = req.body;

  // //     const userExists = await repository.findOne({where: {email}});

  // //     if(userExists){
  // //         //conflict
  // //         return res.sendStatus(409);
  // //     }

  // //     const user = repository.create({email, senha});
  // //     await repository.save(user);

  // //     return res.json(user);
  // //  }

  // async save(req: Request, res: Response): Promise<Response>{
  //   try{
  //     const {email, password, username} = req.body;

  //     const userDTO: IUserDTO = {
  //       email: email,
  //       password: password,
  //       username: username
  //     };

  //     console.log(userDTO);
  //     const userService = new UserService();
  //     const response = await userService.save(userDTO);

  //     return res.sendStatus(response);

  //   }catch(err){
  //     console.log(err);
  //     return res.sendStatus(ResponseStatus.BadRequest);
  //   }
  // }
}

export default new UserController();
