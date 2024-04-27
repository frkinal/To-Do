import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaTrash, FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
const id = sessionStorage.getItem("id");
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const TodoList = ({ addNew }: { addNew: boolean }) => {
  const [todos, settodos] = useState<Array<any>>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>({});
  const [inputs, setInputs] = useState<{
    title: string;
    body: string;
    completed: string;
    createdAt: string;
    updatedAt: string;
    user: Array<string>;
    _v: number;
    _id: string;
  }>({
    title: "",
    body: "",
    completed: "",
    createdAt: "",
    updatedAt: "",
    user: [],
    _v: 0,
    _id: "",
  });
  const baseUrl = "http://localhost:1000";
  const [open, setOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const handleOpen = (todo: any) => {
    setOpen(true);
    setInputs(todo);
  };
  const handleClose = () => setOpen(false);
  const handleImageOpen = (todo: any) => {
    setImageOpen(true);
    setSelectedTodo(todo);
  };
  const handleImageClose = () => {
    setImageOpen(false);
    setSelectedTodo({});
  };
  const fetch = async () => {
    await axios
      .get(`http://localhost:1000/api/v2/getTasks/${id}`)
      .then((res: any) => {
        if (res?.data?.length) {
          settodos(res?.data);
        } else {
          settodos([]);
        }
      });
  };
  useEffect(() => {
    fetch();
  }, [addNew]);
  const filteredTodos = useSelector((state: any) => {
    // const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm?.toLowerCase();
    return todos?.filter((todo: any) => {
      const matchesFilter =
        (filter === "COMPLETED" && todo.completed) ||
        (filter === "INCOMPLETE" && !todo.completed) ||
        filter === "ALL";
      const matchesSearch =
        todo.title?.toLowerCase().includes(searchTerm) ||
        todo.body?.toLowerCase().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  });
  const del = async (todoid: string) => {
    await axios
      .delete(`http://localhost:1000/api/v2/deleteTask/${todoid}`, {
        data: { id },
      })
      .then(() => {
        fetch();
        toast.success("Your task is deleted");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  const change = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const update = async () => {
    await axios
      .put(`http://localhost:1000/api/v2/updateTask/${inputs._id}`, {
        title: inputs.title,
        body: inputs.body,
        completed: inputs.completed,
      })
      .then(() => {
        fetch();
        handleClose();
        toast.success("Your task is updated");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  const complete = async (todo: any, change: string) => {
    await axios
      .put(`http://localhost:1000/api/v2/updateTask/${todo._id}`, {
        title: todo.title,
        body: todo.body,
        completed: change,
      })
      .then(() => {
        fetch();
        handleClose();
        toast.success("Your task is updated");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
        <div className="flex items-center">
          <span className="mr-4 w-12 text-gray-500">Key</span>
          <span className="mr-4 w-12 text-gray-500">Image</span>
          <span className={`mr-4 w-28  text-gray-500 `}>Title</span>
          <span className={`mr-4  text-gray-500`}>Body</span>
        </div>
        <div className="space-x-3 ml-8">
          <span className="text-sm  text-gray-500">Trash</span>
          <span className="text-sm  text-gray-500">Edit</span>
          <span className="text-sm  text-gray-500">Check</span>
        </div>
      </li>
      {filteredTodos?.map((todo: any, index: any) => (
        <li
          key={index}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4"
        >
          <div className="flex items-center">
            <span className="mr-4 w-12 text-gray-500">{index + 1}.</span>
            <div className="mr-4 w-12" onClick={() => handleImageOpen(todo)}>
              <img src={`${baseUrl}${todo.image}`} className="w-6 h-6" />
            </div>
            <span
              className={`mr-4 w-28 ${
                todo.completed === "1" ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <span> </span>
            <span
              className={`mr-4 ${
                todo.completed === "1" ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.body}
            </span>
          </div>
          <div className="space-x-3 ml-8">
            <button
              className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
              onClick={() => del(todo._id)}
            >
              <FaTrash />
            </button>
            <button
              className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
              onClick={() => handleOpen(todo)}
            >
              <FaEdit />
            </button>
            {todo.completed === "0" && (
              <button
                className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
                onClick={() => complete(todo, "1")}
              >
                <FaCheck />
              </button>
            )}
            {todo.completed === "1" && (
              <button
                className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
                onClick={() => complete(todo, "0")}
              >
                <FaTimes />
              </button>
            )}
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex items-center mb-4">
                <input
                  id="title"
                  name="title"
                  className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Title"
                  value={inputs.title}
                  onChange={change}
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  name="body"
                  id="body"
                  className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Body"
                  value={inputs.body}
                  onChange={change}
                />
                <button
                  className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  onClick={update}
                >
                  <FaCheck size={20} />
                </button>
              </div>
            </Box>
          </Modal>
          <Modal
            open={imageOpen}
            onClose={handleImageClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <img src={`${baseUrl}${selectedTodo.image}`} />
            </Box>
          </Modal>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
