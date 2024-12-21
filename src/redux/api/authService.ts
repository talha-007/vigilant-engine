import { callAPi, callAPiMultiPart } from "./http-common";

interface signup {
  email: string;
  password: string;
  re_password: string;
  profile: {
    gender: number;
    phone: number;
    picture: string;
  };
}
interface login {
  email: string;
  password: string;
}
const signUp = (data: signup) => callAPiMultiPart.post("auth/users/", data);
const login = (data: login) => callAPiMultiPart.post("auth/jwt/create/", data);
const getProfile = () => callAPi.get("auth/users/me");

const authServices = {
  signUp,
  login,
  getProfile,
};
export default authServices;
