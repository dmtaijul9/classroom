/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { HiXMark, HiBars3 } from "react-icons/hi2";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const navigation = [
  { name: "My Class", href: "/my-classes", current: false },
  { name: "Contact", href: "/contact", current: false },
  { name: "About", href: "/about", current: false },
];

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const HeaderNav = () => {
  const router = useRouter();

  const { pathname } = router;

  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  //@ts-ignore
  const isAdmin = session?.user.role === "ADMIN";
  //@ts-ignore
  const isTeacher = session?.user.role === "TEACHER";
  //@ts-ignore
  const isStudent = session?.user.role === "STUDENT";

  return (
    <Disclosure
      as="nav"
      className="text-white shadow-md bg-gradient-to-tr from-purple-900 to-black"
    >
      {({ open }) => (
        <>
          <div className="container px-2 mx-auto ">
            <div className="relative flex items-center justify-between h-24">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiXMark className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <HiBars3 className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:justify-start ">
                <Link
                  href="/"
                  className="flex items-center flex-shrink-0 overflow-hidden "
                >
                  <Image
                    src="/img/logo.png"
                    alt="elma logo"
                    width={145}
                    className="bg-white rounded-full w-[90px]"
                    height={145}
                  />
                </Link>
                <div className="hidden font-semibold sm:ml-6 sm:block">
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/about-us"
                      className={`py-2 mx-3 text-2xl font-bold hover:border-b ${
                        pathname === "/about-us" ? "text-green-600" : ""
                      }`}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact-us"
                      className={`py-2 mx-3 text-2xl font-bold hover:border-b ${
                        pathname === "/contact-us" ? "text-green-600" : ""
                      }`}
                    >
                      Contact Us
                    </Link>
                    {isTeacher || isStudent ? (
                      <Link
                        href="/my-classes"
                        className={`py-2 mx-3 text-2xl font-bold hover:border-b ${
                          pathname === "/my-classes" ? "text-green-600" : ""
                        }`}
                      >
                        My Classes
                      </Link>
                    ) : null}
                    {isStudent && (
                      <Link
                        href="/notes"
                        className={`py-2 mx-3 text-2xl font-bold hover:border-b ${
                          pathname === "/notes" ? "text-green-600" : ""
                        }`}
                      >
                        My Notes
                      </Link>
                    )}
                    {isAdmin && (
                      <>
                        <Link
                          href="/dashboard/user-management"
                          className={`py-2 mx-3 text-2xl font-bold hover:border-b ${
                            pathname === "/dashboard/user-management"
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          User Management
                        </Link>
                        <Link
                          href="/dashboard/classes"
                          className={`py-2 mx-3 text-2xl font-bold hover:border-b ${
                            pathname === "/dashboard/classes"
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          Classes
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {status === "authenticated" && (
                  <Menu as="div" className="relative mr-2">
                    <div>
                      <Menu.Button className="flex rounded-full focus:outline-none ">
                        <span className="sr-only">Create Or Join Class</span>
                        <AiOutlinePlusSquare
                          className="w-10 h-10"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isAdmin && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/signup"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Create Account
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {isStudent || isTeacher ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/join-class"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Join Class
                              </Link>
                            )}
                          </Menu.Item>
                        ) : null}

                        {isTeacher && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/create-class"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Create Class
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                {/* Profile dropdown */}
                {session?.user ? (
                  <Menu as="div" className="relative ml-2">
                    <div>
                      <Menu.Button className="flex text-white rounded-full focus:outline-none ">
                        <span className="sr-only">Open user menu</span>

                        {session?.user.image ? (
                          <Image
                            src={
                              session?.user.image
                                ? session.user.image
                                : "/img/user_placeholder.png"
                            }
                            className="w-8 h-8 rounded-full"
                            alt=""
                            width={200}
                            height={200}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-12 h-12 rounded-full">
                            <BiUserCircle size={50} />
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <h1
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {session?.user?.name}
                            </h1>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-start"
                              )}
                              onClick={logoutHandler}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    href="/login"
                    className="p-1 text-xl font-semibold uppercase rounded-full focus:outline-none "
                  >
                    <span className="sr-only">Create Or Join Class</span>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button
                as="a"
                href="/about-us"
                className={classNames(
                  pathname === "/about-us"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-base font-bold"
                )}
              >
                About Us
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/contact-us"
                className={classNames(
                  pathname === "/contact-us"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-base font-bold"
                )}
              >
                Contact Us
              </Disclosure.Button>
              {isTeacher || isStudent ? (
                <Disclosure.Button
                  as="a"
                  href="/my-classes"
                  className={classNames(
                    pathname === "/my-classes"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-bold"
                  )}
                >
                  My Classes
                </Disclosure.Button>
              ) : null}
              {isStudent ? (
                <Disclosure.Button
                  as="a"
                  href="/notes"
                  className={classNames(
                    pathname === "/notes"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-bold"
                  )}
                >
                  My Notes
                </Disclosure.Button>
              ) : null}
              {isAdmin ? (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/dashboard/user-management"
                    className={classNames(
                      pathname === "/dashboard/user-management"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-bold"
                    )}
                  >
                    User management
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/dashboard/classes"
                    className={classNames(
                      pathname === "/dashboard/classes"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-bold"
                    )}
                  >
                    All Classess
                  </Disclosure.Button>
                </>
              ) : null}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default HeaderNav;
