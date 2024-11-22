import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import homebg from "../assets/homebg.jpg";
import Iconify from "../components/iconify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs, { Dayjs } from "dayjs";

const HomePage = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  return (
    <>
      <Box
        sx={{
          minHeight: "80vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${homebg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white", // Ensures text is readable
        }}
      >
        <Typography
          sx={{
            fontWeight: "800",
            textAlign: "center",
            fontSize: { xs: "3rem", md: "6rem" },
          }}
        >
          Find Your Healing Place <br /> With Traviz
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: "0px 10px 10px rgba(0,0,0, 0.1)",
          background: "#fff",
          borderRadius: "12px",
          width: "70%",
          margin: "auto",
          transform: "translate(0,-50%)",
          padding: "2rem",
        }}
      >
        <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
          Your Destination
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            placeholder="Find Your Place"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="hugeicons:location-05" />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
          />

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ "&.MuiStack-root": { paddingTop: "0px" } }}
              >
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              minWidth: "150px",
              padding: "1rem 0rem",
              fontSize: "1rem",
            }}
          >
            Find Place
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
