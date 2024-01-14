"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    Email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData)
    if(loginData.Email==='admin@gmail.com' && loginData.password === 'admin'){
      localStorage.setItem('isLogin', 'true');
      router.push('/studentgrid');
    }
    else{
      alert("email and password is wrong")
    }
  };

  const handleSing = () => {
    router.push("/signup");
  };

  return (
    <div className="black-background h-full min-h-screen w-full	">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form onSubmit={handleFormSubmit} className="login-form">
          <h3>Login Here</h3>
          <label htmlFor="Email">Username</label>
          <input
            type="text"
            placeholder="Email"
            id="Email"
            value={loginData.Email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={loginData.password}
            required
            onChange={handleChange}
          />
          <button className="bg-white" type="submit">
            Log In
          </button>
          <button onClick={handleSing} className="bg-white mt-6">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
