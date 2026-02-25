import React from "react";


const Banner = () => {
  return (
    <>
      <div className="px-4 md:px-6 lg:px-8">
        <div className="hidden lg:flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
          <img
            className="max-w-56"
            src="/jbl_soundbox_image.png"
            alt="jbl_soundbox_image"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
              Level Up Your Gaming Experience
            </h2>
            <p className="max-w-[343px] font-medium text-neutral-600">
              From immersive sound to precise controls—everything you need to
              win
            </p>
            <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white cursor-pointer">
              Buy now
              <img
                className="group-hover:translate-x-1 transition"
                src="/arrow_icon_white.svg"
                alt="arrow_icon_white"
              />
            </button>
          </div>
          <img
            className="hidden md:block max-w-80"
            src="/md_controller_image.png"
            alt="md_controller_image"
          />
          <img
            className="md:hidden"
            src="/sm_controller_image.png"
            alt="sm_controller_image"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
