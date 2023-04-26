import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

function PostReaction({ post }) {
  const handleClick = (emoji) => {
    console.log(emoji);
    // temp
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoundedIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.like}
      </Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbUpRoundedIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {post?.reactions?.dislike}
      </Typography>
    </Stack>
  );
}

export default PostReaction;
