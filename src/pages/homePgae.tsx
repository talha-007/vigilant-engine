import { Box, Typography } from "@mui/material";
import homebg from "../assets/homebg.jpg";
import React from "react";
import postsData from "../components/list/data";
import SearchComponent from "../components/search";

const HomePage: React.FC = () => {
  const places = Array.from(new Set(postsData.map((post) => post.place))); // This ensures no duplicate places are in the list

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
