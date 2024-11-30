import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import RichTextEditor from "../../shared/RichTextEditor";

interface AddPostProps {
  open: boolean;
  onClose: () => void;
}

const AddPost: React.FC<AddPostProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    city: "",
    postalCode: "",
    place: "",
    departureDate: "",
    returnDate: "",

    details: "",
    gender: "",
  });
  const [details, setDetails] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log(details);

  const handleAddPost = () => {
    // Handle form submission (e.g., send to API)
    console.log({ ...formData, details: details.details });
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
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }} // margin-bottom
        />
        <TextField
          label="Country"
          type="text"
          fullWidth
          variant="outlined"
          name="country"
          value={formData.country}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: "8px" }}
        />
        <TextField
          label="City"
          type="text"
          fullWidth
          variant="outlined"
          name="city"
          value={formData.city}
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
