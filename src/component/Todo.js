import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TodoContext } from "../context/TodoContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [updatedTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const handleDeleteOpen = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteDialog(false);
  };
  const handleUpdateOpen = () => {
    setShowUpdateDialog(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  function handleDeleteConfirm() {
    let todoAfterDeleted = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(todoAfterDeleted);
    localStorage.setItem("todos", JSON.stringify(todoAfterDeleted));
  }

  function handleUpdateConfirm() {
    let todoAfterUpdate = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(todoAfterUpdate);
    localStorage.setItem("todos", JSON.stringify(todoAfterUpdate));
    setShowUpdateDialog(false);
  }

  // Complete Task

  function handleCheckClick() {
    const updatedTodo = todos.map((t) => {
      if (t.id === todo.id) {
        t.IsCompleted = !t.IsCompleted;
      }
      return t;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }

  return (
    <>
      {/* Delete alert */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل تريد حذف هذه المهمه بالفعل ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع من الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm}>نعم ,موافق</Button>
        </DialogActions>
      </Dialog>
      {/* Delete alert */}

      {/* Edit alert */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمه ؟</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      {/* Edit alert */}

      <Card
        sx={{
          minWidth: 275,
          marginTop: 5,
          background: "#024288",
          color: "white",
        }}
        className="todo"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} style={{ textAlign: "right" }}>
              <Typography
                variant="h4"
                style={{
                  textDecoration: todo.IsCompleted ? "line-through" : "",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="p"> {todo.details}</Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                className="iconButton"
                style={{
                  color: todo.IsCompleted ? "white" : "#B4E50D",
                  background: todo.IsCompleted ? "#B4E50D" : "white",
                  border: "solid #B4E50D 3px",
                }}
                onClick={handleCheckClick}
              >
                <CheckOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                style={{
                  color: "#1B56FD",
                  background: "white",
                  border: "solid #1B56FD 3px",
                }}
                onClick={handleUpdateOpen}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                style={{
                  color: "#ED3500",
                  background: "white",
                  border: "solid #ED3500 3px",
                }}
                onClick={handleDeleteOpen}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
