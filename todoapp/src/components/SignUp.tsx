import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const history = useNavigate();
  const [inputs, setInputs] = useState<{
    email: string;
    password: string;
    username: string;
  }>({
    email: "",
    password: "",
    username: "",
  });
  const change = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const submit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1000/api/v1/register", inputs)
      .then((res) => {
        if (res.data.message === "User Already Exist") {
          alert(res.data.message);
        } else {
          alert(res.data.message);
          setInputs({ email: "", password: "", username: "" });
          history("/signin");
        }
      });
  };
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="test@example.com"
          onChange={change}
          value={inputs.email}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          placeholder="username"
          onChange={change}
          value={inputs.username}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          placeholder="*******"
          onChange={change}
          value={inputs.password}
        />
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={submit}
          >
            Register
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Do you have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            onClick={() => history("/")}
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
}
