import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";
// import { getCurrentUserProfile } from "../user/userSlice";

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
    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
    resetPosts(state, action) {
      state.postsById = {}; // empty obj
      state.currentPagePosts = []; // empty array
    },
    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPagePosts = state.currentPagePosts.filter(
        (postId) => postId !== action.payload
      );
      delete state.postsById[action.payload];
    },
    editPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { content, image } = action.payload;
      state.postsById[action.payload._id].content = content;
      state.postsById[action.payload._id].image = image;
    },
  },
});

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    // middleware

    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      // upload to cloudinary, receive a string
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
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
      if (page === 1) dispatch(slice.actions.resetPosts());
      // clear prev user before pouring data in omg
      dispatch(slice.actions.getPostsSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
        // as per backend api
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data.data,
        })
      );
      // inside brackets is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePost = (deletePostId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`posts/${deletePostId}`);
    dispatch(slice.actions.deletePostSuccess(deletePostId));
    toast.success("Post deleted.");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editPost =
  ({ content, image, _id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.put(`/posts/${_id}`, {
        content,
        image: imageUrl,
      });
      console.log(response);
      dispatch(slice.actions.editPostSuccess(response.data.data));
      toast.success("Your post has been updated.");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
