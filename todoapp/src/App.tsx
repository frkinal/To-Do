import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Todo from "./components/Todo";
import SignIn from "./components/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
  const session = sessionStorage.getItem("id");
  useEffect(() => {
    if (session) {
      dispatch(login(true));
    } else {
      dispatch(login(false));
    }
  }, [session]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Todo /> : <SignIn />} />
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
      </Routes>
    </Router>
  );
}
export default App;
