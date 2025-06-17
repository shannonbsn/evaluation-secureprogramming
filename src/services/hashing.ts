// Ici dénissez les fonctions qui vont vous permettre de vérifier et générer des mots de passes sécurisés
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export const hashPassword = async (password: string): Promise<{ password: string, salt: string }> => {
  const salt = randomBytes(10).toString('hex');
  const hashedPassword = await argon2.hash(password + salt);
  return { password: hashedPassword, salt };
};

export const verifyPassword = async (
  password: string,
  salt: string,
  hashedPassword: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, password + salt);
};
