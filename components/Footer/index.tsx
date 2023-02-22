import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

const index = () => {
  return (
    <footer>
      <div className="py-8 text-white bg-gradient-to-tr from-purple-900 to-black footer-1 sm:py-12">
        <div className="container flex flex-col justify-between p-4 mx-auto md:flex-row md:p-0">
          <div>
            <h1 className="mb-5 font-bold">Office Address</h1>
            <p>Cha-62/4, 2nd floor , uttar Badda, Badda, Dhaka-1212.</p>
            <p>Support: elma@gmail.com</p>
            <p>Helpline: 01710390529, 01776486311</p>
          </div>
          <div>
            <h1 className="mb-5 font-bold">Useful Links</h1>

            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/">Blog</Link>
              </li>

              <li>
                <Link href="/">About Us</Link>
              </li>

              <li>
                <Link href="/">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/">Privacy & Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-5 font-bold">Follow Us</h1>
            <ul className="flex gap-5">
              <li>
                <Link href="/">
                  <BsFacebook size={25} />{" "}
                </Link>
              </li>
              <li>
                <Link href="/">
                  <AiFillInstagram size={25} />{" "}
                </Link>
              </li>
              <li>
                <Link href="/">
                  <BsLinkedin size={25} />{" "}
                </Link>
              </li>
              <li>
                <Link href="/">
                  <AiFillYoutube size={25} />{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 ">
        <div className="container py-3 mx-auto text-center text-white ">
          Copyright © 2023 by ELMA
        </div>
      </div>
    </footer>
  );
};

export default index;
