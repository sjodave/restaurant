import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogged, setLoginDetails } from "../Redux/Reducer";

const Login = () => {
  const dispatch = useDispatch();
  const { loginDetails } = useSelector((state) => state.reduxStore);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];
  const validate = (data) => {
    const user = data.filter(
      (e) => e.fields.username === loginDetails.username
    )[0];
    if (!user) {
      setError("Incorrect Username");
      return;
    } else if (user && user?.fields.password !== loginDetails.password) {
      setError("Incorrect Password");
    } else {
      dispatch(setIsLogged(true));
      sessionStorage.setItem("isLoggedIn", true);
      navigate("/HomePage");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view",
      {
        method: "get",
        headers: {
          Authorization: "Bearer keyfXgn8PL6pB3x32",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => validate(data.records));
  };

  const onChange = (e) => {
    dispatch(
      setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={loginDetails[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="error">{error}</div>
        <button>Login</button>
      </form>
    </div>
  );
};
export default Login;
