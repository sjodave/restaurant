import React, { useEffect } from "react";
import { setIsLogged, setLoginDetails } from "../Redux/Reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLoginDetails(""));
    dispatch(setIsLogged(false));
    sessionStorage.setItem("isLoggedIn", false);
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logout</div>;
}
