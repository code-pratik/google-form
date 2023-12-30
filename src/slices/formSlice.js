import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "fromslice",
  initialState: {
    formType: [{ text: "text" }],
    formElements: [],
    formTitle: "",
    forms: [],
    formId: "",
    formsData: []
  },
  reducers: {
    selectFormType: (state, action) => {
      state.formType = [action.payload];
    },
    addFormId: (state, action) => {
      state.formId = action.payload
    },
    addFormInput: (state, action) => {
      if (action.payload.flag === 1) {
        state.formElements = [...action.payload.data];
      } else {
        state.formElements = [...state.formElements, action.payload];
      }
    },
    addFormtitle: (state, action) => {
      state.formTitle = action.payload;
    },
    addForm: (state, action) => {
      state.forms = [...state.forms, action.payload]
    },
    deleteInput: (state, action) => {
      const data = state.formElements
      data.splice(action.payload, 1)
      // state.formElements = data
    },
    deleteOptions: (state, action) => {
      const data = state.formElements[action.payload.index]
      data.values.splice(action.payload.indexno, 1)
      const obj = {
        ...state.formElements[action.payload.index],
        values: data.values
      }
      state.formElements.splice(action.payload.index, 1, obj)
      console.log(action.payload)
      // state.formElements.formElements(action.payload, 1, {})
    },
    editLabel: (state, action) => {
      console.log(action.payload)
      state.formElements.splice(action.payload.index, 1, { ...state.formElements[action.payload.index], label: action.payload.editlabel })
    },
    editOptionLabel: (state, action) => {
      const data = state.formElements[action.payload.index]
      data.values.splice(action.payload.indexno, 1, action.payload.editlabel)
      const obj = {
        ...state.formElements[action.payload.index],
        values: data.values
      }
      state.formElements.splice(action.payload.index, 1, obj)
    },
    setDragInputs: (state, actions) => {
      state.formElements = actions.payload
    },
    updateForm: (state, actions) => {
      const index = state.forms.findIndex((item) => item.id === actions.payload.id)
      state.forms.splice(index, 1, actions.payload)
    },
    deleteForm: (state, action) => {
      const data = state.forms.filter((item) => item.id !== action.payload)
      state.forms = data
      const formsData = state.formsData.filter((item) => item.id !== action.payload)
      state.formsData = formsData
    },
    storeFormsData: (state, action) => {
      const index = state.formsData.findIndex((item) => item.id === action.payload.id)
      console.log(index, "sliceindex")
      if (index === -1) {
        state.formsData = [...state.formsData, { id: action.payload.id, MultipleData: [action.payload.data] }]
      } else {
        const obj = { id: action.payload.id, MultipleData: [...state.formsData[index].MultipleData, action.payload.data] }
        state.formsData.splice(index, 1, obj)
      }
    }
  },
});

export const { selectFormType, addFormInput, addFormtitle, addForm, addFormId, deleteInput, setDragInputs, deleteOptions, editLabel, editOptionLabel, updateForm, deleteForm, storeFormsData } = formSlice.actions;
export default formSlice.reducer;
