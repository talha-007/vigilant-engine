import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import loginImg from "../assets/login.png";
import Iconify from "../components/iconify";
import vector1 from "../assets/Vector1.png";
import vector2 from "../assets/vector2.png";
import vector3 from "../assets/Vector3.png";
import { useState } from "react";
import authServices from "../redux/api/authService";
const initialValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // If the input is of type 'file', store the file(s)
    const newValue = value;

    setValues({
      ...values,
      [name]: newValue,
    });

    // Call validations (exclude file validations if not needed)
    validations({
      [name]: newValue,
    });
  };

  const validations = (fieldValue = values) => {
    const temp = { ...errors };

    // Email validation (format and required)
    if ("email" in fieldValue) {
      temp.email = fieldValue.email
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue.email)
          ? ""
          : "Please enter a valid email address"
        : "Email is required";
    }

    // Password validation (minimum length and required)
    if ("password" in fieldValue) {
      temp.password = fieldValue.password
        ? fieldValue.password.length >= 6
          ? ""
          : "Password must be at least 6 characters long"
        : "Password is required";
    }

    setErrors({
      ...temp,
    });

    // Return true if all errors are empty
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async () => {
    try {
      const datas = {
        email: values.email,
        password: values.password,
      };
      console.log("datas", datas);
      if (validations()) {
        setIsLoading(true);
        const res = await authServices.login(datas);
        console.log("res", res);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Box sx={{ overflow: "auto", height: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "10%",
          zIndex: "-100",
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={vector1} alt="" />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: "0px",
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={vector2} alt="" />
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: "0px",
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={vector3} alt="" />
      </Box>
      <Box
        sx={{
          boxShadow: "0px 10px 20px rgba(0,0,0, .2)",
          borderRadius: "12px",
          margin: "4rem auto",
          width: { md: "70%", xs: "95%" },
          overflow: "hidden",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={0} sm={6} md={6}>
            <Box
              sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${loginImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "100%",
                overflow: "none",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "3rem 0rem 0rem",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { md: "3rem", xs: "2rem" },
                      fontWeight: "900",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Welcome
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { md: ".7rem", xs: ".5rem" },
                      textAlign: "center",
                    }}
                  >
                    Login with email
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <Box>
                    <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      helperText={errors?.email}
                      value={values?.email}
                      error={Boolean(errors?.email)}
                      onChange={handleOnChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "7px 14px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="password"
                      helperText={errors?.password}
                      value={values?.password}
                      error={Boolean(errors?.password)}
                      type={showPassword ? "text" : "password"}
                      onChange={handleOnChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "7px 14px",
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Iconify
                                  icon={
                                    showPassword
                                      ? "eva:eye-fill"
                                      : "eva:eye-off-fill"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        cursor: "pointer",
                        textAlign: "right",
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      minWidth: "232px",
                      borderRadius: "14px",
                      marginTop: "1rem",
                      padding: ".6rem 0rem",
                    }}
                    onClick={handleSubmit}
                  >
                    {isLoading ? "loading..." : "Sign Up"}
                  </Button>
                </Box>
              </Box>
              <Box sx={{ padding: { md: "0rem 10rem", xs: "0rem 1rem" } }}>
                <Divider>or</Divider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: { md: ".4rem 1rem ", xs: "0rem 1rem " },
                    ":hover": { border: "1px solid #000", cursor: "pointer" },
                  }}
                >
                  <IconButton>
                    <Iconify width={18} icon="flat-color-icons:google" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: { md: ".4rem 1rem ", xs: "0rem 1rem " },
                    ":hover": { border: "1px solid #000", cursor: "pointer" },
                  }}
                >
                  <IconButton>
                    <Iconify width={18} icon="logos:facebook" />
                  </IconButton>
                </Box>
              </Box>
              <Box mt={2} mb={4}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: ".5rem", md: ".7rem" },
                  }}
                >
                  Don’t have account?{" "}
                  <span>
                    <a
                      style={{ textDecoration: "none", color: "blue" }}
                      href="/register"
                    >
                      Sign Up
                    </a>
                  </span>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
