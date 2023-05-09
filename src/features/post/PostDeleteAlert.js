import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";

export default function PostDeleteAlert({
  openAlert,
  setOpenAlert,
  deletePostId,
}) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(openAlert);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const handleClose = () => {
    setOpenAlert(false);
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(deletePostId));
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
