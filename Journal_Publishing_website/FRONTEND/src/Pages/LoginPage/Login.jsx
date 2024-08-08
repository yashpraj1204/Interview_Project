import axios from "axios";
import "../../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ toggleContainer }) {
  let [formData, setFormData] = useState({ username: "", password: "" });
  let navigate = useNavigate();
  console.log(formData);

  const handleChange = (event) => {
    setFormData(() => {
      return { ...formData, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await axios.post("http://localhost:8080/journal/login", formData);
      let { data } = result;
      if (data.exists === false) {
        alert("User not found");
      } else if (data.valid === false) {
        alert("Invalid Password");
      } else {
        console.log(data);
        let { _id } = data;
        navigate(`/${_id}`);
      }
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  return (
    <div className="col align-items-center flex-col sign-in">
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="form-wrapper align-items-center">
          <div className="form sign-in">
            <div className="input-group">
              <i className='bx bxs-user'></i>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={handleChange}
                name="username"
                value={formData.username}
              />
            </div>
            <div className="input-group">
              <i className='bx bxs-lock-alt'></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={handleChange}
                name="password"
                value={formData.password}
              />
            </div>
            <button type="submit">Sign in</button>
            <p>
              <span className="text-xl">Don't have an account?</span>
              <b onClick={toggleContainer} className="pointer text-2xl ml-1 text-blue-700 active:text-red-800">
                Sign-up
              </b>
            </p>
          </div>
        </div>
        <div className="form-wrapper"></div>
      </form>
    </div>
  );
}
