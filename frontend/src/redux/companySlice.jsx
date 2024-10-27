import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    TpoCompany: [],
    studentCompany:[],
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setTpoCompany: (state, action) => {
      state.TpoCompany = action.payload;
    },
    setStudentCompany:(state,action)=>{
      state.studentCompany = action.payload;
    }


  },
});

export const { setSingleCompany, setCompanies, setTpoCompany ,setStudentCompany} = companySlice.actions;
export default companySlice.reducer;
