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
import vector3 from "../assets/vector3.png";

const LoginPage = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
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
          margin: "auto",
          width: { md: "70%", xs: "95%" },
          overflow: "hidden",
          height: { md: "80vh", xs: "95vh" },
          minHeight: { md: "80vh", xs: "95vh" },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
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
                  padding: "1rem 0rem",
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
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon="mage:email" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
                      Password
                    </Typography>
                    <TextField
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
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon="solar:password-minimalistic-input-broken" />
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
                  >
                    Login
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
              <Box mt={2}>
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
