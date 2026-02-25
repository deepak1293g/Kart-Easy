import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useLocation } from "react-router-dom";
import "../../src/index.css";

const ProductDetailsCarousel = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return null;

  return (
    <div className="w-full relative group">
      <Carousel
        infiniteLoop={true}
        showIndicators={true}
        showStatus={false}
        autoPlay={false}
        swipeable={true}
        emulateTouch={true}
        showArrows={true}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <li
              className={`inline-block mx-1 w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${isSelected ? "bg-orange-600 w-6" : "bg-gray-300"
                }`}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
        className="productCarousel premium-carousel"
      >
        {product.images.map((image, index) => (
          <div key={index} className="aspect-[4/5] bg-gray-50 flex items-center justify-center p-4 md:p-12 rounded-[2rem] overflow-hidden">
            <img
              src={image}
              alt={`${product.title} - ${index}`}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
