import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { CircleX } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import Button from "../components/common/Button";
import { motion } from "framer-motion";
import parse, { domToReact } from "html-react-parser";
import { showToast } from "../utils/Toast";
import BackBtn from "../components/common/BackBtn";
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function ProductDetail({ user, products }) {
  const { id } = useParams(); // Extract product ID from URL parameters
  const [product, setProduct] = useState(null); // State to store the selected product details
  const [showPopup, setShowPopup] = useState(false); // State to control login popup visibility
  const dispatch = useDispatch(); // Redux dispatch function
  const [selectedImage, setSelectedImage] = useState(null); // State for selected product image
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State for mouse position on the main image

  useEffect(() => {
    // Find the product based on ID from the products array
    const foundProduct = products.find((item) => item._id === id);
    setProduct(foundProduct);

    // Set the initial selected image to the first image of the product
    if (foundProduct && foundProduct.images.length > 0) {
      setSelectedImage(foundProduct.images[0]);
    }

    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, [user, products, id]);

  // Function to render the product description with HTML and animations
  const renderDescription = (description) => {
    const options = {
      replace: (domNode) => {
        // Define custom styles for specific HTML tags
        const classes = {
          h1: "text-2xl font-bold text-accent mb-4",
          h2: "text-xl font-semibold text-neutral-dark mb-4",
          h3: "text-lg font-medium text-neutral-dark mb-4",
          ul: "list-disc list-inside text-neutral-dark",
          li: "mb-2",
          p: "text-neutral leading-relaxed",
        };

        // Add motion animation properties
        const motionProps = {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 },
        };

        // Apply styles and motion to supported tags
        if (["h1", "h2", "h3", "ul", "li", "p"].includes(domNode.name)) {
          return React.createElement(
            motion[domNode.name === "ul" || domNode.name === "li" ? "ul" : domNode.name],
            {
              className: classes[domNode.name],
              ...motionProps,
            },
            domToReact(domNode.children)
          );
        }
      },
    };

    return parse(description, options);
  };

  const  handleAddToCart= (e) => {
    // Prevent navigation to product details when the button is clicked
    e.stopPropagation();
    e.preventDefault();

    // Check if cartId exists in localStorage
    let cartId = localStorage.getItem('cartId');

    // If cartId doesn't exist, generate a new one and store it in localStorage
    if (!cartId) {
      cartId = uuidv4();
      localStorage.setItem('cartId', cartId);
    }

    const cartItem = {
      id: cartId,
      productId: product._id,
      quantity: 1,
    };

    dispatch(addItemToCart(cartItem)).then(() => {
      showToast('تمت إضافة المنتج إلى السلة', 'success');
    }
    );
  };

  // Handle mouse movement on the main image for zoom effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect(); // Get bounding box of the image
    const x = ((e.clientX - left) / width) * 100; // Calculate X position in percentage
    const y = ((e.clientY - top) / height) * 100; // Calculate Y position in percentage
    setMousePosition({ x, y }); // Update mouse position state
  };

  return (
    <>
      {/* Popup for login prompt */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-75 z-50">
          <div className="flex w-80 flex-col items-center rounded-md border px-8 py-10 text-neutral shadow-lg bg-secondary">
            <CircleX className="h-16 w-16 text-secondary rounded-xl bg-danger p-2" />
            <p className="mt-4 text-center text-xl font-bold text-primary">
              يرجى تسجيل الدخول
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button
                className="whitespace-nowrap rounded-md bg-danger px-4 py-3 font-medium text-secondary"
                onClick={() => setShowPopup(false)}
              >
                اغلاق
              </button>
              <Link
                to="/login"
                className="whitespace-nowrap rounded-md bg-neutral px-4 py-3 font-medium text-primary"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main product details section */}
      <section className="py-12 relative bg-secondary sm:py-16 animate-fade-left" dir="rtl">
        <BackBtn />
        <div className="container mx-auto px-4">
          {/* Display a message if the product is not found */}
          {!product ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-2xl font-semibold text-primary">
                المنتج غير موجود
              </div>
            </div>
          ) : (
            <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              {/* Product images */}
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="main-image-container"
                    onMouseMove={handleMouseMove}
                    style={{ overflow: "hidden" }}
                  >
                    <img
                      width={200}
                      height={200}
                      className="main-image"
                      src={selectedImage}
                      alt={product.name}
                      style={{
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        objectFit: "contain",
                        objectPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                      }}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    {/* Thumbnails for product images */}
                    {product.images.map((image, index) => (
                      <LazyLoadImage
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className={`cursor-pointer rounded border ${
                          selectedImage === image
                            ? "border-accent"
                            : "border-neutral"
                        }`}
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Product details */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
                <p className="mt-4 text-xl text-accent">{product.price} د.ع</p>

                {/* Description */}
                <div className="mt-6 text-neutral-dark">
                  {renderDescription(product.description)}
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="mt-8 w-full bg-accent text-white py-3 rounded-md"
                >
                  إضافة إلى العربة
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

