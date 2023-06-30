import * as argon2 from "argon2";

export const passwordHashing = async (password: string) => {
  try {
    const hash = await argon2.hash(password);
    console.log('hhhhhhhhhhhhhhhhaaaaaaaaaaaaaash', hash);
    
    return hash;
  } catch(e) {
    return e;
  }
} 

export const passwordVerifying = async (hashPassword, password) => {
  try {
    if (await argon2.verify(hashPassword, password)) {
      return true;
    } else {
      return false;
    }
  } catch(e) {
    return e;
  }
}