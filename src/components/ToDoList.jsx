import { useDispatch, useSelector } from "react-redux";
import { setToDoList, addTodo, sortTodo, updateTodo, toggleCompleted } from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import image from "../assets/3248209.png";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShoModal] = useState(false);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodiList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodiList) {
      dispatch(setToDoList(localTodiList));
    }
  }, []);

  const handleAddToDo = (task) => {
    if (task.trim().length === 0) {
      alert("Please Enter A Task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShoModal(false);
    }
  };

  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please Enter A Task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));

      setShoModal(false);
    }
  };

  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id !== id);
    dispatch(setToDoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  function handleSort(sortCriteria) {
    dispatch(sortTodo(sortCriteria));
  }

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  const handleToogleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparrentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              onChange={(e) => setNewTask(e.target.value)}
              className="border p-2 rounded-md w-full outline-none mb-8"
              value={newTask}
              type="text"
              placeholder={currentToDo ? "Update your task here" : "Enter your task here"}
            />
            <div className="flex justify-between gap-5">
              {currentToDo ? (
                <>
                  <button className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                    onClick={() => {
                      setShoModal(false);
                      handleUpdateToDoList(currentToDo.id, newTask);
                    }}
                  >
                    Save
                  </button>
                  <button className="bg-tangroa rounded-md text-white py-3 px-10" onClick={() => setShoModal(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setShoModal(false)} className="bg-tangroa rounded-md text-white py-3 px-10">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShoModal(true);
                      handleAddToDo(newTask);
                    }}
                    className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <>
            <div className="mb-8">
              <div className="sm:w-[300px] sm:h-[300px] min-w-[250px]">
                <img src={image} alt="" />
              </div>
              <p className="text-center text-Gray mt-8">You have no todo`s please add some</p>
            </div>
          </>
        ) : (
          <div className="container mx-auto mt-6">
            
            <div className=" flex justify-center mb-6">
              <select className="p-1 outline-none text-sm bg-gray-400" onChange={(e) => handleSort(e.target.value)}>
                <option className="text-sm bg-white" value="All">All</option>
                <option className="text-sm bg-white" value="Completed">Completed</option>
                <option className="text-sm bg-white" value="Not Completed">Not Completed</option>
              </select>
            </div>
            
            <div>
              {sortToDoList.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between mb-6 bg-tangroa mx-auto w-full md:w-[75%] rounded-md p-4">
                  <div className={`${todo.completed ? "line-through text-greenteal" : "text-sunsetOrange"}`} onClick={() => { handleToogleCompleted(todo.id); }}>
                    {todo.task}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setShoModal(true);
                        setCurrentToDo(todo);
                        setNewTask(todo.task);
                      }}
                      className="bg-blue-500 text-white p-1 rounded-md ml-2"
                    >
                      <TiPencil />
                    </button>
                    <button onClick={() => handleDeleteToDo(todo.id)} className="bg-sunsetOrange text-white p-1 rounded-md ml-2">
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setShoModal(true);
            setCurrentToDo(null);
            setNewTask("");
          }}
          className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
