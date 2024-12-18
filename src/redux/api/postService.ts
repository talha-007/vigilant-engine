import { callAPi, callAPiMultiPart } from "./http-common";

interface CreatePost {
  travel_to_country: number | null; // Allows for null in case the value is optional
  travel_to_city: number | null; // Allows for null in case the value is optional
  date_from: string; // Use string if storing dates as ISO strings
  date_to: string;
  title: string;
  text: string;
}

const getAllPosts = () => callAPi.get("/reisapp/posts/");
const getPost = (id) => callAPi.get(`/reisapp/posts/${id}`);
const createPost = (data: CreatePost) =>
  callAPiMultiPart.post(`/reisapp/posts/`, data);

const postServices = {
  getAllPosts,
  getPost,
  createPost,
};
export default postServices;
