import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
    id: number;
    full_name: string;
    description: string;
    owner: {
      login: string;
      avatar_url: string;
    };
    language: string;
    forks: number;
    stargazers_count: number;
    created_at: string;
    updated_at: string;
  }
  
  interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
  }
  
  // Initial state
  const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
  };
  
export const fetchRepos= createAsyncThunk('fetchRpos', async(query:string, {rejectWithValue})=>{
    console.log(query)
    try{
        const response= await axios.get<{ items:Post[] }>(`https://api.github.com/search/repositories?q=${query}`)
        return response.data.items;
     }catch(error:any){
        throw new Error(error.response?.data || "Something went wrong");
     }
});

// Create the slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRepos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRepos.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        })
        .addCase(fetchRepos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch posts";
        });
    },
  });
  
  export default postsSlice.reducer;