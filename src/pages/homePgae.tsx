import { Box, Typography } from "@mui/material";
import homebg from "../assets/homebg.jpg";
import React, { useEffect } from "react";
import SearchComponent from "../components/search";
import { get_AllCountries } from "../redux/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const getCountries = useSelector((state) => state.filter);
  console.log("getAllCountries", getCountries);
  useEffect(() => {
    dispatch(get_AllCountries());
  }, []);
  const places = getCountries?.data || [];
  return (
    <>
      <Box
        sx={{
          minHeight: { md: "80vh", xs: "60vh" },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${homebg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h1" // Use the predefined variant
          align="center" // Align text center using the Typography prop
          sx={{
            color: "white", // Explicitly set color to white
          }}
        >
          Find Your Healing Place <br /> With Traviz
        </Typography>
      </Box>
      <SearchComponent places={places} />
    </>
  );
};

export default HomePage;
