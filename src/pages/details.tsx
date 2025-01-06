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
  IconButton,
  Stack,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_post } from "../redux/slice/postsSlice";
import Navbar from "../components/navbar";
import { get_AllCountries, getCitiesByCId } from "../redux/slice/filterSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image1 from "../assets/1.jpg";
import image2 from "../assets/listBg.jpg";
import image3 from "../assets/signUp.jpg";

import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from "swiper/modules";
const dummyImages = [image1, image2, image3];
const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postData = useSelector((s) => s?.posts);
  const countries = useSelector((state) => state?.filter);
  const cities = useSelector((state) => state?.filter?.cities) || [];
  const images = dummyImages;
  const countryId = postData?.post?.travel_to_country;
  const cityId = postData?.post?.travel_to_city;

  // Filtered country and city names based on IDs
  const countryName =
    countries?.data?.find((country) => country?.id === countryId)?.name ||
    "N/A";
  const cityName = cities?.find((city) => city?.id === cityId)?.name || "N/A";
  console.log(countryName, cityName);

  useEffect(() => {
    dispatch(get_post(id));
    dispatch(get_AllCountries());
  }, [id, dispatch]);
  useEffect(() => {
    if (countryId) {
      dispatch(getCitiesByCId(countryId));
    }
  }, [countryId]);

  return (
    <>
      <Box
        sx={{
          background: "#000",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "3",
          height: "100px",
        }}
      >
        <Navbar position="fixed" />
      </Box>
      <Box
        sx={{
          maxWidth: 1200,
          margin: "auto",
          marginTop: "8rem",
          padding: 3,
          borderRadius: "16px",
        }}
      >
        <Grid container spacing={4}>
          {/* Details Section */}
          <Grid item xs={12}>
            <Card
              sx={{
                padding: 3,
                borderRadius: "16px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar
                      alt="talha"
                      sx={{
                        width: 50,
                        height: 50,
                      }}
                    />
                    <Stack>
                      <Typography variant="h5">David</Typography>
                      <Typography variant="body2" sx={{ fontSize: "14px" }}>
                        10/12/24
                      </Typography>
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: "14px" }}>
                          Travelling to {cityName},{countryName}{" "}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ fontWeight: "bold" }}
                  >
                    Back
                  </Button>
                </Box>
                <Grid container spacing={2} mt={2}>
                  {/* <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Gender:</strong>{" "}
                      {postData?.post?.posted_by?.gender === 1
                        ? "Male"
                        : "Female"}
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body1">
                        <span style={{ fontWeight: "600" }}>From</span>{" "}
                        {postData?.post?.date_from} -{" "}
                        <span style={{ fontWeight: "600" }}>To</span>{" "}
                        {postData?.post?.date_to}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {postData?.post?.text}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Swiper
                      navigation
                      pagination={{ clickable: true }}
                      loop
                      autoplay={{
                        delay: 3000, // Delay in milliseconds
                        disableOnInteraction: false, // Prevent autoplay from stopping on interaction
                      }}
                      effect={"creative"}
                      creativeEffect={{
                        prev: {
                          shadow: true,
                          translate: [0, 0, -400],
                        },
                        next: {
                          translate: ["100%", 0, 0],
                        },
                      }}
                      modules={[
                        Autoplay,
                        Navigation,
                        Pagination,
                        EffectCreative,
                      ]}
                      style={{ borderRadius: "16px", overflow: "hidden" }}
                    >
                      {images.map((item, index) => (
                        <SwiperSlide key={index}>
                          <Box
                            component="img"
                            src={item}
                            alt={`Post image ${index + 1}`}
                            sx={{
                              width: "100%",
                              height: "500px",
                              objectFit: "cover",
                              borderRadius: "16px",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Details;
