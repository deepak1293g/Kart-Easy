import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <Wrapper className="flex flex-col md:flex-row justify-center md:justify-between gap-10">
        {/* LEFT START */}
        <div className="flex flex-col md:flex-row gap-10 w-full md:max-w-[1200px]">
          {/* MENU START */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <div className="font-oswald font-medium text-xl uppercase">
              KART EASY
            </div>
            <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
              Subscribe
            </div>
            <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
              Get 10% off on your first order
            </div>
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-black border border-solid border-white text-white/[0.5] px-4 py-2 w-[200px] md:w-[250px] lg:w-[300px]"
            />
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex flex-col md:flex-row gap-20 w-full md:w-1/2">
            {/* SUPPORT MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-xl">
                Support
              </div>
              <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                Faridabad, Haryana 121001
              </div>
              <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                karteasycontact@shop.com
              </div>
              <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                +91 123456789
              </div>
            </div>
            {/* SUPPORT MENU END */}

            {/* ACCOUNT MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-xl">
                Account
              </div>
              <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                Login / Register
              </div>
              <Link href="/cart">
                <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                  Cart
                </div>
              </Link>
              <Link href="wishlist">
                <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                  Wishlist
                </div>
              </Link>
              <Link href="/">
                <div className="text-lg text-white/[0.5] hover:text-white cursor-pointer">
                  Shop
                </div>
              </Link>
            </div>
            {/* ACCOUNT MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}
      </Wrapper>

      {/* SOCIAL ICONS START */}
      <Wrapper className="flex justify-center mt-10 gap-4 flex-wrap">
        <div
          onClick={() => window.open("https://facebook.com", "_blank")}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaFacebookF size={20} />
        </div>
        <Link
          href="https://twitter.com"
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaTwitter size={20} />
        </Link>
        <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
          <FaYoutube size={20} />
        </div>
        <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
          <FaInstagram size={20} />
        </div>
      </Wrapper>
      {/* SOCIAL ICONS END */}

      <Wrapper className="flex  md:flex-row justify-center  mt-10 ">
        {/* LEFT START */}
        <div className="text-[16px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          &copy; 2024 Kart Easy, Inc. All Rights Reserved
        </div>
        {/* LEFT END */}
      </Wrapper>
    </footer>
  );
};

export default Footer;
