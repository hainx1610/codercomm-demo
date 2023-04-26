import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  commentsByPost: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, comments, count, page } = action.payload;
      comments.forEach((comment) => {
        state.commentsById[comment._id] = comment;
      });
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      // reverse so newest comment on top
      state.totalCommentsByPost[postId] = count;
      state.currentPageByPost[postId] = page;
    },
  },
});

export default slice.reducer;

export const createComment =
  ({ postId, content }) =>
  async (dispatch) => {
    // middleware

    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        postId,
      });
      dispatch(slice.actions.createCommentSuccess(response.data.data));
      // response.xxx is the action.payload

      dispatch(getComments({ postId }));
      // weird logic to render new comment without reloading page
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentsSuccess({
          ...response.data.data,
          postId,
          page,
        })
      );
      // inside brackets is the action.payload
      // spread because no postId in response data
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
