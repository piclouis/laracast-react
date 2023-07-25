import { useState } from 'react'
import '../App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'titre 1',
      isComplete: false,
      isEditing: false
    },
    {
      id: 2,
      title: 'titre 2',
      isComplete: false,
      isEditing: false
    },
    {
      id: 3,
      title: 'titre 3',
      isComplete: false,
      isEditing: false
    }
  ]);

  const [todoInput, setTodoInput] = useState('');


  function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTodos([...todos, {
      id: ++todos.length,
      title: todoInput,
      isComplete: false,
      isEditing: false
    }]);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTodoInput(e.target.value);
  }

  function completeTodo(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(e: React.KeyboardEvent<HTMLInputElement>, id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const target = e.target as HTMLInputElement;

        if (target.value.trim().length !== 0) {
          todo.title = target.value;
        }

        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(e: React.KeyboardEvent<HTMLInputElement>, id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            onChange={handleInput}
            placeholder="What do you need to do?"
            value={todoInput}
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item-container">
              <div className="todo-item">
                <input 
                  type="checkbox"
                  checked = {todo.isComplete ? true : false}
                  onChange={() => {completeTodo(todo.id)}}  
                />
                { !todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label 
                    ${todo.isComplete ? 'line-through' : ''}`}>{todo.title}</span>
                )

                :( 
                  <input 
                    type="text" 
                    className="todo-item-input" 
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        updateTodo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        cancelEdit(event, todo.id);
                      }
                    }}
                    defaultValue={todo.title} />
                )}
              </div>
              <button className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}

        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
