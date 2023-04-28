import React, { useState } from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import { useLoginMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";

const Login = () => {
  // const [email, setEmail] = useState("pyaesone444@gmail.com");
  // const [password, setPassword] = useState("12345678");
  const [login] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  // const loginHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const user = { email, password };
  //     const { data } = await login(user);
  //     dispatch(addUser({ user: data?.user, token: data?.token }));
  //     console.log(data);
  //     if (data.success) nav("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
    },
  });
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-2xl font-semibold">Login</h1>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            dispatch(addUser({ user: data?.user, token: data?.token }));
            if (data.success) nav("/");
          } catch (error) {
            console.log(error);
          }
        })}
        className="flex flex-col gap-5 w-96 shadow-lg p-5"
      >
        <TextInput
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...form.getInputProps("email")}
          placeholder="Your Email"
        />
        <PasswordInput
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...form.getInputProps("password")}
          placeholder="Password"
        />

        <div className="flex gap-2 text-sm">
          <p>Don't have an account?</p>
          <Link to={"/register"}>
            <button className=" text-blue-400 underline">Register</button>
          </Link>
        </div>

        <button
          className=" py-1 px-2 bg-blue-500 rounded text-white"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
