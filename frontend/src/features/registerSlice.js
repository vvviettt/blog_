import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "~/api/userApi";

export const register = createAsyncThunk(
  "user/register",
  async (params, thunkAPI) => {
    const fetchRegister = await userApi.register(params);
    return fetchRegister;
  }
);

const initialState = {
  success: false,
  loading: false,
  error: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      if (!action.payload.error) {
        state.success = true;
      }
    },
  },
});

// Action creators are generated for each case reducer function
// export const {} = registerSlice.actions;

export default registerSlice.reducer;
