import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TodoList from "./TodoList";
import FilterButtons from "./FilterButtons";
import { BsSearch, BsPlus } from "react-icons/bs";
import { updateSearchTerm } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const id = sessionStorage.getItem("id");
const Todo = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputs, setInputs] = useState<{
    title: string;
    body: string;
    completed: boolean;
  }>({
    title: "",
    body: "",
    completed: false,
  });
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };
  const change = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const submit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or body can not be empty");
    } else {
      if (id) {
        await axios
          .post("http://localhost:1000/api/v2/addTask", {
            ...inputs,
            id,
          })
          .then((res) => {
            console.log(res);
            toast.success("Your task is added");
            setInputs({
              title: "",
              body: "",
              completed: false,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
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
          onClick={submit}
        >
          <BsPlus size={20} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>
      <TodoList />
      <ToastContainer />
    </div>
  );
};

export default Todo;
