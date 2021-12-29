import bcrypt from 'bcryptjs';

export function hashPassword(password: string): string{
  return bcrypt.hashSync(password, 8);
}

export function comparePassword(requestPassword: string, hashPassword: string): boolean{
  return bcrypt.compareSync(requestPassword, hashPassword);
}
