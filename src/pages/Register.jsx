import React, { useState } from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import { useRegisterMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [register] = useRegisterMutation();
  const nav = useNavigate();

  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const user = { name, email, password, password_confirmation };
      const {data} = await register(user);
      if(data.success){
        nav('/login')
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-2xl font-semibold">Register</h1>
      <form
        onSubmit={registerHandler}
        className="flex flex-col gap-5 w-96 shadow-lg p-5"
      >
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <PasswordInput
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          placeholder="Confirmed password"
        />
        <Link to={'/login'}>
        <div className="flex text-sm">
          <p className=" ">Already have an account?</p>
          <button className="  text-blue-400 underline">
            Login
          </button>
        </div>
        </Link>

        <button
          className=" py-1 px-2 bg-blue-500 rounded text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
