import { useEffect, useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import Footer from "./component/footer";
import Profile from "./pages/profile";
import Payment from "./pages/payment";
import DetailTour from "./pages/detailTour";
import Login from "./component/login";
import Register from "./component/Register";
import ListTransaction from "./pages/listTransaction";
import {
  PrivateRouteLogin,
  PrivateRouteUser,
  PrivateRouteAdmin,
} from "./pages/privateRoute";
import IncomeTrip from "./pages/incomeTrip";
import AddTrip from "./pages/addTrip";
import ModalApprove from "./component/modalApprove";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import UpdateTrip from "./pages/updateTrip";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dataTrans, setDataTrans] = useState();

  // console.log("satttt", dataTrans);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success: ", response);
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed: ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  return isLoading ? null : (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> */}
        <Route
          path="/detail-tour/:id"
          element={<DetailTour setDataTrans={setDataTrans} />}
        />
        <Route element={<PrivateRouteLogin />}>
          <Route element={<PrivateRouteUser />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/payment/:id"
              element={<Payment dataTrans={dataTrans} />}
            />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/list-transactions" element={<ListTransaction />} />
            <Route path="/income-trip" element={<IncomeTrip />} />
            <Route path="add-trip" element={<AddTrip />} />
            <Route path="/modal-approve" element={<ModalApprove />} />
            <Route path="update-trip/:id" element={<UpdateTrip />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
