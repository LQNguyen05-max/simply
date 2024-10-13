"use client";
/* eslint-disable */
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10 max-w-[500px]">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between border border-1 border-gray-200 rounded-xl items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <div className="pt-2"></div>
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-slate-300 rounded p-2"
          name="email"
        />
        <div className="pt-2"></div>
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full pb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-slate-300 rounded p-2"
            name="password"
          />
        </div>
        <div className="pt-4"></div>
        {error && (
          <div className="text-red-500 flex text-xs font-bold w-full">
            {error}
          </div>
        )}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-semibold p-2 border text-white rounded-lg">
          Sign In
        </button>
        <Link
          href="/register"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black justify-start w-full"
        >
          Don't have an account?
        </Link>
      </form>
    </section>
  );
}
