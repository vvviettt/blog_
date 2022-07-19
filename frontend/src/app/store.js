import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "~/features/registerSlice";
import authReducer from "~/features/authSlice";
import postReducer from "~/features/postSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    post: postReducer,
  },
});
