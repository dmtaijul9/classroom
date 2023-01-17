/* eslint-disable react-hooks/rules-of-hooks */
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Popover } from "@headlessui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { HiXMark, HiBars3 } from "react-icons/hi2";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "My Class", href: "/dashboard/my-class", current: false },
  { name: "Contact", href: "/contact", current: false },
  { name: "About", href: "/about", current: false },
];

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const HeaderNav = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(session);

  const logoutHandler = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  //@ts-ignore
  const isAdmin = session?.user.role === "ADMIN";
  //@ts-ignore
  const isTeacher = session?.user.role === "TEACHER";
  //@ts-ignore
  const isStudent = session?.user.role === "STUDENTS";

  return (
    <Disclosure as="nav" className="z-20 bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
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
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <h1 className="font-bold text-white">ClassRoom</h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative mr-2">
                  <div>
                    <Menu.Button className="flex text-white bg-gray-800 rounded-full focus:outline-none ">
                      <span className="sr-only">Create Or Join Class</span>
                      <AiOutlinePlusSquare
                        className="w-6 h-6"
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/join-class"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Join Class
                          </Link>
                        )}
                      </Menu.Item>

                      {isTeacher && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard/create-class"
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

                {/* Profile dropdown */}
                {session?.user ? (
                  <Menu as="div" className="relative ml-2">
                    <div>
                      <Menu.Button className="flex text-white bg-gray-800 rounded-full focus:outline-none ">
                        <span className="sr-only">Open user menu</span>

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
                              href="/dashboard/profile"
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
                    className="p-1 font-semibold text-white uppercase rounded-full focus:outline-none focus:ring-2 "
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
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default HeaderNav;
