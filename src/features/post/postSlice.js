import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
  // an obj cant have 2 same keys
  // only put ids in postsById and currentPagePosts, the actual data will come accordingly
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;

      if (state.currentPagePosts.length % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      // sometimes remove the last post/postId when there's a new post

      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
      // put newly-created post on top of list
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        // postsById[post._id] is a key to the obj, with value = post
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
  },
});

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    // middleware

    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/posts", {
        content,
        image,
      });
      dispatch(slice.actions.createPostSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

// get posts for pagination
export const getPosts =
  ({ userId, page, limit = 2 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      dispatch(slice.actions.getPostsSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
