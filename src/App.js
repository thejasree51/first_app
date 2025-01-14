import React, { useState } from 'react'; // Import useState
import './App.css'; // Import CSS

const App = () => {
  const [todo, setTodo] = useState(""); // State for the input value
  const [todos, setTodos] = useState([]); // State for the list of todos
  const [editId,setEditId]=useState(0);
  const handleSubmit = (e) => {
    // Prevent the form from refreshing the page
    e.preventDefault();
    if(editId){
      const editTodo=todos.find((i)=>i.id==editId);
      const updatedTodos=todos.map((t)=>t.id==editTodo.id?(t={id:t.id,todo}):{id:t.id,todo:t.todo});
      setTodos(updatedTodos);
      setEditId(0);
      setTodo(" ");
      return;
    }
    // Add the todo to the list only if it's not empty
    if (todo.trim() !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo(" "); // Clear the input after adding the todo
    }
  };
  const handleDelete=(id)=>{
    const deleteTodo=todos.filter((to)=>to.id!==id);
    setTodos([...deleteTodo]);
  }
  const handleEdit=(id)=>{
      const editTodo=todos.find((i)=>i.id==id);
      setTodo(editTodo.todo);
      setEditId(id);
  }
  /*
  const arr = [1, 2, 3, 4, 5];
  const obj = [
    {
      id: 1,
      name: 'a',
    }, {
      id: 2,
      name: 'b',
    },
  ];
  */

  return (
    /* <div className="App">
      {arr.map((num) => (
        <div key={num}>{num},</div>
      ))}
    </div>
    <div className="App">{arr.filter((num) => num !== 3)}</div>
    <div className="App">
      {
        obj.map((nums) => {
          return <div>{nums.name}</div>;
        })
      }
    </div> */
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoform" onSubmit={handleSubmit}>
          {/* Input field to add a new todo */}
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId?"Edit":"Go"}</button>
        </form>
        <ul className="allTodos">
          {/* Render all todos */}
          {todos.map((t) => {
            return (
              <li className="singleTodo" key={t.id}>
                <span className="todoText">{t.todo}</span>
                <button className="editButton" onClick={()=>handleEdit(t.id)}>Edit</button>
                <button className="deleteButton" onClick={()=>handleDelete(t.id)}>Delete</button>
              </li>
            );
          })}
          {/* <li>
            <span>learn React</span>
            <button>Edit</button>
            <button>Delete</button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default App;

