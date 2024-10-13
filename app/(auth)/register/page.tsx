"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10 max-w-[500px]">
      <form
        ref={ref}
        action={handleSubmit}
        className="p-6 w-full max-w-[400px] border border-1 border-gray-200 rounded-xl items-center"
      >
        <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

        <label className="w-full text-sm">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full h-8 border border-solid border-slate-300 py-1 px-2.5 rounded text-[13px]"
          name="name"
        />
        <div className="pt-2"></div>
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-slate-300 py-1 px-2.5 rounded"
          name="email"
        />
        <div className="pt-2"></div>
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-slate-300 py-1 px-2.5 rounded"
            name="password"
          />
        </div>
        <div className="pt-4"></div>
        <div className="flex justify-start">
          {error && (
            <div className="text-red-500 flex text-xs font-bold place-content-start justify-start w-full">
              {error}
            </div>
          )}
        </div>
        <button className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-semibold p-2 border text-white rounded-lg">
          Sign Up
        </button>

        <Link
          href="/login"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
