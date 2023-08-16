import * as argon2 from "argon2";

export const passwordHashing = async (password: string): Promise<any> => {
  try {
    const hash: string = await argon2.hash(password);
    return hash;
  } catch (e) {
    return e;
  }
}

export const passwordVerifying = async (hashPassword: string, password: string): Promise<any> => {
  try {
    if (await argon2.verify(hashPassword, password)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return e;
  }
}