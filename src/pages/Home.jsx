import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Wrapper from "@/components/Wrapper";
import CategoryWiseProduct from "@/components/CategoryWiseProduct";
import CardLoading from "@/components/CardLoading";

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setFetchError(true);
      });
  }, []);

  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: "/header_headphone_image.png",
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: "/header_macbook_image.png",
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/header_playstation_image.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Slider */}
      <Wrapper>
        <div className="overflow-hidden relative w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {sliderData.map((slide, index) => (
              <div
                key={slide.id}
                className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
              >
                <div className="md:pl-8 mt-10 md:mt-0">
                  <p className="md:text-base text-orange-600 pb-1">
                    {slide.offer}
                  </p>
                  <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                    {slide.title}
                  </h1>
                  <div className="flex items-center mt-4 md:mt-6">
                    <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium cursor-pointer">
                      {slide.buttonText1}
                    </button>
                    <button className="group flex items-center gap-2 px-6 py-2.5 font-medium cursor-pointer">
                      {slide.buttonText2}
                      <img
                        className="group-hover:translate-x-1 transition cursor-pointer"
                        src="/arrow_icon.svg"
                        alt="arrow_icon"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex items-center flex-1 justify-center">
                  <img
                    className="md:w-72 w-48"
                    src={slide.imgSrc}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {sliderData.map((_, index) => (
              <div
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h2 className="text-[28px] md:text-[34px] mb-4 font-semibold leading-tight">
            Kart-Easy: Quick. Simple. Smart.
          </h2>
          <p className="text-md md:text-xl">
            A simple and fast online wholesale store for small shop owners. You
            can buy all your daily products in one place at low prices, and we
            deliver them to your shop. Save time, save money—shop easy with Kart
            Easy!
          </p>
        </div>

        {/* Category Wise Products */}
        <div>
          <h3 className="text-[28px] md:text-[34px] mb-4 font-semibold leading-tight">
            Category Wise Product
          </h3>
          <div className="pt-4">
            {fetchError ? (
              <p className="text-center text-red-500">
                Failed to load categories. Please try again later.
              </p>
            ) : categories.length > 0 ? (
              <CategoryWiseProduct />
            ) : (
              <CardLoading />
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Hero;
