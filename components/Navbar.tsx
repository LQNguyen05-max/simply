"use client";
import { Menu, NotebookPenIcon, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/constants";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-white font-semibold">
      <div className="container mx-auto relatve text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0 gap-x-2">
            <NotebookPenIcon />
            <span className="text-xl font-bold tracking-wide">SimplyCard</span>
          </div>
          <ul className="hidden lg:flex space-x-24">
            {navItems.map((item, index) => (
              <li key={index} className="hover:underline">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            {status === "authenticated" ? (
              <Link
                href=""
                className="py-2 px-3 border rounded-md font-semibold"
                onClick={() => {
                  signOut({ redirect: false }).then(() => {
                    router.push("/");
                  });
                }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  href="login"
                  className="py-2 px-3 border rounded-md font-semibold"
                >
                  Log In
                </Link>
                <Link
                  href="register"
                  className="py-2 px-3 rounded-md bg-sky-500 font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-gradient-to-r from-cyan-400 to-fuchsia-400 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-2 hover:underline cursor-pointer">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 mt-2">
              {status === "authenticated" ? (
                <Link
                  href=""
                  className="py-2 px-3 border rounded-md font-semibold"
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      router.push("/");
                    });
                  }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    href="login"
                    className="py-2 px-3 border rounded-md font-semibold"
                  >
                    Log In
                  </Link>
                  <Link
                    href="register"
                    className="py-2 px-3 rounded-md bg-sky-500 font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
