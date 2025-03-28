import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
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
    FavouritePost: DataState[];
  }

  const initialState: PostsState = {
    FavouritePost: [],
  };

  const FavouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers:{
        addItem: (state, action: PayloadAction<DataState>) => {
          // const isExist= state.FavouritePost.some((val)=> val.id === action.payload.id)
            state.FavouritePost.push(action.payload);
          
    }
    }
  })


  export const { addItem } = FavouriteSlice.actions;
export default FavouriteSlice.reducer;
