import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const index = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="z-50 px-6 pt-6 lg:px-8">
      <div>
        <nav
          className="container flex items-center justify-between m-auto h-9"
          aria-label="Global"
        >
          <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1 className="font-bold"> Logo</h1>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <span className="sr-only">Open main menu</span>
              {/*             <!-- Heroicon name: outline/bars-3 --> */}
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-5">
            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              Features
            </a>

            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              About
            </a>

            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              Contact
            </a>
            <Link
              href="/signup"
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              Create acount
            </Link>
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Log in
            </Link>
          </div>
        </nav>
        {/*       <!-- Mobile menu, show/hide based on menu open state. --> */}
        <div
          role="dialog"
          aria-modal="true"
          className={menuOpen ? "block" : "hidden"}
        >
          <div className="fixed inset-0 z-10 px-6 py-6 overflow-y-auto bg-white lg:hidden">
            <div className="flex items-center justify-between h-9">
              <div className="flex">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <h1 className="font-bold"> Logo</h1>
                </Link>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <span className="sr-only">Close menu</span>
                  {/*    <!-- Heroicon name: outline/x-mark --> */}
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  <a
                    href="#"
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-400/10"
                  >
                    Features
                  </a>

                  <Link
                    href="/about"
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-400/10"
                  >
                    About
                  </Link>

                  <a
                    href="#"
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-400/10"
                  >
                    Contact
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href=""
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
