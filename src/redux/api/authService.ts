import { callAPiMultiPart } from "./http-common";

interface signup {
  email: string;
  password: string;
  re_password: string;
  gender: number;
  phone: number;
  picture: string;
}
interface login {
  email: string;
  password: string;
}
const signUp = (data: signup) => callAPiMultiPart.post("auth/users/", data);
const login = (data: login) => callAPiMultiPart.post("auth/jwt/create/", data);

const authServices = {
  signUp,
  login,
};
export default authServices;
