import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);
      const response = await axios.post(
        "http://127.0.0.1:8000/token/",
        {
          username: formData.username,
          password: formData.password,
          scope: "",
          client_id: "",
          client_secret: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
