import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bookmark from "./components/Bookmark";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SideBar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Logout from "./components/Logout";
const App = () => {
  const { isLoggedIn } = useSelector((state) => state.reduxStore);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
      {isLoggedIn ? (
        <SideBar>
          <Routes>
            <Route path="/HomePage" element={<HomePage />}></Route>
            <Route path="/Bookmarks" element={<Bookmark />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
          </Routes>
        </SideBar>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
