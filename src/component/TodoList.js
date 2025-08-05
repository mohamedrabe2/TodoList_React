import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";
export default function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  const [titleTodo, setTitleTodo] = useState("");
  const [displayedTodoType, setDisplayedTodoType] = useState("all");

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleTodo,
      details: "",
      IsCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleTodo("");
  }
  function handleDisplayTodoType(e) {
    setDisplayedTodoType(e.target.value);
  }
  // Completed Todos
  const completedTodos = todos.filter((t) => {
    return t.IsCompleted;
  });
  // UnCompleted Todos
  const unCompletedTodos = todos.filter((t) => {
    return !t.IsCompleted;
  });

  let renderedTodos = todos;
  if (displayedTodoType === "completed") {
    renderedTodos = completedTodos;
  } else if (displayedTodoType === "not-completed") {
    renderedTodos = unCompletedTodos;
  } else {
    renderedTodos = todos;
  }
  // All Todos
  const todoList = renderedTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          textAlign: "center",
          padding: "20px",
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          مهامي
        </Typography>
        <Divider />
        <ToggleButtonGroup
          exclusive
          style={{
            direction: "ltr",
            marginTop: "20px",
          }}
          value={displayedTodoType}
          onClick={handleDisplayTodoType}
          color="primary"
        >
          <ToggleButton value="not-completed">غير منجز</ToggleButton>
          <ToggleButton value="completed">منجز</ToggleButton>
          <ToggleButton value="all">الكل</ToggleButton>
        </ToggleButtonGroup>
        {todoList}
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid
            size={8}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="عنوان المهمه"
              variant="outlined"
              style={{ width: "100%" }}
              value={titleTodo}
              onChange={(e) => setTitleTodo(e.target.value)}
            />
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              style={{ height: "100%", width: "100%" }}
              onClick={() => {
                handleAddClick();
              }}
              disabled={titleTodo.length === 0}
            >
              إضافه
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
