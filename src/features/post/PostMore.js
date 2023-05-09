import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostDeleteAlert from "./PostDeleteAlert";

export default function PostMore({ post, handleEdit }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openAlert, setOpenAlert] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <IconButton> */}
        <MoreVertIcon sx={{ fontSize: 30, color: "gray" }} />
        {/* </IconButton> */}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenAlert(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <PostDeleteAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        deletePostId={post._id}
      />
    </div>
  );
}
