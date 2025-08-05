import "./App.css";
import TodoList from "./component/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodoContext } from "./context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
let initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "يساعد علي اكتساب المعرفه وتحسين تفكير الانسان",
    IsCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة مجلد",
    details: "يساعد علي اكتساب المعرفه وتحسين تفكير الانسان",
    IsCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "يساعد علي اكتساب المعرفه وتحسين تفكير الانسان",
    IsCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  const theme = createTheme({
    typography: {
      fontFamily: ["Alexandria"],
    },
    palette: {
      primary: {
        main: "#d50000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          background: "#002342",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodoContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
