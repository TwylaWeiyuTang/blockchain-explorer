import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useContext } from "react";
import NotificationContext from "../config/Notification";
import { useEffect } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ message, show }) {
  const [open, setOpen] = React.useState(false);
  const notificationCtx = useContext(NotificationContext);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (notificationCtx.notificationText) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [notificationCtx.notificationText]);

  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {notificationCtx.notificationText}
      </Alert>
    </Snackbar>
  );
}
