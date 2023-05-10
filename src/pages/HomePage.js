import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import FriendRequests from "../features/friend/FriendRequests";
import AddFriend from "../features/friend/AddFriend";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import ProfileCover from "../features/user/ProfileCover";
import { styled } from "@mui/material/styles";
import SentRequests from "../features/friend/SentRequests";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  // some responsiveness
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));
function HomePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <FriendRequests />,
    },
    {
      value: "sent_requests",
      icon: <OutboxRoundedIcon sx={{ fontSize: 24 }} />,
      component: <SentRequests />,
    },

    {
      value: "add_friend",
      icon: <PersonAddRoundedIcon sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];

  return (
    <Container>
      <Card sx={{ mb: 3, height: 280, position: "relative" }}>
        <ProfileCover profile={user} />
        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)} // remove underscore in "ADD_FRIEND"
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>
      {PROFILE_TABS.map(
        (tab) =>
          tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>
      )}
    </Container>
  );
}

export default HomePage;
