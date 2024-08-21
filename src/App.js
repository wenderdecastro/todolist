import { MdDelete, MdEdit } from "react-icons/md";
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Task } from './components/Task';



function App() {


  const [Day, setDay] = useState(20);
  const [DayName, setDayName] = useState("Terça Feira");
  const [Month, setMonth] = useState("Agosto");

  const [isModalOpen, setIsModalOpen] = useState();

  const [source, setSource] = useState([
    { id: crypto.randomUUID(), name: "xesquedele 1", concluded: false },
    { id: crypto.randomUUID(), name: "xesquedele 2", concluded: true },
    { id: crypto.randomUUID(), name: "xesquedele 3", concluded: false },
    { id: crypto.randomUUID(), name: "xesquedele 4", concluded: true },
    { id: crypto.randomUUID(), name: "xesquedele 5", concluded: false },
    { id: crypto.randomUUID(), name: "xesquedele 6", concluded: false },
    { id: crypto.randomUUID(), name: "xesquedele 7", concluded: true },
  ]);

  const [todos, setTodos] = useState(source);
  const [search, setSearch] = useState("");

  const [taskInput, setTaskInput] = useState();

  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState();

  useEffect(() => {
    const filteredTasks = source.filter(task => task.name.toLowerCase().includes(search.toLowerCase()));
    setTodos(filteredTasks);
  }, [search, source]);

  function startEditing(task) {
    setEditMode(true);
    setIsModalOpen(true);
    setTaskInput(task.name)
    setEditedTask(task);
  }

  function editTask() {
    console.log(editTask);
    const updatedTodos = todos.map((task) =>
      task.id === editedTask.id ? { ...task, name: taskInput } : task
    );
    setEditMode(false);
    setIsModalOpen(false)
    setTodos(updatedTodos);

  }

  function createTask() {
    var newTask = { id: crypto.randomUUID(), name: taskInput, concluded: false }
    setSource([...source, newTask]);
    setTodos([...todos, newTask]);
    setIsModalOpen(false)
    console.log(todos);
  }

  function checkChangeTask(id) {
    setTodos(todos.map(task => task.id === id ? { ...task, concluded: !task.concluded } : task));
  }

  function deleteTask(id) {
    const tasksExceptDeleted = source.filter(x => x.id !== id);
    setSource(tasksExceptDeleted);
    setTodos(tasksExceptDeleted);

  }
  return (
    <>
      {isModalOpen ? (<div className='modal' >

        <div className="modal-background " ></div>
        <div className="taskform">
          <div className="form-top">
            <h1>
              {editMode ? "Edite sua tarefa" : "Descreva sua tarefa"}

            </h1>
            <input className="text-input modal-input"
              autoFocus
              value={taskInput}
              onChange={x => setTaskInput(x.target.value)}
              placeholder="Exemplo de descrição"
            />
            <>

              {editMode ? (

                <button onClick={x => editTask()} >Salvar</button>
              ) : (

                <button onClick={x => createTask()}>Confirmar tarefa</button>
              )}
            </>

          </div>
        </div>
      </div>) : (<></>)

      }

      <div className="container">
        <form className='taskform'>
          <div className='form-top'>
            <h1>
              {DayName}, <span>{Day}</span> de {Month}
            </h1>
            <input onChange={x => setSearch(x.target.value)} placeholder='Procurar tarefa' className='text-input'>
            </input>
          </div>
          <div className='tasklist'>
            {todos.map((task) => (
              <Task key={task.id} task={task} onToggle={checkChangeTask} deleteTask={deleteTask} editTask={startEditing} />
            ))}
          </div>
        </form>
        <button onClick={() => setIsModalOpen(true)}>
          Nova Tarefa
        </button>


      </div>
    </>
  );
}

export default App;
