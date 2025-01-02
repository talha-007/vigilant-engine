import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { get_AllCountries, getCitiesByCId } from "../redux/slice/filterSlice";
import postServices from "../redux/api/postService";
import { get_AllPosts } from "../redux/slice/postsSlice";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import { addPostStyles } from "./styles";

const initialValues = {
  title: "",
  country: "",
  city: "",
  postalCode: "",
  place: "",
  departureDate: "",
  returnDate: "",
  details: "",
  gender: "",
  images: [],
};
const AddPost = () => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCountries = useSelector((state) => state.filter);
  console.log("images", previewImages);

  useEffect(() => {
    dispatch(get_AllCountries());
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validations({ [name]: value });
  };
  const cities = useSelector((s) => s.filter) || [];
  console.log("cities", cities);
  useEffect(() => {
    if (formData.country) {
      dispatch(getCitiesByCId(formData.country));
    }
  }, [formData.country]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prev) => [...prev, ...fileArray]);
      setFormData((prevData) => ({
        ...prevData,
        images: [...(prevData.images || []), ...files], // Ensure images is an array
      }));
    }
  };
  const handleImageRemove = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index)); // Remove from preview
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Remove from images
    }));
  };
  const validations = (fieldValue = formData) => {
    const temp: { [key: string]: string } = { ...errors };
    if ("title" in fieldValue)
      temp.title = fieldValue.title ? "" : "Title is required";
    if ("country" in fieldValue)
      temp.country = fieldValue.country ? "" : "Country is required";
    if ("city" in fieldValue)
      temp.city = fieldValue.city ? "" : "City is required";
    if ("departureDate" in fieldValue)
      temp.departureDate = fieldValue.departureDate
        ? ""
        : "Departure date is required";
    if ("returnDate" in fieldValue)
      temp.returnDate = fieldValue.returnDate ? "" : "Return date is required";
    if ("details" in fieldValue)
      temp.details = fieldValue.details ? "" : "Details are required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddPost = async () => {
    const datas = {
      ...formData,
      travel_to_country: formData.country,
      travel_to_city: formData.city,
      date_from: formData.departureDate,
      date_to: formData.returnDate,
      title: formData.title,
      text: formData.details,
    };
    try {
      const res = await postServices.createPost(datas);
      console.log(res);
      if (res.status === 201) {
        toast.success("post created successfully");
        setFormData(initialValues);

        dispatch(get_AllPosts());
      }
    } catch (error) {
      console.error(error);
      setFormData(initialValues);
      setPreviewImages("");
    }
  };
  const dummyImage = "https://via.placeholder.com/150?text=No+Image+Uploaded";

  return (
    <Container sx={{ padding: "3rem 0rem" }}>
      <Box>
        <Box sx={addPostStyles.header}>
          <Typography variant="h3">Add New Post</Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>
            {" "}
            Back
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              autoFocus
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
              value={formData.title}
              helperText={errors.title}
              error={Boolean(errors.title)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Country"
              fullWidth
              select
              variant="outlined"
              name="country"
              value={formData.country}
              helperText={errors.country}
              error={Boolean(errors.country)}
              onChange={handleChange}
            >
              {getCountries?.data?.map((item: any) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            <TextField
              label="City"
              type="text"
              fullWidth
              select
              variant="outlined"
              name="city"
              disabled={cities?.cities ? false : true}
              value={formData.city}
              helperText={errors.city}
              error={Boolean(errors.city)}
              onChange={handleChange}
            >
              {cities &&
                cities?.cities?.map((item: any) => (
                  <MenuItem key={item.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            <TextField
              label="Postal Code"
              type="text"
              fullWidth
              variant="outlined"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Place"
              type="text"
              fullWidth
              variant="outlined"
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Departure Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              name="departureDate"
              value={formData.departureDate}
              helperText={errors.departureDate}
              error={Boolean(errors.departureDate)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            {" "}
            <TextField
              label="Return Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              name="returnDate"
              value={formData.returnDate}
              helperText={errors.returnDate}
              error={Boolean(errors.returnDate)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            {" "}
            <TextField
              label="Details"
              type="text"
              fullWidth
              variant="outlined"
              name="details"
              value={formData.details}
              helperText={errors.details}
              error={Boolean(errors.details)}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            {" "}
            <TextField
              label="Gender"
              type="text"
              fullWidth
              variant="outlined"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Images
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={addPostStyles.imageWrapper}>
              {previewImages.length > 0 ? (
                previewImages.map((img, index) => (
                  <Box key={index} sx={addPostStyles.imageWrapper2}>
                    <img
                      src={img}
                      alt={`preview-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={() => handleImageRemove(index)}
                      sx={addPostStyles.IconButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <img
                  key="dummy"
                  src={dummyImage}
                  alt="dummy"
                  style={{
                    width: 150,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Button variant="contained" size="large" onClick={handleAddPost}>
              Add Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddPost;
