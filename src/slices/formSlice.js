import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "fromslice",
  initialState: {
    formType: [{ text: "text" }],
    formElements: [],
    formTitle: "",
  },
  reducers: {
    selectFormType: (state, action) => {
      state.formType = [action.payload];
    },
    addFormInput: (state, action) => {
      state.formElements = [...state.formElements, action.payload];
    },
    addFormtitle: (state, action) => {
      state.formTitle = action.payload;
    },
  },
});

export const { selectFormType, addFormInput, addFormtitle } = formSlice.actions;
export default formSlice.reducer;
