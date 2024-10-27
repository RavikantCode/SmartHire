import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allRecruiterJobs: [], 
    singleJob: [],
    searchJobByText: "",
    allAppliedJobs:[],
    searchQuery:"",
    TpoJobs:[],
    jobScores:[],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllRecruiterJobs: (state, action) => {
      state.allRecruiterJobs = action.payload; // Fix the key here
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery:(state,action)=>{
      state.searchQuery = action.payload
    },
    setTpoJobs:(state,action)=>{
      state.TpoJobs = action.payload
    },
    setJobScores:(state,action)=>{
      state.jobScores = action.payload
    }
  }
});

export const { setAllJobs, setSingleJob, setAllRecruiterJobs,setSearchQuery, setSearchJobByText,setAllAppliedJobs,setTpoJobs ,setJobScores} = jobSlice.actions;
export default jobSlice.reducer;
