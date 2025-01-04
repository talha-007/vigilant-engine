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
import AddPost from "../dialogs/addPost";
import EditPost from "../dialogs/editPost";
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
  const [openAddPostDialogue, setOpenAddPostDialogue] = useState(false);
  const [openEditPostDialogue, setOpenEditPostDialogue] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // To hold the post being edited
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [refetch, setRefetch] = useState(false); // For toggling filters
  const postsPerPage = 6;
  const [filters, setFilters] = React.useState<FilterState>({
    country: "",
    city: "",
    postalCode: "",
    gender: "",
  });
  const getCountries = useSelector((state) => state.filter);
  const Posts = useSelector((state) => state.posts);
  console.log("getAllCountries", Posts);
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
          <Grid container spacing={3} sx={{ padding: 3 }}>
            {currentPosts?.length > 0 ? (
              currentPosts?.map((post: any) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card sx={listStyles.postWrapper}>
                    <Box sx={listStyles.imageWrapper}>
                      <Avatar
                        sx={listStyles.avatar}
                        src={post?.posted_by?.picture}
                      >
                        {post.place?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Box>
                    <CardContent sx={listStyles.cardContent}>
                      <Typography variant="h6" sx={listStyles.postTitle}>
                        {post?.title || "Dummy Title"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Traveling to:</strong> {post.place}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Dates:</strong> {post?.date_from}{" "}
                        <strong>-</strong> {post?.date_to}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        <strong>Details:</strong>{" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.text,
                          }}
                        />
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
                        sx={listStyles.detailsBtn}
                        onClick={() => navigate(`/details/${post.id}`)}
                      >
                        See Details
                      </Button>
                      <Button
                        variant="outlined"
                        sx={listStyles.editBtn}
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
        getCountries={getCountries}
        setRefetch={setRefetch}
        refetch={refetch}
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
