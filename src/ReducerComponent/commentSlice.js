import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  comments: [],
  error: "",
};

export const postComment = createAsyncThunk(
  "comments/POSTcomments",
  async (newComment, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/comment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error(`HTTP error! status: ${res.status}, ${errorText}`);
      }

      const responseData = await res.json();

      return responseData;
    } catch (error) {
      console.error("Error during the request:", error);
      return rejectWithValue(error.message || "Error posting the comment");
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Unknown error while submitting the comment";
      });
  },
});

export const selectComments = (state) => state.comments.comments;
export const isCommentLoading = (state) => state.comments.isLoading;
export const commentError = (state) => state.comments.error;

export default commentSlice.reducer;
