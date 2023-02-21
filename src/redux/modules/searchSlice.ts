import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hashtagNumber: null,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    changeHashTagNum: (state: any, action) => {
      state.hashtagNumber = action.payload;
    },
  },
});

export const { changeHashTagNum } = searchSlice.actions;
export default searchSlice.reducer;
