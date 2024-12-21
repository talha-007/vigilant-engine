import filterSlice from "./filterSlice";
import postSlice from "./postsSlice";
import profileSlice from "./profileSlice";

export const rootReducer = {
  posts: postSlice,
  filter: filterSlice,
  profile: profileSlice,
};
