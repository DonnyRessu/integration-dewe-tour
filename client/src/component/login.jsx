import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { useMutation } from "react-query";

const Login = () => {
  let navigate = useNavigate();
  const [userState, userDispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/login", form);
      console.log(" ", response);

      // send data to useContext
      userDispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);

      // status check
      if (response.data.data.role === "admin") {
        navigate("/list-transactions");
      } else {
        navigate("/");
      }
      Swal.fire({
        icon: "success",
        title: "LOGIN SUCCESSFUL !!",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "WRONG PASSWORD OR USERNAME !!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal-4"
        className="btn text-white px-8 bg-transparent z-10"
      >
        Login
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative w-96 bg-white" htmlFor="">
          <h3 className="text-2xl text-black font-bold mb-5 text-center">
            Login
          </h3>
          <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="mb-3">
              <label className="text-black font-medium text-lg"> Email </label>
              <input
                onChange={handleOnChange}
                type="email"
                name="email"
                value={email}
                className="px-5 w-full py-1 rounded bg-zinc-300  text-black"
              />
            </div>
            <div className="mb-5">
              <label className="text-black font-medium text-lg">Password</label>
              <input
                onChange={handleOnChange}
                type="password"
                name="password"
                value={password}
                className="px-5 w-full py-1 rounded bg-zinc-300  text-black"
              />
            </div>
            <div>
              <button
                onSubmit={(e) => handleOnSubmit.mutate(e)}
                className="w-full bg-yellow-400 text-white py-1 px-5 rounded"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-3">
              <p>Don't have an account? klik Here</p>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default Login;
