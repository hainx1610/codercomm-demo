import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../features/user/userSlice";
import { Card, Container } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import ProfileCover from "../features/user/ProfileCover";
import Profile from "../features/user/Profile";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;
  // path="user/:userId"

  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );
  // shallowEqual for when selectedUser is changed internally, because it's an obj

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: "relative",
            }}
          >
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
