import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import Wrapper from "@/components/Wrapper";
import React from "react";
import { useLocation } from "react-router-dom";
import "../../src/index.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return null;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Function to check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const addToCartHandler = () => {
    if (isProductInCart) {
      toast.info("This product is already in your cart.");
    } else {
      dispatch(addToCart(product));
      toast.success("Product added to cart!");
    }
  };

  return (
    <>
      <div className="w-full md:py-20">
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* left column start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel />
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1] py-3">
              {/* PRODUCT TITLE */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {product.title}
              </div>

              {/* PRODUCT BRAND */}
              <div className="text-lg font-semibold text-black/[0.8] mb-5 capitalize">
                {product.brand}
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div className="text-lg font-semibold text-black/[0.5] mb-5">
                {product.description}
              </div>

              {/* PRODUCT CATEGORY */}
              <div className="text-lg font-semibold mb-5 capitalize">
                {product.category}
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">
                  MRP : &#8377; {product.price}
                </p>

                <p className="text-base font-medium line-through">
                  &#8377; {Math.round(product.price * 1.2)}
                </p>

                <p className="ml-auto text-base font-medium text-black/[0.8]">
                  {product.discountPercentage} % off
                </p>
              </div>

              {/* PRODUCT STOCK */}
              <div className="text-md font-medium text-black/[0.8] mt-5 mb-5">
                {product.stock} in stock
              </div>

              {/* PRODUCT WARRANTY */}
              <div className="text-lg font-semibold mb-5">
                Warranty : {product.warrantyInformation}
              </div>

              {/* REVIEW START */}
              <div className="text-lg font-semibold mb-5">
                Rating : {product.rating}
              </div>

              {/* PRODUCT RETURN POLICY */}
              <div className="text-lg font-semibold mb-5">
                Return : {product.returnPolicy}
              </div>

              <div className="text-md font-medium text-black/[0.8]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.8] mb-20">
                {`(Also includes all applicable duties)`}
              </div>

              {/* REVIEWS SECTION START */}
              <div className="flex flex-col ">
                <div className="text-lg font-semibold">Customer Reviews</div>
                <div className="scrollbar-hide flex flex-row lg:flex-col gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth px-4 p-10 md:px-6">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="min-w-[320px] md:min-w-[350px] lg:min-w-0 snap-center bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      <p className="italic text-md text-gray-700">
                        "{review.comment}"
                      </p>
                      <p className="mt-3 flex items-center ">
                        Rating:&nbsp;
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(review.rating) ? "★" : "☆"}
                          </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          ({review.rating})
                        </span>
                      </p>
                      <p className="font-semibold mt-2 text-md text-black">
                        - {review.reviewerName}
                      </p>
                      <p className="text-md mt-2 text-gray-600">
                        {review.reviewerEmail}
                      </p>
                      <p className="text-md text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADD TO CART BUTTON START */}
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 cursor-pointer"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
            {/* right column end */}
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default ProductDetails;
