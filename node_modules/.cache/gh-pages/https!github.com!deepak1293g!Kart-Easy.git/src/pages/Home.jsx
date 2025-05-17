import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Wrapper from "@/components/Wrapper";
import CategoryCard from "@/components/CategoryCard";
import CategoryWiseProduct from "@/components/CategoryWiseProduct";
import CardLoading from "@/components/CardLoading";

const Hero = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((categories) => setCategories(categories))
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          renderArrowPrev={(clickHandler) => (
            <div
              onClick={clickHandler}
              className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
            >
              <BiArrowBack className="text-sm md:text-lg" />
            </div>
          )}
          renderArrowNext={(clickHandler) => (
            <div
              onClick={clickHandler}
              className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
            >
              <BiArrowBack className="rotate-180 text-sm md:text-lg" />
            </div>
          )}
        >
          <div>
            <img
              src="/slide-1.png"
              className="aspect-[16/10] md:aspect-auto object-cover"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src="/slide-2.png"
              className="aspect-[16/10] md:aspect-auto object-cover"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              src="/slide-3.png"
              className="aspect-[16/10] md:aspect-auto object-cover"
              alt="Slide 3"
            />
          </div>
        </Carousel>
      </div>

      {/* Main Content */}
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-4 font-semibold leading-tight">
            Kart-Easy: Quick. Simple. Smart.
          </div>
          <div className="text-md md:text-xl">
            A simple and fast online wholesale store for small shop owners. You
            can buy all your daily products in one place at low prices, and we
            deliver them to your shop. Save time, save money—shop easy with Kart
            Easy!
          </div>
        </div>

        {/* Category Cards Section */}
        <div>
          <div className="text-[28px] md:text-[34px] mb-4 font-semibold leading-tight">
            Shop By Category
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 my-14">
            {categories.length > 0 ? <CategoryCard /> : <CardLoading />}
          </div>
        </div>

        {/* Category Wise Products Section */}
        <div>
          <div className="text-[28px] md:text-[34px] mb-4 font-semibold leading-tight">
            Category Wise Product
          </div>
          <div className="pt-4">
            {categories.length > 0 ? <CategoryWiseProduct /> : <CardLoading />}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Hero;
