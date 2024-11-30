import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import postsData from "../components/list/data";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Convert id to a number and find the post
  const post = postsData.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <Box
        sx={{
          textAlign: "center",
          marginTop: 6,
          padding: 3,
          backgroundColor: "#FFF3E0",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: 500,
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          color="error"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Oops! Post not found.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>
          The post you are looking for does not exist or has been removed.
          Please check the ID or go back to the homepage.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Go Back to Homepage
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        marginTop: 4,
        padding: 2,
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)} // Go back one step
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            backgroundColor: "#EDEDED",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "#1976D2",
              color: "#fff",
              fontSize: "2rem",
            }}
          >
            {post.place.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 2 }}
          >
            {post.place}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Country:</strong> {post.country}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>City:</strong> {post.city}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Postal Code:</strong> {post.postalCode}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Place:</strong> {post.place}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Departure Date:</strong> {post.departure}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Return Date:</strong> {post.return}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Posted By:</strong> {post.name} {/* Added Username */}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.sncondary">
                <strong>Date Posted:</strong>{" "}
                {new Date(post.timestamp).toLocaleDateString()}{" "}
                {/* Added Date Posted */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <strong>Details:</strong> {post.details}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Gender:</strong> {post.gender}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Details;
