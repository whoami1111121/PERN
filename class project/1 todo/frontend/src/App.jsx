import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// https://www.youtube.com/watch?v=JvrenJBnjnQ
function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/todos", {
        description,
        completed: false,
      });
      setDescription("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, {
        description: editedText,
      });
      setEditingTodo(null);
      setEditedText("");
      getTodos();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const todo = todos.find((todo) => todo.todo_id === id);

      await axios.put(`http://localhost:5000/todos/${id}`, {
        description: todo.description,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>
        <h1>form</h1>
        <br />
        <br />

        <div>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="your todo"
            />

            <button>Add todo</button>
          </form>

          <br />
          <div
            className="flex flex-col gap-8"
            style={{ display: "flex", gap: "40px", flexDeriction: "column" }}
          >
            {todos.map((todo) => (
              <div key={todo.todo_id}>
                {editingTodo === todo.todo_id ? (
                  <div>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div>
                      <button onClick={() => saveEdit(todo.todo_id)}>
                        save
                      </button>
                      <button onClick={() => setEditingTodo(null)}>
                        close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <button onClick={() => toggleCompleted(todo.todo_id)}>
                        {todo.completed ? "com" : "due"}
                      </button>
                    </div>
                    <span>{todo.description}</span>
                    <div>
                      <button
                        onClick={() => {
                          setEditingTodo(todo.todo_id);
                          setEditedText(todo.description);
                        }}
                      >
                        edit
                      </button>
                      <button onClick={() => deleteTodo(todo.todo_id)}>
                        delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
