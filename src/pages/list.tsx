import { Box, Typography } from "@mui/material";
import homebg from "../assets/listBg.jpg";
import UserPosts from "../components/list";

const List: React.FC = () => {
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
          color: "white", // Ensures text is readable
        }}
      >
        <Typography
          variant="h1" // Use the predefined typography variant
          align="center" // Built-in alignment prop
          sx={{
            color: "white", // Explicitly set the text color
          }}
        >
          The Journey is On
        </Typography>
      </Box>
      <UserPosts />
    </>
  );
};

export default List;
