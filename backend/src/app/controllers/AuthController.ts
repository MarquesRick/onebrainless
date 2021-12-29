import { Request, Response } from "express";
import { AuthDTO } from "../dtos/AuthDTO";
import { ResponseStatus } from "../enum/ResponseStatus";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

class AuthController {
  private _userService = new UserService();
  private _authService = new AuthService();

  async authenticate(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { login, password } = req.body;
      const user = await this._userService.getUserByLogin(login);

      if (!user)
        return res.json(AuthDTO.createAuthDto("notFound"));

      return res.json(await this._authService.getAuthenticate(password, user));
    } catch (err) {
      console.log(err);
      res.sendStatus(ResponseStatus.BadRequest);
    }
  }
}

export default new AuthController();
