import React, { useState } from "react";
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
import postsData from "./data";
import { FilterState } from "../../types";
import Filters from "../filters";
import AddPost from "../dialogs/addPost";
import EditPost from "../dialogs/editPost";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [page, setPage] = useState(1);
  const [openAddPostDialogue, setOpenAddPostDialogue] = useState(false);
  const [openEditPostDialogue, setOpenEditPostDialogue] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // To hold the post being edited
  const [filtersOpen, setFiltersOpen] = useState(false); // For toggling filters
  const postsPerPage = 6;
  const [filters, setFilters] = React.useState<FilterState>({
    country: "",
    city: "",
    postalCode: "",
    gender: "",
  });

  const filteredPosts = postsData.filter((post) => {
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

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleOpenAddPostDialogue = () => {
    setOpenAddPostDialogue(true);
  };

  const handleCloseAddPostDialogue = () => {
    setOpenAddPostDialogue(false);
  };

  const handleOpenEditPostDialogue = (post: any) => {
    setEditingPost(post); // Set the current post to be edited
    setOpenEditPostDialogue(true);
  };

  const handleCloseEditPostDialogue = () => {
    setEditingPost(null); // Clear the editing post
    setOpenEditPostDialogue(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1550px",
          margin: "auto",
          marginTop: "3rem",
          position: "relative",
        }}
      >
        {!isMobile && <Filters onFilterChange={handleFilterChange} />}
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
                <Filters onFilterChange={handleFilterChange} />
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
            <Button variant="contained" onClick={handleOpenAddPostDialogue}>
              Add Post
            </Button>
          </Box>
          <Grid container spacing={3} sx={{ padding: 3 }}>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#f9f9f9",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 3,
                        backgroundColor: "#EDEDED",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          backgroundColor: "#1976D2",
                          color: "#fff",
                          fontSize: "1.25rem",
                        }}
                      >
                        {post.place?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Box>
                    <CardContent
                      sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post?.title || "Dummy Title"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Traveling to:</strong> {post.place}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Dates:</strong> {post.departure}{" "}
                        <strong>-</strong> {post.return}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Details:</strong>{" "}
                        {post.details || "No details provided."}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Gender:</strong> {post.gender}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        padding: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "8px",
                          backgroundColor: "#1976D2",
                          "&:hover": {
                            backgroundColor: "#125CA1",
                          },
                        }}
                        onClick={() => navigate(`/details/${post.id}`)}
                      >
                        See Details
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "8px",
                          color: "#1976D2",
                          borderColor: "#1976D2",
                          "&:hover": {
                            backgroundColor: "#E3F2FD",
                          },
                        }}
                        onClick={() => handleOpenEditPostDialogue(post)}
                      >
                        Edit
                      </Button>
                    </Box>
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

      <AddPost
        open={openAddPostDialogue}
        onClose={handleCloseAddPostDialogue}
      />

      <EditPost
        open={openEditPostDialogue}
        onClose={handleCloseEditPostDialogue}
        initialValues={editingPost} // Pass the post data to be edited
      />
    </>
  );
};

export default UserPosts;
