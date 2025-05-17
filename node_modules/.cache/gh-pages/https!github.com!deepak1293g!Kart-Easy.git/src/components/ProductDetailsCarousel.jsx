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
    <div className="text-white text-[20px] w-[80%] max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
        thumbWidth={60}
        className="productCarousel"
      >
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={product.title} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
