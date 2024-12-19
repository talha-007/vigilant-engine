import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import RichTextEditor from "../../shared/RichTextEditor";
import postServices from "../../../redux/api/postService";
import { useDispatch, useSelector } from "react-redux";
import { get_AllCountries } from "../../../redux/slice/filterSlice";

interface AddPostProps {
  open: boolean;
  onClose: () => void;
}

const AddPost: React.FC<AddPostProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    country: Number,
    city: Number,
    postalCode: "",
    place: "",
    departureDate: "",
    returnDate: "",

    details: "",
    gender: "",
  });
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState("");

  const countries = useSelector((state) => {
    state;
  });
  console.log("getAllCountries", countries);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validations({
      [name]: value,
    });
  };
  console.log(details);

  const validations = (fieldValue = formData) => {
    const temp = { ...errors };

    if ("title" in fieldValue) {
      temp.title = fieldValue.title ? "" : "Title is required";
    }
    if ("country" in fieldValue) {
      temp.country = Number(fieldValue.country) ? "" : "Country is required";
    }
    if ("city" in fieldValue) {
      temp.city = Number(fieldValue.city) ? "" : "City is required";
    }
    if ("departureDate" in fieldValue) {
      temp.departureDate = fieldValue.departureDate
        ? ""
        : "Departure date is required";
    }
    if ("returnDate" in fieldValue) {
      temp.returnDate = fieldValue.returnDate ? "" : "Return date is required";
    }
    if ("details" in fieldValue) {
      temp.details = fieldValue.details ? "" : "Details is required";
    }

    setErrors({
      ...temp,
    });

    // Return true if all errors are empty
    return Object.values(temp).every((x) => x === "");
  };
  const handleAddPost = () => {
    const datas = {
      travel_to_country: formData.country,
      travel_to_city: formData.city,
      date_from: formData.departureDate,
      date_to: formData.returnDate,
      title: formData.title,
      text: formData.details,
    };
    try {
      const res = postServices.createPost(datas);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    onClose(); // Close dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: "#f5f5f5", color: "#333" }}>
        Add New Post
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          name="title"
          value={formData.title}
          helperText={errors?.title}
          error={Boolean(errors?.title)}
          onChange={handleChange}
          sx={{ mt: 1, mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }} // margin-bottom
        />
        <TextField
          label="Country"
          type="text"
          fullWidth
          select
          variant="outlined"
          name="country"
          helperText={errors?.country}
          error={Boolean(errors?.country)}
          value={formData.country}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        >
          {countries &&
            countries?.map((item: any) => {
              <MenuItem key={item.id} value={item?.id}>
                {item?.name}
              </MenuItem>;
            })}
        </TextField>
        <TextField
          label="City"
          type="text"
          fullWidth
          variant="outlined"
          name="city"
          value={formData.city}
          helperText={errors?.city}
          error={Boolean(errors?.city)}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Postal Code"
          type="text"
          fullWidth
          variant="outlined"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Place"
          type="text"
          fullWidth
          variant="outlined"
          name="place"
          value={formData.place}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Departure Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          name="departureDate"
          value={formData.departureDate}
          helperText={errors?.departureDate}
          error={Boolean(errors?.departureDate)}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="Return Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          name="returnDate"
          value={formData.returnDate}
          helperText={errors?.returnDate}
          error={Boolean(errors?.returnDate)}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <Box sx={{ mb: 2 }}>
          <RichTextEditor title="details" setBody={setDetails} body={details} />
        </Box>

        <TextField
          label="Gender"
          type="text"
          fullWidth
          variant="outlined"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAddPost} color="primary">
          Add Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
