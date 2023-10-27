import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { useRouter } from "next/router";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    try {
      const response = await fetch("/api/notifyTelegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, endTime, url }),
      });
      if (response.ok) {
        console.log("OK");
      } else {
        console.log("something wrong");
      }
    } catch (error: any) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <SpeakerNotesIcon style={{ fontSize: 40, color: "#1E90FF" }} />
      </IconButton>{" "}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <strong>傳送開團通知到群組</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            輸入相關資訊之後BOT會協助傳送開團消息,傳送範例:
            <br />
            開團囉! 快來加入訂購的行列吧!
            <br />
            開團店家: 台中市政府
            <br />
            結單時間:15:00
            <br />
            開團網址:
            https://docs.google.com/spreadsheets/d/16kl-DLwQKrACWurRy1NCLUHtctZUh9HJOVq6xGFdwdc/edit#gid=641140083
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="開團店家"
            type="text"
            fullWidth
            variant="standard"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <TextField
            margin="dense"
            id="endTime"
            label="結單時間"
            type="text"
            fullWidth
            variant="standard"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <TextField
            margin="dense"
            id="url"
            label="填單網址"
            type="url"
            fullWidth
            variant="standard"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSend}>通知!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
