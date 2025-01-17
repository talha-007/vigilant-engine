import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Button,
  Pagination,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { FilterState } from "../../types";
import Filters from "../filters";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_AllCountries } from "../../redux/slice/filterSlice";
import { get_AllPosts } from "../../redux/slice/postsSlice";
import { listStyles } from "../../pages/styles";

const UserPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [refetch, setRefetch] = useState(false); // For toggling filters
  const postsPerPage = 6;
  const [filters, setFilters] = React.useState<FilterState>({
    country: "",
    city: "",
    postalCode: "",
    gender: "",
  });
  // const getCountries = useSelector((state) => state.filter);
  const Posts = useSelector((state) => state.posts);
  // console.log("getAllCountries", Posts);
  const profile = useSelector((s) => s?.profile);

  // console.log("profile", profile);
  useEffect(() => {
    dispatch(get_AllCountries());
    dispatch(get_AllPosts());
  }, [refetch]);
  const filteredPosts = Posts?.data?.filter((post) => {
    const { country, city, postalCode, gender } = filters;

    if (country && post.country !== country) return false;
    if (gender && post.gender !== gender) return false;
    if (city && post?.city !== city) return false;
    if (postalCode && post?.postalCode !== postalCode) return false;

    return true;
  });

  const startIndex = (page - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );
  // console.log("currentPosts,", currentPosts);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Box sx={listStyles.userPostsWrapper}>
        {!isMobile && (
          <Filters onFilterChange={handleFilterChange} data={Posts} />
        )}
        {isMobile && (
          <>
            <IconButton
              onClick={() => setFiltersOpen(true)}
              sx={{ marginLeft: "7.5rem", position: "absolute", top: "0" }}
            >
              <FilterAltIcon fontSize="small" />
            </IconButton>
            <Drawer
              anchor="left"
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
            >
              <Box sx={{ width: 300, padding: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Typography variant="h6">Filters</Typography>
                  <IconButton onClick={() => setFiltersOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Filters data={Posts} onFilterChange={handleFilterChange} />
              </Box>
            </Drawer>
          </>
        )}

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginLeft: "20px",
                fontWeight: "bold",
              }}
            >
              User Posts
            </Typography>
            <Button variant="contained" onClick={() => navigate("/add/post")}>
              Add Post
            </Button>
          </Box>

          <Grid container spacing={2} sx={{ padding: 2 }}>
            {currentPosts?.length > 0 ? (
              currentPosts?.map((data: any, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Card
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      "&:hover .overlay": {
                        transform: "translateY(0)", // Show overlay on hover
                      },
                      "&:hover .bgImage": {
                        transform: "scale(1.1)", // Zoom background on hover
                      },
                      "& .MuiCardContent-root:last-child": {
                        paddingBottom: "0px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: 0,
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Overlay Details */}
                      <Box
                        className="overlay"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",

                          display: "flex",
                          flexDirection: "column",
                          padding: 2,
                        }}
                      >
                        {/* Buttons */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          {profile?.profile?.profile?.id ===
                            data?.posted_by?.id && (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                              }}
                              onClick={() => navigate(`/edit/post/${data.id}`)}
                            >
                              Edit
                            </Button>
                          )}

                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                            }}
                            onClick={() => navigate(`/details/${data?.id}`)}
                          >
                            See Details
                          </Button>
                        </Box>
                        {/* User Details */}
                        <Box
                          sx={{
                            textAlign: "left",
                            marginTop: 2,
                            display: "flex",
                            gap: "10px",
                            justifyContent: "start",
                          }}
                        >
                          <Avatar
                            alt={data?.posted_by?.user?.name}
                            src={data?.posted_by?.picture}
                            sx={{
                              width: 40,
                              height: 40,
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="h6">
                              {data?.posted_by?.user?.name}
                            </Typography>
                            <Typography variant="body2">
                              {new Date(data?.posted_on).toLocaleDateString()}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                              {data.travel_to_city}
                              {", "}
                              {data.travel_to_country}
                            </Typography>
                            <Typography
                              variant="body2"
                              noWrap
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "260px",
                              }}
                            >
                              {data?.text}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{
                  margin: "auto",
                  marginTop: 4,
                  textAlign: "center",
                  color: "#666",
                }}
              >
                No posts found matching the filters.
              </Typography>
            )}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 3,
            }}
          >
            <Pagination
              count={Math.ceil(filteredPosts.length / postsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserPosts;
