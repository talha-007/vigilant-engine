import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import signUpImg from "../assets/signUp.jpg";
import Iconify from "../components/iconify";
import vector1 from "../assets/Vector1.png";
import vector2 from "../assets/vector2.png";
import vector3 from "../assets/Vector3.png";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import authServices from "../redux/api/authService";

const initialValues = {
  email: "",
  password: "",
  re_password: "",
  picture: "",
  phone: "",
  gender: "",
};
const RegisterPage = () => {
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onMouse, setOnMouse] = useState(false);
  const [menuItemImg, setMenuItemImg] = useState("");
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is of type 'file', store the file(s)
    const newValue = files ? files[0] : value;

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

    // Confirm Password validation (match with password)
    if ("re_password" in fieldValue) {
      temp.re_password = fieldValue.re_password
        ? fieldValue.re_password === values.password
          ? ""
          : "Passwords do not match"
        : "Please confirm your password";
    }

    // Gender validation (required)
    if ("gender" in fieldValue) {
      temp.gender = fieldValue.gender ? "" : "Gender is required";
    }

    // Phone validation (numeric and required)
    if ("phone" in fieldValue) {
      temp.phone = fieldValue.phone
        ? /^[0-9]{10}$/.test(fieldValue.phone)
          ? ""
          : "Please enter a valid 10-digit phone number"
        : "Phone number is required";
    }

    setErrors({
      ...temp,
    });

    // Return true if all errors are empty
    return Object.values(temp).every((x) => x === "");
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const fileSize = file.size / (1024 * 1024);
    if (fileSize > 3) {
      return;
    }

    setMenuItemImg(file);
  };
  const handleSubmit = async () => {
    try {
      const datas = {
        email: values.email,
        password: values.password,
        re_password: values.re_password,
        profile: {
          gender: values.gender,
          phone: values.phone,
          picture: menuItemImg,
        },
      };
      console.log("datas", datas);
      if (validations()) {
        setIsLoading(true);
        const res = await authServices.signUp(datas);
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
        <Grid container>
          <Grid size={{ xs: 0, md: 6 }}>
            <Box
              sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${signUpImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "100%",
                overflow: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: { md: "0rem 10rem", xs: "0rem 1rem" },
                  display: { xs: "none", md: "block" },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { md: "3rem", xs: "2rem" },
                      fontWeight: "900",
                      fontFamily: "Montserrat",
                      color: "#fff",
                    }}
                  >
                    Sign Up
                  </Typography>
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
                <Box mt={2}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: { xs: ".5rem", md: ".7rem" },
                    }}
                  >
                    have account?{" "}
                    <span>
                      <a
                        style={{ textDecoration: "none", color: "blue" }}
                        href="/login"
                      >
                        Login Now
                      </a>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3rem 0rem",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={2} sx={{ padding: "0rem 2rem" }}>
                <Grid
                  size={12}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  <Box
                    sx={{
                      width: "150px",
                      height: "150px",
                      background: "#eeeeee",
                      // boxShadow: '0 6px 24px #f1f1f1',
                      borderRadius: "10rem",
                      overflow: "hidden",
                      border: "1px dashed #999",
                      margin: "15px auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                    onMouseOver={() => setOnMouse(true)}
                    onMouseOut={() => setOnMouse(false)}
                  >
                    {menuItemImg ? (
                      <img
                        src={
                          menuItemImg instanceof Blob
                            ? URL.createObjectURL(menuItemImg)
                            : `${IMAGE_BASEURL}${menuItemImg}`
                        }
                        alt="menuItemImg"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: "absolute",
                          background: "#8888885c",
                          width: "150px",
                          height: "150px",
                          top: "0px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor="menuItemImg">
                          {" "}
                          <Iconify
                            width={40}
                            icon="material-symbols-light:upload-rounded"
                          />
                        </label>

                        <input
                          type="file"
                          id="menuItemImg"
                          name="menuItemImg"
                          value=""
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </Box>
                    )}
                    {/* {!menuItemImg && (
                        <label htmlFor="menuItemImg">Click to upload</label>
                      )} */}
                    {onMouse && (
                      <Box
                        sx={{
                          position: "absolute",
                          background: "#8888885c",
                          width: "150px",
                          height: "150px",
                          top: "0px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor="menuItemImg">
                          {" "}
                          <Iconify
                            width={40}
                            icon="material-symbols-light:upload-rounded"
                          />
                        </label>

                        <input
                          type="file"
                          id="menuItemImg"
                          name="menuItemImg"
                          value=""
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </Box>
                    )}
                  </Box>{" "}
                  <input
                    type="file"
                    id="menuItemImg"
                    name="menuItemImg"
                    value=""
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
                      Confirm Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="re_password"
                      helperText={errors?.re_password}
                      value={values?.re_password}
                      error={Boolean(errors?.re_password)}
                      type={showConfirmPassword ? "text" : "password"}
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
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                              >
                                <Iconify
                                  icon={
                                    showConfirmPassword
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
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
                      Gender
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      name="gender"
                      helperText={errors?.gender}
                      value={values?.gender}
                      error={Boolean(errors?.gender)}
                      onChange={handleOnChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "7px 14px",
                        },
                      }}
                    >
                      <MenuItem value="1">Male</MenuItem>
                      <MenuItem value="0">Female</MenuItem>
                    </TextField>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="phone"
                      helperText={errors?.phone}
                      value={values?.phone}
                      error={Boolean(errors?.phone)}
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
                </Grid>
              </Grid>
              <Box>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  fullWidth
                  sx={{
                    minWidth: "232px",
                    borderRadius: "14px",
                    marginTop: "1rem",
                    padding: ".6rem 0rem",
                  }}
                >
                  {isLoading ? "loading..." : "Sign Up"}
                </Button>
              </Box>
              <Box
                sx={{
                  padding: { md: "0rem 10rem", xs: "0rem 1rem" },
                  display: { xs: "block", md: "none" },
                }}
              >
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
                <Box mt={2}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: { xs: ".5rem", md: ".7rem" },
                    }}
                  >
                    have account?{" "}
                    <span>
                      <a
                        style={{ textDecoration: "none", color: "blue" }}
                        href="/login"
                      >
                        Login Now
                      </a>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
