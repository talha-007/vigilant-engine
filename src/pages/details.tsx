import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_post } from "../redux/slice/postsSlice";
import { detailStyles } from "./styles";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postData = useSelector((s) => s?.posts);

  useEffect(() => {
    dispatch(get_post(id));
  }, [id, dispatch]);

  const images = postData?.post?.images || [];
  console.log(images);

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "auto",
        marginTop: 4,
        padding: 3,
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ marginBottom: 2, fontWeight: "bold" }}
      >
        Back
      </Button>
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Carousel for Images */}
        <Carousel
          autoPlay
          animation="slide"
          indicators
          navButtonsAlwaysVisible
          sx={{
            margin: "auto",
            maxWidth: "100%",
            maxHeight: 400,
          }}
        >
          {images?.map((item, index) => (
            <Box
              key={index}
              component="img"
              src={item.image}
              alt={`Post image ${index + 1}`}
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
              }}
            />
          ))}
        </Carousel>

        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 3,
              color: "#333",
            }}
          >
            {postData?.post?.place}
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Country:</strong> {postData?.post?.travel_to_country}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>City:</strong> {postData?.post?.travel_to_city}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Postal Code:</strong>{" "}
                {postData?.post?.travel_to_postal_code}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Place:</strong> {postData?.post?.travel_to_city}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Departure Date:</strong> {postData?.post?.date_from}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Return Date:</strong> {postData?.post?.date_to}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Posted By:</strong>{" "}
                {postData?.post?.posted_by?.user?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Date Posted:</strong>{" "}
                {new Date(postData?.post?.timestamp).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Details:</strong> {postData?.post?.details}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Gender:</strong> {postData?.post?.gender}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Details;
