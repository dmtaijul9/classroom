import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

const index = () => {
  return (
    <footer className="py-8 text-white bg-gradient-to-tr from-purple-900 to-black footer-1 sm:py-12">
      <div className="container flex flex-col justify-between p-4 mx-auto md:flex-row md:p-0">
        <div>
          <h1 className="mb-5 font-bold">Office Address</h1>
          <p>Level-4, 34, Awal Centre, Banani, Dhaka</p>
          <p>Support: web@programming-hero.com</p>
          <p>Helpline: 01322810867, 01322810873</p>
          <p>(Available:Sat-Thu, 10:00 AM to 7:00 PM)</p>
        </div>
        <div>
          <h1 className="mb-5 font-bold">Useful Links</h1>

          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/">Blog</Link>
            </li>
            <li>
              <Link href="/">Success</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Refund Policy</Link>
            </li>
            <li>
              <Link href="/">Terms and Conditions</Link>
            </li>
            <li>
              <Link href="/">Privacy & App Privacy Policy</Link>
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
    </footer>
  );
};

export default index;
