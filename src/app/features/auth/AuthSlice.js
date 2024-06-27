import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  username: "",
  email: "",
  phone_number: "",
  is_organization: "",
  is_driver: "",
  profile_image: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      // console.log("action", action.payload);
      state.user_id = action.payload.userData.id; // user_id
      state.username = action.payload.userData.username;
      state.email = action.payload.userData.email;
      state.phone_number = action.payload.userData.phone_number;
      state.is_organization = action.payload.userData.is_organization;
      state.is_driver = action.payload.userData.is_driver;
      state.profile_image = action.payload.userData.profile_image;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.username = "";
      state.token = "";
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
