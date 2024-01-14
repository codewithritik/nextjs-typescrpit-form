"use client";
import { typeUser } from "@/common/types";
import axios, { AxiosError } from "axios";
import React, { FormEvent, FormEventHandler, useState } from "react";

const SignUP: React.FC = () => {
    const [form, setForm] = useState<typeUser>({
        name: "",
        age: 0,
        email: "",
        password: ""
    })

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const { value, name } = e.currentTarget;
        setForm({ ...form, [name]: value });
    }

    const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios.post('/api/users', form)
            .then((response) => {
            })
            .catch((error) => {
                let message: string = '';
                if (error instanceof Error) {
                    message = error.message
                }
                if (error instanceof AxiosError) {
                    message = error.response?.data.message || "Server Unavailable"
                }
                alert(message)
            })
    }

    return <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div
            className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
        >
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div>
                    <div
                        className="w-32 mx-auto"
                        style={{ backgroundImage: 'https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png' }}
                    />
                </div>
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">
                        Sign Up for demo
                    </h1>
                    <div className="w-full flex-1 mt-1">
                        <div className="my-12 border-b text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                            >
                                sign up with e-mail
                            </div>
                        </div>

                        <form onSubmit={onSubmitHandle} className="mx-auto max-w-xs form-all-inherit{">
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="name"
                                name="name"
                                onChange={onChange}
                                required
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="number"
                                placeholder="age"
                                name="age"
                                onChange={onChange}
                                required
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={onChange}
                                required
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChange}
                                required

                            />
                            <button
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                type="submit"
                            >
                                <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">
                                    Sign Up
                                </span>
                            </button>
                        </form>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            {`I agree to abide by templatana's`}
                            <a href="#" className="border-b border-gray-500">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" className="border-b border-gray-500">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div
                    className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')` }}
                ></div>
            </div>
        </div>

    </div>
}

export default SignUP;


