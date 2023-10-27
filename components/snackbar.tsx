import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, MuiAlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

interface CustomSnackbarProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  open: boolean;
  handleClose: (event: React.SyntheticEvent | Event, reason: string) => void;
}

export default function CustomSnackbar({
  severity,
  message,
  open,
  handleClose,
}: CustomSnackbarProps) {
  const handleAlertClose = (event: React.SyntheticEvent) => {
    handleClose(event as any, "clickaway");
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleAlertClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
