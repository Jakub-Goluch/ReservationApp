import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_num: "",
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/client/",
        {
          name: formData.name,
          email: formData.email,
          phone_num: formData.phone_num,
          login: formData.login,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { login: formData.login },
        }
      );

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
      console.error("Error response:", error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} />
      </label>
      <label>
        Phone Number:
        <input type="text" name="phone_num" onChange={handleChange} />
      </label>
      <label>
        Login:
        <input type="text" name="login" onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
