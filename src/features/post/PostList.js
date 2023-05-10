import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard";
import { LoadingButton } from "@mui/lab";
import { Box, Modal, Typography } from "@mui/material";
import PostEditForm from "./PostEditForm";

function PostList({ userId }) {
  const [postEdited, setPostEdited] = useState(null);

  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts.map((postId) => postsById[postId]);
  // postsById is an obj

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
    // no userId the first time
  }, [dispatch, userId, page]);

  const handleEditPost = (post) => {
    setPostEdited(post);
  };

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleEdit={() => {
            handleEditPost(post);
          }}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
            // disabled if there are zero posts no more posts to load
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No post yet</Typography>
        )}
      </Box>

      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={!!postEdited}
        onClose={() => setPostEdited(null)}
      >
        <Box
          sx={{
            width: { xs: "80vw", md: 650 },
          }}
        >
          <PostEditForm post={postEdited} />
        </Box>
      </Modal>
    </>
  );
}

export default PostList;
