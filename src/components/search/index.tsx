import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SearchComponentProps {
  places: string[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ places }) => {
  const [to, setTo] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (to) {
      navigate(`/list`);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 10px 10px rgba(0,0,0, 0.1)",
        background: "#fff",
        borderRadius: "12px",
        width: { md: "70%", sm: "80%", xs: "90%" },
        margin: "auto",
        transform: "translate(0,-50%)",
        padding: "2rem",
        marginTop: { xs: "2rem", md: "0rem" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
            Find Your Place
          </Typography>
          <Autocomplete
            options={places}
            value={to}
            onChange={(newValue) => setTo(newValue || "")}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
              Departure
            </Typography>
            <TextField fullWidth type="date" placeholder="Departure" />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography sx={{ paddingLeft: "10px", fontSize: "14px" }}>
              Return
            </Typography>
            <TextField fullWidth type="date" placeholder="Return" />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              minWidth: "150px",
              padding: "1rem 0rem",
              fontSize: "1rem",
            }}
            onClick={handleSearch}
          >
            Find Place
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchComponent;
