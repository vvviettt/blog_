import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "~/api/userApi";

export const login = createAsyncThunk(
  "user/login",
  async (params, thunkAPI) => {
    const fetchLogin = await userApi.login(params);
    return fetchLogin;
  }
);

export const refresh_login = createAsyncThunk(
  "user/refresh_login",
  async (params, thunkAPI) => {
    const fetchRefreshLogin = await userApi.refresh_login(params);
    return fetchRefreshLogin;
  }
);

const initialState = {
  isLoggedIn: false,
  id: 0,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  error: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = 0;
      state.name = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      if (!action.payload.error) {
        state.isLoggedIn = true;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        localStorage.setItem("token", action.payload.token);
      }
    },
    [refresh_login.rejected]: (state, action) => {
      state.error = action.error;
    },
    [refresh_login.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.isLoggedIn = true;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
