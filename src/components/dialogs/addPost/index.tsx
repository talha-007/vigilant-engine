import React, { useEffect, useRef, useState } from "react";
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
import { getCitiesByCId } from "../../../redux/slice/filterSlice";
import { toast } from "react-toastify";
import { get_AllPosts } from "../../../redux/slice/postsSlice";

interface AddPostProps {
  open: boolean;
  onClose: () => void;
  getCountries: any;
  refetch: boolean;
  setRefetch: any;
}
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
};
const AddPost: React.FC<AddPostProps> = ({
  open,
  onClose,
  getCountries,
  refetch,
  setRefetch,
}) => {
  const [formData, setFormData] = useState(initialValues);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [details, setDetails] = useState("");
  const dispatch = useDispatch();
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
      travel_to_country: formData.country,
      travel_to_city: formData.city,
      date_from: formData.departureDate,
      date_to: formData.returnDate,
      title: formData.title,
      text: details.details,
    };
    try {
      const res = await postServices.createPost(datas);
      console.log(res);
      if (res.status === 201) {
        toast.success("post created successfully");
        setFormData(initialValues);
        setDetails("");
        dispatch(get_AllPosts());
      }
    } catch (error) {
      console.error(error);
      setFormData(initialValues);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setFormData(initialValues);
        setDetails("");
      }}
    >
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
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
          sx={{ mt: 1, mb: 2 }}
        />
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
          sx={{ mb: 2 }}
        >
          {getCountries?.data?.map((item: any) => (
            <MenuItem key={item?.id} value={item?.id}>
              {item?.name}
            </MenuItem>
          ))}
        </TextField>
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
          sx={{ mb: 2 }}
        >
          {cities &&
            cities?.cities?.map((item: any) => (
              <MenuItem key={item.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          label="Postal Code"
          type="text"
          fullWidth
          variant="outlined"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Place"
          type="text"
          fullWidth
          variant="outlined"
          name="place"
          value={formData.place}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
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
          sx={{ mb: 2 }}
        />
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
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAddPost}>
          Add Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
