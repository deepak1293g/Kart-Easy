import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import ProductCard from "@/components/ProductCard";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
  MessageCircle,
  User,
  Zap,
  Tag,
  Clock,
  ArrowUpRight
} from "lucide-react";
import "../../src/index.css";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    if (product?.category) {
      setLoadingRelated(true);
      fetch(`https://dummyjson.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((data) => {
          setRelatedProducts(data.products.filter((p) => p.id !== product.id).slice(0, 10));
        })
        .catch((error) => console.error("Failed to fetch related products:", error))
        .finally(() => setLoadingRelated(false));
    }
  }, [product]);

  if (!product) return null;

  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const addToCartHandler = () => {
    if (!user) {
      toast.error("Please login to add items to cart.");
      return;
    }
    if (isProductInCart) {
      toast.info("Already in your cart.");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart!");
    }
  };

  const buyNowHandler = () => {
    if (!user) {
      toast.error("Please login to continue.");
      return;
    }
    navigate("/checkout", { state: { directBuyProduct: product } });
  };

  const handleScroll = (direction) => {
    const container = document.getElementById("related-products-scroll");
    if (container) container.scrollLeft += direction === "right" ? 400 : -400;
  };

  return (
    <div className="bg-white min-h-screen font-urbanist text-neutral-900 pb-24 md:pb-0">

      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 p-4 md:hidden flex gap-3">
        <button
          onClick={addToCartHandler}
          className="flex-1 h-14 rounded-xl border border-neutral-200 font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} />
          Cart
        </button>
        <button
          onClick={buyNowHandler}
          className="flex-[1.5] h-14 rounded-xl bg-orange-600 text-white font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Buy Now
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-4 md:pt-8">

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Column: Image Presentation */}
          <div className="w-full lg:w-[38%] xl:w-[42%]">
            <div className="sticky top-28 space-y-6">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-neutral-100">
                <ProductDetailsCarousel />
              </div>

              {/* Trust Bar - Simplified */}
              <div className="grid grid-cols-3 gap-1 px-6 py-4 rounded-2xl bg-neutral-50/50 border border-neutral-100">
                <div className="text-center space-y-1">
                  <ShieldCheck size={18} className="mx-auto text-neutral-400" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Authentic</p>
                </div>
                <div className="text-center space-y-1 border-x border-neutral-100">
                  <Zap size={18} className="mx-auto text-neutral-400" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Premium</p>
                </div>
                <div className="text-center space-y-1">
                  <Truck size={18} className="mx-auto text-neutral-400" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Fast Ship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="w-full lg:flex-1 space-y-6">

            {/* Header Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-orange-500 fill-orange-500" />
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    {product.rating} — {product.reviews.length} Reviews
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
                  {product.title}
                </h1>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
                  Brand: <span className="text-neutral-900">{product.brand}</span>
                </p>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black tracking-tight text-neutral-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-xl text-neutral-500 line-through font-bold">₹{Math.round(product.price * 1.25).toLocaleString()}</span>
                  <span className="text-xs font-bold text-emerald-600">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Inclusive of all taxes</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-neutral-100">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Availability</p>
                  <p className={`text-xs font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {product.stock > 0 ? `${product.stock} Units left` : "Out of stock"}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-neutral-100">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Tracking</p>
                  <p className="text-xs font-bold text-neutral-900 uppercase">Express delivery</p>
                </div>
              </div>

              {/* Action Buttons - Desktop */}
              <div className="hidden md:flex gap-3">
                <button
                  onClick={addToCartHandler}
                  className="flex-1 h-14 rounded-xl border border-neutral-900 font-bold text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={buyNowHandler}
                  className="flex-1 h-14 rounded-xl bg-orange-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Buy Now
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900">Product Details</h3>
              <p className="text-base text-neutral-600 leading-relaxed max-w-2xl font-medium">
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, label: "Warranty", val: product.warrantyInformation },
                { icon: RotateCcw, label: "Returns", val: product.returnPolicy },
                { icon: Truck, label: "Shipping", val: product.shippingInformation },
                { icon: CheckCircle2, label: "Tax Info", val: "GST Included" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-50 bg-neutral-50/30">
                  <item.icon size={16} className="text-neutral-400" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">{item.label}</p>
                    <p className="text-[11px] font-bold text-neutral-700">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section - Minimal */}
        <div className="mt-20 space-y-10">
          <div className="flex items-end justify-between border-b border-neutral-100 pb-6">
            <h3 className="text-3xl font-black tracking-tight text-neutral-900 uppercase">
              Reviews <span className="text-neutral-500 font-medium">({product.reviews.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-100 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                      <User size={16} className="text-neutral-500" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">{review.reviewerName}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < review.rating ? "text-orange-500 fill-orange-500" : "text-neutral-200"} />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-700 text-sm font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest pt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products - Minimal */}
        <div className="mt-20 space-y-8 pb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tighter text-neutral-900 uppercase">Related Items</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            id="related-products-scroll"
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth flex-nowrap px-4 md:px-0"
          >
            {loadingRelated ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] aspect-[4/5] bg-neutral-50 animate-pulse rounded-3xl" />
              ))
            ) : (
              relatedProducts.map((p) => (
                <div key={p.id} className="flex-shrink-0 w-[260px] md:w-[280px]">
                  <ProductCard product={p} isSmall={true} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
