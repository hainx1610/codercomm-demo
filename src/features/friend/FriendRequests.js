import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import UserCard from "./UserCard";
import { getFriendRequests } from "./friendSlice";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);
  // users is an array, while usersById is an obj

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendRequests({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => setFilterName(searchQuery);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }}>{/* empty flexGrow box */}</Box>
            <Typography
              ariant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No requests found"}
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
          <Grid container spacing={3} my={1}>
            {users.map((user) => (
              <Grid key={user._id} item xs={12}>
                <UserCard profile={user} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Card>
    </Container>
  );
}

export default FriendRequests;
