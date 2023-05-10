import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  // IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import PostMore from "./PostMore";

function PostCard({ post, handleEdit }) {
  // console.log(post);
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color={"text.primary"}
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={<PostMore post={post} handleEdit={handleEdit} />}
      />

      <Stack spacing={2} padding={3}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
