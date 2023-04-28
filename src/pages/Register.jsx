import React, { useState } from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import { useRegisterMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password_confirmation, setPassword_confirmation] = useState("");
  const [register] = useRegisterMutation();
  const nav = useNavigate();

  // const registerHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const user = { name, email, password, password_confirmation };
  //     const {data} = await register(user);
  //     if(data.success){
  //       nav('/login')
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-2xl font-semibold">Register</h1>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            if (data?.success) nav("/login");
          } catch (error) {
            console.log(error);
          }
        })}
        className="flex flex-col gap-5 w-96 shadow-lg p-5"
      >
        <TextInput {...form.getInputProps("name")} placeholder="Your Name" />
        <TextInput {...form.getInputProps("email")} placeholder="Your Email" />
        <PasswordInput
          {...form.getInputProps("password")}
          placeholder="Password"
        />
        <PasswordInput
          {...form.getInputProps("password_confirmation")}
          placeholder="Confirmed password"
        />
        <Link to={"/login"}>
          <div className="flex text-sm">
            <p className=" ">Already have an account?</p>
            <button className="  text-blue-400 underline">Login</button>
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
