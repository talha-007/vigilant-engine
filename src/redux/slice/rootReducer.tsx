import filterSlice from "./filterSlice";
import postSlice from "./postsSlice";

export const rootReducer = {
  posts: postSlice,
  filter: filterSlice,
};
