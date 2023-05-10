import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  usersById: {},
  currentPageUsers: [],
  totalPages: 1,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    getFriendRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    sendFriendRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    declineRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    acceptRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },
    removeFriendSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },
    getSentRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
  },
});

export default slice.reducer;

export const getUsers =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      if (filterName) {
        params.name = filterName;
      }
      const response = await apiService.get(`/users`, {
        params,
      });
      dispatch(slice.actions.getUsersSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getFriends =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      if (filterName) {
        params.name = filterName;
      }
      const response = await apiService.get(`/friends`, {
        params,
      });
      dispatch(slice.actions.getFriendsSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getFriendRequests =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      if (filterName) {
        params.name = filterName;
      }
      const response = await apiService.get(`/friends/requests/incoming`, {
        params,
      });
      dispatch(slice.actions.getFriendRequestsSuccess(response.data.data));
      // response.xxx is the action.payload
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/friends/requests", {
      to: targetUserId,
    });
    dispatch(
      slice.actions.sendFriendRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request sent");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
    console.log(error);
  }
};

export const declineRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    dispatch(
      slice.actions.declineRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request declined");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const acceptRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    dispatch(
      slice.actions.acceptRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request accepted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const cancelRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/friends/requests/${targetUserId}`
    );
    dispatch(
      slice.actions.cancelRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request canceled");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const removeFriend = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/friends/${targetUserId}`);
    dispatch(
      slice.actions.removeFriendSuccess({ ...response.data.data, targetUserId })
    );
    toast.success("Friend removed");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSentRequests =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      if (filterName) {
        params.name = filterName;
      }
      const response = await apiService.get(`/friends/requests/outgoing`, {
        params,
      });
      dispatch(slice.actions.getSentRequestsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
